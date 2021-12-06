import axios, { AxiosRequestConfig } from 'axios';
import { User, SchoolListInfo, Token, Lunch } from './types';

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
			deviceid: 'value doesnt matter but the key is needed',
			'Content-Type': 'application/x-www-form-urlencoded'
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

	private _checkReponse(status: number) {
		if (status === 401) {
			throw new Error('Invalid username, password, or token');
		} else if (status === 404) {
			throw new URIError('Invalid parameters passed to the API');
		} else if (status >= 500) {
			throw new Error(
				'An internal SchoolSoft error occured whilst making a request'
			);
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
			preResponse.headers['set-cookie']![0].split(';')[0];

		const response = await axios.post(
			`${this._url}/rest/app/login`,
			formData,
			this._baseAxiosOptions
		);
		this._checkReponse(response.status);

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
		this._checkReponse(response.status);

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
		this._checkReponse(response.status);

		return response.data as User;
	}

	/**
	 * Gets the lunch menu
	 */
	public async getLunch(): Promise<Lunch[]> {
		this._checkForUser();

		const response = await axios.get(
			`${this._url}/api/lunchmenus/student/${this._user.orgs[0].orgId}`,
			this._baseAxiosOptions
		);
		this._checkReponse(response.status);

		return response.data as Lunch[];
	}
}
