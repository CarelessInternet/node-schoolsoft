import { fetchAndParse, fetchRequest } from './utils/index.js';
import { CheckForToken } from './decorators/index.js';
import { Methods, userTypeFromString, UserTypes } from './enums/index.js';
import type {
	Absence,
	AbsencePermissions,
	Assignment,
	AssignmentInformation,
	AssignmentResult,
	BaseNotice,
	Calendar,
	CalendarObject,
	LessonStatus,
	LunchMenu,
	NewsItem,
	NoticeActionable,
	NoticeActionableResponse,
	NoticeLimit,
	NoticeObject,
	Schedule,
	SchoolListInfo,
	Token,
	User
} from './types';

interface CustomRequestInit extends Omit<RequestInit, 'headers'> {
	headers: {
		appos: 'ios';
		appversion: '2.3.14';
		deviceid: 'node-schoolsoft';
		appkey?: User['appKey'];
		token?: Token['token'];
		'Content-Type'?: 'application/json';
	};
}

/**
 * The SchoolSoft class, where all the magic happens.
 */
export class SchoolSoft {
	/**
	 * Base URL of SchoolSoft for schools.
	 */
	public static readonly baseUrl = 'https://sms.schoolsoft.se';

	public readonly baseFetchOptions: CustomRequestInit = {
		headers: {
			appos: 'ios',
			appversion: '2.3.14',
			// Value doesn't matter, but the key & value is needed.
			deviceid: 'node-schoolsoft'
		},
		method: Methods.Get
	};

	public user: User;

	/**
	 * Initializes the SchoolSoft class. Call the `login` method after initializing.
	 * @param username - The username of the account.
	 * @param password - The password of the account.
	 * @param school - The school of the account.
	 * @param [type] - The type of the account, the default is student.
	 */
	public constructor(
		private readonly username: string,
		private readonly password: string,
		private readonly school: string,
		private type: UserTypes = UserTypes.Student
	) {}

	public static getSchoolList() {
		return fetchAndParse<SchoolListInfo[]>(`${this.baseUrl}/rest/app/schoollist/prod`);
	}

	private get defaultStartDate() {
		return new Date(new Date().getFullYear() - (new Date().getMonth() < 6 ? 0 : 1), 7);
	}

	private get defaultEndDate() {
		return new Date(new Date().getFullYear() + (new Date().getMonth() < 6 ? 1 : 0), 6);
	}

	private get url(): `${typeof SchoolSoft['baseUrl']}/${SchoolSoft['school']}` {
		return `${SchoolSoft.baseUrl}/${this.school}`;
	}

	private get orgId() {
		return this.user.orgs[0].orgId;
	}

	private restUrl(...path: Array<string | number>) {
		return `${this.url}/rest/app/${path.join('/')}`;
	}

	private apiUrl(...path: Array<string | number>) {
		return `${this.url}/api/${path.join('/')}`;
	}

	public async login() {
		const body = new URLSearchParams();

		body.set('identification', this.username);
		body.set('verification', this.password);
		// 4 is for mobile login which is what this API wrapper imitates the device as.
		body.set('logintype', '4');
		body.set('usertype', userTypeFromString(this.type).toString());

		const options = { ...this.baseFetchOptions };
		options.body = body;
		options.method = Methods.Post;

		this.user = await fetchAndParse<User>(this.restUrl('login'), options);

		return this.getToken();
	}

	public async getToken() {
		if (typeof this.user.appKey === 'undefined') {
			throw new ReferenceError("Missing the user's app key, cannot fetch the token.");
		}

		const options = { ...this.baseFetchOptions };
		options.headers.appkey = this.user.appKey;

		const data = await fetchAndParse<Token>(this.restUrl('token'), options);
		this.baseFetchOptions.headers.token = data.token;

		return data;
	}

	public async setAppKey(appKey: User['appKey']) {
		// @ts-expect-error: We only need `appKey` to be defined in the `user` object.
		this.user = {
			appKey
		};

		const token = await this.getToken();
		this.user = await this.getUser();

		this.user.appKey = appKey;
		this.type = this.user.type;

		return token;
	}

