import axios, { AxiosRequestConfig } from 'axios';
import {
	User,
	SchoolListInfo,
	Token,
	Lunch,
	Schedule,
	Absence,
	AbsencePermissions,
	Assignment
} from './types';

/**
 * The SchoolSoft class, where all the magic happens
 */
export default class SchoolSoft {
	/**
	 * Base URL of SchoolSoft
	 */
	public static readonly baseURL = 'https://sms.schoolsoft.se';
	/**
	 * User info
	 */
	private _user: User;
	/**
	 * axios http options
	 */
	private _baseAxiosOptions: AxiosRequestConfig = {
		headers: {
			appos: 'ios',
			appversion: '2.3.8',
			deviceid: 'value doesnt matter but the key is needed'
		},
		validateStatus: () => true
	};

	/**
	 * Initializes the SchoolSoft class
	 * @param username - The username of the account
	 * @param password - The password of the account
	 * @param school - The school of the account
	 * @param [userType] - The type of the account, not needed if you are a student
	 */
	public constructor(
		private username: string,
		private password: string,
		private school: string,
		private userType: 'student' | 'staff' | 'guardian' = 'student'
	) {}

	private get _type() {
		switch (this.userType) {
			case 'guardian':
				return 2;
			case 'staff':
				// idk if it is 3, but i believe it is
				return 3;
			default:
				// student is 1
				return 1;
		}
	}

	private get _url() {
		return `${SchoolSoft.baseURL}/${this.school}`;
	}

	private _convertToURLParameters(params: object) {
		return Object.keys(params)
			.map(
				(key) =>
					`${key}=${encodeURIComponent(params[key as keyof typeof params])}`
			)
			.join('&');
	}

	private _checkResponse(status: number) {
		switch (status) {
			case 401:
				throw new Error('Invalid username, password, or token');
			case 404:
				throw new URIError(
					'Resource could not been found, either invalid URL or parameters passed'
				);
			case 405:
				throw new URIError('Wrong method requested to the API');
			case 415:
				throw new Error(
					'An unsupported media type was requested as the Content-Type header'
				);
			case 500:
				throw new Error(
					'An internal SchoolSoft error occured whilst making a request'
				);
			default:
				break;
		}
	}

	private _checkForUser() {
		if (!this._user) {
			throw new ReferenceError('Missing login/user information');
		}
	}

	/**
	 * Gets all of the schools that uses SchoolSoft
	 */
	public static async getSchoolList() {
		const { data } = await axios.get(
			`${SchoolSoft.baseURL}/rest/app/schoollist/prod`
		);

		return data as SchoolListInfo[];
	}

	/**
	 * Logs into SchoolSoft and gets the token which will be used for all requests
	 */
	public async login(): Promise<Token> {
		const formData = this._convertToURLParameters({
			identification: this.username,
			verification: this.password,
			logintype: 4,
			usertype: this._type
		});

		// we make a response to get the JSESSIONID cookie, since its required for some reason
		// ffs schoolsoft, please redo your api, its absolute dog wank, why do we need a cookie to login??
		const preResponse = await axios.get(
			`${this._url}/rest/app/login`,
			this._baseAxiosOptions
		);
		this._baseAxiosOptions.headers!['Cookie'] =
			preResponse.headers['set-cookie']?.[0].split(';')[0] ??
			// this is just a random string from password generator, not a real password or session id
			'JSESSIONID=97oatxRBCX4pbEDkNeoxGFx8tRRh5Efz';

		const options = Object.assign({}, this._baseAxiosOptions, {
			headers: Object.assign({}, this._baseAxiosOptions.headers, {
				'Content-Type': 'application/x-www-form-urlencoded'
			})
		});

		const response = await axios.post(
			`${this._url}/rest/app/login`,
			formData,
			options
		);
		this._checkResponse(response.status);

		this._user = response.data as User;
		const token = await this.token();

		return token;
	}

	/**
	 * Gets the token, assuming you have the app key
	 */
	public async token(): Promise<Token> {
		this._checkForUser();

		const options = Object.assign({}, this._baseAxiosOptions, {
			headers: Object.assign({}, this._baseAxiosOptions.headers, {
				appkey: this._user.appKey
			})
		});
		const response = await axios.get(`${this._url}/rest/app/token`, options);
		this._checkResponse(response.status);

		const data = response.data as Token;

		this._baseAxiosOptions = Object.assign({}, this._baseAxiosOptions, {
			headers: Object.assign({}, this._baseAxiosOptions.headers, {
				token: data.token
			})
		});

		return data;
	}

	/**
	 * Gets the user's info
	 */
	public async getUser(): Promise<User> {
		this._checkForUser();

		const response = await axios.get(
			`${this._url}/api/user/get`,
			this._baseAxiosOptions
		);
		this._checkResponse(response.status);

		return response.data as User;
	}

	/**
	 * Gets the lunch menu
	 */
	public async getLunch(): Promise<Lunch[]> {
		this._checkForUser();

		const response = await axios.get(
			`${this._url}/api/lunchmenus/${this.userType}/${this._user.orgs[0].orgId}`,
			this._baseAxiosOptions
		);
		this._checkResponse(response.status);

		return response.data as Lunch[];
	}

	/**
	 * Gets the schedule
	 */
	public async getSchedule(): Promise<Schedule[]> {
		this._checkForUser();

		const response = await axios.get(
			`${this._url}/api/lessons/${this.userType}/${this._user.orgs[0].orgId}`,
			this._baseAxiosOptions
		);
		this._checkResponse(response.status);

		return response.data as Schedule[];
	}

	/**
	 * Gets absences from school
	 * @param start - The starting week as integer
	 * @param end - The ending week as integer
	 */
	public async getAbsences(start = 1, end = 52): Promise<Absence[]> {
		this._checkForUser();

		if (end === undefined || end === null) {
			end = 52;
		}

		const response = await axios.get(
			`${this._url}/api/absences/${this.userType}/${this._user.orgs[0].orgId}/${start}/${end}`,
			this._baseAxiosOptions
		);
		this._checkResponse(response.status);

		return response.data as Absence[];
	}

	/**
	 * Gets absence permissions
	 */
	public async getAbsencePermissions(): Promise<AbsencePermissions> {
		this._checkForUser();

		const response = await axios.get(
			`${this._url}/api/parameters/${this.userType}/${this._user.orgs[0].orgId}`,
			this._baseAxiosOptions
		);
		this._checkResponse(response.status);

		return response.data as AbsencePermissions;
	}

	/**
	 * Gets assignments from a beginning to end date
	 */
	public async getAssignments(
		start: Date | string | number,
		end: Date | string | number
	): Promise<Assignment[]> {
		this._checkForUser();

		const [startDate, endDate] = [
			new Date(start).getTime(),
			new Date(end).getTime()
		];

		const response = await axios.get(
			`${this._url}/api/notices/${this.userType}/${this._user.orgs[0].orgId}/${startDate}/${endDate}/test`,
			this._baseAxiosOptions
		);
		this._checkResponse(response.status);

		return response.data as Assignment[];
	}
}

export * from './types';
