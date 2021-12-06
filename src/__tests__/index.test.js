const { default: SchoolSoft } = require('../../dist');
const { config } = require('dotenv');

config();

const school = new SchoolSoft(
	process.env.SCHOOL_USERNAME,
	process.env.SCHOOL_PASSWORD,
	process.env.SCHOOL
);

it('should get school list', () => {
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
		expect(data.userId).toEqual(expect.any(Number));
	});
});

it('should fetch lunch', () => {
	return school.getLunch().then((data) => {
		// lunch might be empty
		expect(data).toBeInstanceOf(Array);
	});
});

it('should fetch schedule', () => {
	return school.getSchedule().then((data) => {
		// schedule might be empty
		expect(data).toBeInstanceOf(Array);
	});
});

it('should fetch absences (default 1-52)', () => {
	return school.getAbsences().then((data) => {
		expect(data).toBeInstanceOf(Array);
		expect(data[0]).toBeInstanceOf(Object);
		expect(data[0].lessonIds).toBeInstanceOf(Array);
	});
});

it('should fetch absences (40)', () => {
	return school.getAbsences(40).then((data) => {
		expect(data).toBeInstanceOf(Array);
		expect(data[0]).toBeInstanceOf(Object);
		expect(data[0].lessonIds).toBeInstanceOf(Array);
	});
});