	/**
	 * Please use the `user` property instead of this function. This method exists because it's a known SchoolSoft route.
	 */
	@CheckForToken
	public getUser() {
		return fetchAndParse<User>(this.apiUrl('user', 'get'), this.baseFetchOptions);
	}

	@CheckForToken
	public getLunchMenu() {
		return fetchAndParse<LunchMenu[]>(
			this.apiUrl('lunchmenus', this.type, this.orgId),
			this.baseFetchOptions
		);
	}

	@CheckForToken
	public getSchedule() {
		return fetchAndParse<Schedule[]>(
			this.apiUrl('lessons', this.type, this.orgId),
			this.baseFetchOptions
		);
	}

	/**
	 * @param [start] - The starting week number (1-52).
	 * @param [end] - The ending week number (1-52).
	 */
	@CheckForToken
	public getAbsences(start = 1, end = 52) {
		return fetchAndParse<Absence[]>(
			this.apiUrl('absences', this.type, this.orgId, start, end),
			this.baseFetchOptions
		);
	}

	@CheckForToken
	public getAbsencePermissions() {
		return fetchAndParse<AbsencePermissions>(
			this.apiUrl('parameters', this.type, this.orgId),
			this.baseFetchOptions
		);
	}

	/**
	 * @param [start] - The starting date.
	 * @param [end] - The ending date.
	 */
	@CheckForToken
	public getAssignments(start = this.defaultStartDate, end = this.defaultEndDate) {
		return fetchAndParse<Assignment[]>(
			this.apiUrl('notices', this.type, this.orgId, start.getTime(), end.getTime(), 'test'),
			this.baseFetchOptions
		);
	}

	/**
	 * @param id - The assignment's id.
	 */
	@CheckForToken
	public getAssignmentInformation(id: Assignment['id']) {
		return fetchAndParse<AssignmentInformation>(
			this.apiUrl('tests', this.type, this.orgId, id, 0),
			this.baseFetchOptions
		);
	}

	/**
	 * @param id - The assignment id.
	 */
	@CheckForToken
	public getAssignmentResult(id: Assignment['id']) {
		return fetchAndParse<AssignmentResult>(this.apiUrl('news', this.type, this.orgId, id));
	}

	/**
	 * @param [start] - The starting date.
	 * @param [end] - The ending date.
	 */
	@CheckForToken
	public getLessonStatuses(start = this.defaultStartDate, end = this.defaultEndDate) {
		return fetchAndParse<LessonStatus[]>(
			this.apiUrl(
				'notices',
				this.type,
				this.orgId,
				// Start & end timestamps are flipped for some reason in the API.
				end.getTime(),
				start.getTime(),
				`lessonstatus${this.type}_1`
			),
			this.baseFetchOptions
		);
	}

	/**
	 * @param [options] - The options for the types of calendar events to include.
	 * @param [start] - The starting date.
	 * @param [end] - The ending date.
	 */
	@CheckForToken
	public getCalendar(
		options: Array<CalendarObject> = ['calendar', 'schoolcalendar', 'privatecalendar'],
		start = this.defaultStartDate,
		end = this.defaultEndDate
	) {
		return fetchAndParse<Calendar[]>(
			this.apiUrl(
				'notices',
				this.type,
				this.orgId,
				start.getTime(),
				end.getTime(),
				[...new Set(options)].join(',')
			),
			this.baseFetchOptions
		);
	}

	/**
	 * @param [options] - The options for the types of notices to include.
	 * @param [start] - The starting week number (1-52).
	 * @param [end] - The ending week number (1-52).
	 */
	@CheckForToken
	public getNoticesLimit(
		options: Array<NoticeObject> = ['news', 'inquiry', 'teststudent', 'message'],
		start = 0,
		end = 52
	) {
		return fetchAndParse<NoticeLimit>(
			this.apiUrl(
				'notices',
				this.type,
				'limit',
				this.orgId,
				start,
				end,
				[...new Set(options)].join(',')
			),
			this.baseFetchOptions
		);
	}

