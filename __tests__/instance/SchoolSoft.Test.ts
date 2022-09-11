import 'dotenv/config';
import { env } from 'node:process';
import { connect, connectWithAppKeyAndSchool, SchoolSoft } from '../../src/index.js';
import type {
	Absence,
	AbsencePermissions,
	Assignment,
	AssignmentInformation,
	AssignmentResult,
	Calendar,
	LessonStatus,
	LunchMenu,
	NewsInformation,
	NewsItem,
	Notice,
	NoticeActionable,
	NoticeLimit,
	Schedule,
	User
} from '../../src/types';

type KeyofArray<T> = Array<keyof T>;

const runIfHasCredentials =
	env.SCHOOL_USERNAME && env.SCHOOL_PASSWORD && env.SCHOOL ? describe : describe.skip;

describe('SchoolSoft Methods', () => {
	let user: SchoolSoft;

	it('fail to fetch without credentials', async () => {
		await expect(new SchoolSoft('', '', '').getLunchMenu()).rejects.toThrowError(ReferenceError);
	});

	runIfHasCredentials('Methods With Credentials', () => {
		it('login', async () => {
			user = await connect(env.SCHOOL_USERNAME, env.SCHOOL_PASSWORD, env.SCHOOL);
			expect(user).toBeInstanceOf(SchoolSoft);
		});

		it('get user', async () => {
			const userInfo = await user.getUser();
			const mockUserKeys: KeyofArray<User> = ['userId', 'name', 'appKey', 'type'];

			expect(Object.keys(userInfo)).toEqual(expect.arrayContaining(mockUserKeys));
		});

		it('get lunch menu', async () => {
			const lunch = await user.getLunchMenu();
			expect(Array.isArray(lunch)).toBeTruthy();

			if (lunch.length > 0) {
				const mockLunchKeys: KeyofArray<LunchMenu> = ['dates', 'week', 'empty'];
				expect(Object.keys(lunch[0])).toEqual(expect.arrayContaining(mockLunchKeys));
			}
		});

		it('get schedule', async () => {
			const schedule = await user.getSchedule();
			expect(Array.isArray(schedule)).toBeTruthy();

			if (schedule.length > 0) {
				const mockScheduleKeys: KeyofArray<Schedule> = ['orgId', 'subjectId', 'creDate'];
				expect(Object.keys(schedule[0])).toEqual(expect.arrayContaining(mockScheduleKeys));
			}
		});

		it('get absences', async () => {
			const absences = await user.getAbsences();
			expect(Array.isArray(absences)).toBeTruthy();

			if (absences.length > 0) {
				const mockAbsenceKeys: KeyofArray<Absence> = ['dayIds', 'lessonIds', 'week'];
				expect(Object.keys(absences[0])).toEqual(expect.arrayContaining(mockAbsenceKeys));
			}
		});

		it('get absence permissions', async () => {
			const absencePermissions = await user.getAbsencePermissions();
			const mockPermissionsKeys: KeyofArray<AbsencePermissions> = [
				'studentChangeAbsence',
				'messagingLevel',
				'absenceReportS',
				'absenceReportP'
			];

			expect(Object.keys(absencePermissions)).toEqual(expect.arrayContaining(mockPermissionsKeys));
		});

		it('get assignments', async () => {
			const assignments = await user.getAssignments();
			expect(Array.isArray(assignments)).toBeTruthy();

			if (assignments.length > 0) {
				const mockAssignmentKeys: KeyofArray<Assignment> = ['id', 'json', 'orgId', 'object'];
				expect(Object.keys(assignments[0])).toEqual(expect.arrayContaining(mockAssignmentKeys));
			}
		});

		it('get assignment information if one exists', async () => {
			const assignments = await user.getAssignments();

			if (assignments.length > 0) {
				const assignmentInformation = await user.getAssignmentInformation(assignments[0].id);
				const mockInformationKeys: KeyofArray<AssignmentInformation> = [
					'title',
					'teacher',
					'subject'
				];

				expect(Object.keys(assignmentInformation)).toEqual(
					expect.arrayContaining(mockInformationKeys)
				);
			}
		});

		it('get assignment result if one exists', async () => {
			const assignments = await user.getAssignments();

			if (assignments.length > 0) {
				const assignmentResult = await user.getAssignmentResult(assignments[0].id);
				const mockResultKeys: KeyofArray<AssignmentResult> = [
					'title',
					'description',
					'link',
					'texts'
				];

				expect(Object.keys(assignmentResult)).toEqual(expect.arrayContaining(mockResultKeys));
			}
		});

		it('get lesson statuses', async () => {
			const lessonStatuses = await user.getLessonStatuses();
			expect(Array.isArray(lessonStatuses)).toBeTruthy();

			if (lessonStatuses.length > 0) {
				const mockStatusKeys: KeyofArray<LessonStatus> = ['id', 'json', 'orgId', 'object'];
				expect(Object.keys(lessonStatuses[0])).toEqual(expect.arrayContaining(mockStatusKeys));
			}
		});

		it('get calendar', async () => {
			const calendar = await user.getCalendar();
			expect(Array.isArray(calendar)).toBeTruthy();

			if (calendar.length > 0) {
				const mockCalendarKeys: KeyofArray<Calendar> = ['id', 'json', 'orgId', 'object'];
				expect(Object.keys(calendar[0])).toEqual(expect.arrayContaining(mockCalendarKeys));
			}
		});

		it('get non-actionable notices', async () => {
			const nonActionableNotices = await user.getNoticesLimit();

			expect(Object.keys(nonActionableNotices)).toEqual(
				expect.arrayContaining<keyof NoticeLimit>(['lastUsedOffset', 'notices'])
			);
			expect(Array.isArray(nonActionableNotices.notices)).toBeTruthy();

			if (nonActionableNotices.notices.length > 0) {
				const mockNonActionableKeys: KeyofArray<NoticeLimit['notices'][0]> = [
					'id',
					'json',
					'orgId',
					'object'
				];
				expect(Object.keys(nonActionableNotices.notices[0])).toEqual(
					expect.arrayContaining(mockNonActionableKeys)
				);

				const news = nonActionableNotices.notices.find((notice) => notice.object === 'news');

				if (news) {
					const newsInfo = await user.getNewsItem(news.objectId1);

					const mockNewsKeys: KeyofArray<NewsItem> = ['news', 'link', 'files'];
					expect(Object.keys(newsInfo)).toEqual(expect.arrayContaining(mockNewsKeys));

					const mockNewsKeyKeys: KeyofArray<NewsInformation> = ['id', 'orgId', 'userId', 'creDate'];
					expect(Object.keys(newsInfo.news)).toEqual(expect.arrayContaining(mockNewsKeyKeys));
				}
			}
		});

		it('get news info', async () => {
			const nonActionableNotices = await user.getNoticesLimit();

			if (nonActionableNotices.notices.length > 0) {
				const news = nonActionableNotices.notices.find((notice) => notice.object === 'news');

				if (news) {
					const newsInfo = await user.getNewsItem(news.objectId1);

					const mockNewsKeys: KeyofArray<NewsItem> = ['news', 'link', 'files'];
					expect(Object.keys(newsInfo)).toEqual(expect.arrayContaining(mockNewsKeys));

					const mockNewsKeyKeys: KeyofArray<NewsInformation> = ['id', 'orgId', 'userId', 'creDate'];
					expect(Object.keys(newsInfo.news)).toEqual(expect.arrayContaining(mockNewsKeyKeys));
				}
			}
		});

		it('get actionable notices', async () => {
			const actionableNotices = await user.getNoticesActionable();
			expect(Array.isArray(actionableNotices)).toBeTruthy();

			if (actionableNotices.length > 0) {
				const mockActionableNoticeKeys: KeyofArray<NoticeActionable> = [
					'id',
					'json',
					'orgId',
					'object'
				];
				expect(Object.keys(actionableNotices[0])).toEqual(
					expect.arrayContaining(mockActionableNoticeKeys)
				);
			}
		});

		it('get archived notices', async () => {
			const nonActionableNotices = await user.getNoticesArchived();

			expect(Object.keys(nonActionableNotices)).toEqual(
				expect.arrayContaining<keyof NoticeLimit>(['lastUsedOffset', 'notices'])
			);
			expect(Array.isArray(nonActionableNotices.notices)).toBeTruthy();

			if (nonActionableNotices.notices.length > 0) {
				const mockNonActionableKeys: KeyofArray<Notice> = ['id', 'json', 'orgId', 'object'];
				expect(Object.keys(nonActionableNotices.notices[0])).toEqual(
					expect.arrayContaining(mockNonActionableKeys)
				);
			}
		});

		it('set news item as archived', async () => {
			const notices = await user.getNoticesLimit();

			if (notices.notices.length > 0) {
				await expect(user.setNewsItemAsArchived(notices.notices[0].id)).resolves.toStrictEqual(
					true
				);
			}
		});

		it('sets news item as unarchived', async () => {
			const notices = await user.getNoticesLimit();

			if (notices.notices.length > 0) {
				await expect(user.setNewsItemAsUnarchived(notices.notices[0].id)).resolves.toStrictEqual(
					true
				);
			}
		});

		it('sets news item as unread', async () => {
			const notices = await user.getNoticesLimit();

			if (notices.notices.length > 0) {
				await expect(user.setNewsItemAsUnread(notices.notices[0].id)).resolves.toStrictEqual(true);
			}
		});

		it('sets news item as read', async () => {
			const notices = await user.getNoticesLimit();

			if (notices.notices.length > 0) {
				await expect(user.setNewsItemAsRead(notices.notices[0].id)).resolves.toStrictEqual(true);
			}
		});

		it('login via setting the app key', async () => {
			await expect(
				connectWithAppKeyAndSchool(user.user.appKey, env.SCHOOL)
			).resolves.toBeInstanceOf(SchoolSoft);
		});
	});
});
