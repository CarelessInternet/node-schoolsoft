const { default: SchoolSoft } = require('../../dist');
const { config } = require('dotenv');

config();

const school = new SchoolSoft(
	process.env.SCHOOL_USERNAME,
	process.env.SCHOOL_PASSWORD,
	process.env.SCHOOL
);

it('should fetch school list', () => {
	return SchoolSoft.getSchoolList().then((data) => {
		expect(data).toBeInstanceOf(Array);
		expect(data[0]).toBeDefined();
	});
});

it('should login', () => {
	return school.login().then((data) => {
		expect(data).toBeInstanceOf(Object);
		expect(data.token).toBeDefined();
	});
});

it('should fetch user info', () => {
	return school.getUser().then((data) => {
		expect(data).toBeInstanceOf(Object);
		expect(typeof data.userId).toBe('number');
	});
});

it('should fetch lunch', () => {
	return school.getLunch().then((data) => {
		expect(data).toBeInstanceOf(Array);

		if (data.length) {
			expect(data[0].dates).toBeInstanceOf(Array);
			expect(typeof data[0].week).toBe('number');
			expect(typeof data[0].empty).toBe('boolean');
		}
	});
});

it('should fetch schedule', () => {
	return school.getSchedule().then((data) => {
		expect(data).toBeInstanceOf(Array);

		if (data.length) {
			expect(typeof data[0].orgId).toBe('number');
			expect(typeof data[0].name).toBe('string');
		}
	});
});

it('should fetch absences [default 1-52]', () => {
	return school.getAbsences().then((data) => {
		expect(data).toBeInstanceOf(Array);

		if (data.length) {
			expect(data[0]).toBeInstanceOf(Object);
			expect(data[0].lessonIds).toBeInstanceOf(Array);
		}
	});
});

it('should fetch absences [40]', () => {
	return school.getAbsences(40).then((data) => {
		expect(data).toBeInstanceOf(Array);

		if (data.length) {
			expect(data[0]).toBeInstanceOf(Object);
			expect(data[0].lessonIds).toBeInstanceOf(Array);
		}
	});
});

it('should fetch absence permissions', () => {
	return school.getAbsencePermissions().then((data) => {
		expect(data).toBeInstanceOf(Object);
		expect(typeof data.studentChangeAbsence).toBe('boolean');
		expect(typeof data.messagingLevel).toBe('number');
	});
});

it('should fetch assignments', () => {
	return school
		.getAssignments(new Date('2021-08-16'), Date.now())
		.then((data) => {
			expect(data).toBeInstanceOf(Array);

			if (data.length) {
				expect(typeof data[0].id).toBe('number');
				expect(typeof data[0].json.title).toBe('string');
			}
		});
});

it('should fetch lesson statuses', () => {
	return school
		.getLessonsStatuses(new Date('2021-08-16'), Date.now())
		.then((data) => {
			expect(data).toBeInstanceOf(Array);

			if (data.length) {
				expect(typeof data[0].id).toBe('number');
				expect(typeof data[0].json.lessonId).toBe('number');
				expect(typeof data[0].json.absenceReason).toBe('string');
			}
		});
});

it('should fetch calendar events', () => {
	return school
		.getCalendar(new Date('2021-08-16'), Date.now(), [
			'calendar',
			'privatecalendar',
			'schoolcalendar'
		])
		.then((data) => {
			expect(data).toBeInstanceOf(Array);

			if (data.length) {
				expect(typeof data[0].json.fromDate).toBe('string');
				expect(typeof data[0].json.title).toBe('string');
			}
		});
});

it('should fetch non-actionable notices', () => {
	return school
		.getNoticesLimit(['news', 'inquiry', 'teststudent'])
		.then((data) => {
			expect(data).toBeInstanceOf(Object);
			expect(data.notices).toBeInstanceOf(Array);

			if (data.notices.length) {
				expect(typeof data.notices[0].id).toBe('number');
				expect(typeof data.notices[0].url).toBe('string');
			}
		});
});

it('should fetch actionable notices', () => {
	return school.getNoticesActionable().then((data) => {
		expect(data).toBeInstanceOf(Array);

		if (data.length) {
			expect(typeof data[0].id).toBe('number');
			expect(typeof data[0].url).toBe('string');
		}
	});
});

it('should fetch archived notices', () => {
	return school
		.getNoticesArchived(['news', 'inquiry', 'teststudent'])
		.then((data) => {
			expect(data).toBeInstanceOf(Object);
			expect(data.notices).toBeInstanceOf(Array);

			if (data.notices.length) {
				expect(typeof data.notices[0].id).toBe('number');
				expect(typeof data.notices[0].url).toBe('string');
			}
		});
});

it('should fetch assignment result', async () => {
	const { notices } = await school.getNoticesLimit(['teststudent']);
	expect(notices).toBeInstanceOf(Array);

	if (notices.length) {
		const id = notices[0].objectId1;
		const info = await school.getAssignmentResult(id);

		expect(info).toBeInstanceOf(Object);
		expect(typeof info.title).toBe('string');
		expect(typeof info.texts[0].text).toBe('string');

		if (info.texts[1]) {
			expect(typeof info.texts[1].title).toBe('string');
			expect(typeof info.texts[1].text).toBe('string');
		}
	}
});

it('should fetch news info', async () => {
	const { notices } = await school.getNoticesLimit(['news']);
	expect(notices).toBeInstanceOf(Array);

	if (notices.length) {
		const id = notices[0].objectId1;
		const info = await school.getNewsInfo(id);

		expect(info).toBeInstanceOf(Object);
		expect(typeof info.link).toBe('string');
		expect(typeof info.news.name).toBe('string');
		expect(typeof info.news.orgId).toBe('number');
		expect(typeof info.news.creDate).toBe('number');
	}
});