	@CheckForToken
	public getNoticesActionable() {
		return fetchAndParse<NoticeActionable[]>(
			this.apiUrl('notices', this.type, 'actionable', this.orgId),
			this.baseFetchOptions
		);
	}

	/**
	 * @param [options] - The options for the types of notices to include.
	 * @param [start] - The starting week number (1-52).
	 * @param [end] - The ending week number (1-52).
	 */
	@CheckForToken
	public getNoticesArchived(
		options: Array<NoticeObject> = ['news', 'inquiry', 'teststudent', 'message'],
		start = 0,
		end = 52
	) {
		return fetchAndParse<NoticeLimit>(
			this.apiUrl(
				'notices',
				this.type,
				'limit',
				'archived',
				this.orgId,
				start,
				end,
				[...new Set(options)].join(',')
			),
			this.baseFetchOptions
		);
	}

	/**
	 * @param id - The news item's id.
	 */
	@CheckForToken
	public getNewsItem(id: BaseNotice['id']) {
		return fetchAndParse<NewsItem>(
			this.apiUrl('news', this.type, this.orgId, id),
			this.baseFetchOptions
		);
	}

	/**
	 * @param id - The news item's id.
	 * @returns Whether the news item has been as archived.
	 */
	@CheckForToken
	public setNoticeAsArchived(id: BaseNotice['id']) {
		const options = { ...this.baseFetchOptions };
		options.method = Methods.Put;

		return fetchRequest(this.apiUrl('notices', this.type, 'archive', this.orgId, id), options);
	}

	/**
	 * @param id - The news item's id.
	 * @returns Whether the news item has been as unarchived.
	 */
	@CheckForToken
	public setNoticeAsUnarchived(id: BaseNotice['id']) {
		const options = { ...this.baseFetchOptions };
		options.method = Methods.Put;

		return fetchRequest(this.apiUrl('notices', this.type, 'unarchive', this.orgId, id), options);
	}

	/**
	 * @param id - The news item's id.
	 * @returns Whether the news item has been set as read.
	 */
	@CheckForToken
	public setNoticeAsRead(id: BaseNotice['id']) {
		return fetchRequest(
			this.apiUrl('notices', this.type, 'read', this.orgId, id),
			this.baseFetchOptions
		);
	}

	/**
	 * @param id - The news item's id.
	 * @returns Whether the news item has been set as unread.
	 */
	@CheckForToken
	public setNoticeAsUnread(id: BaseNotice['id']) {
		return fetchRequest(
			this.apiUrl('notices', this.type, 'unread', this.orgId, id),
			this.baseFetchOptions
		);
	}

	/**
	 * @param id - The news item's id.
	 * @param [responseText] - The text to send as a response.
	 * @returns Whether the actionable notice item has been set as confirmed.
	 */
	@CheckForToken
	public setNoticeActionableAsConfirmed(
		id: BaseNotice['id'],
		responseText: NoticeActionableResponse['responseText'] = ''
	) {
		const options = { ...this.baseFetchOptions };

		options.method = Methods.Post;
		options.headers['Content-Type'] = 'application/json';
		options.body = JSON.stringify({ responseText } as NoticeActionableResponse);

		return fetchRequest(this.apiUrl('notices', this.type, 'confirm', this.orgId, id), options);
	}
}

/**
 * Initializes the SchoolSoft class and logs in. This is the recommended way of connecting/logging in.
 * @returns The logged in SchoolSoft instance.
 */
export async function connect(...parameters: ConstructorParameters<typeof SchoolSoft>) {
	const user = new SchoolSoft(...parameters);
	await user.login();

	return user;
}

/**
 * Initializes the SchoolSoft class and logs in with the app key and school.
 * @param appKey - The user's app key.
 * @param school - The user's school.
 * @returns The logged in SchoolSoft instance.
 */
export async function connectWithAppKeyAndSchool(
	appKey: User['appKey'],
	school: ConstructorParameters<typeof SchoolSoft>[2]
) {
	const user = new SchoolSoft('', '', school);
	await user.setAppKey(appKey);

	return user;
}

export * from './enums/index.js';
