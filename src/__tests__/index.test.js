const { default: SchoolSoft } = require('../../dist');
const { config } = require('dotenv');

config();

const school = new SchoolSoft(
	process.env.SCHOOL_USERNAME,
	process.env.SCHOOL_PASSWORD,
	process.env.SCHOOL
);

it('get school list', () => {
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
		// lunch might not be there, but we have to makes sure it's at least an array
		expect(data).toBeInstanceOf(Array);
	});
});
