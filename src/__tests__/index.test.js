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

it('should fetch lunch', () => {
	return school.getLunch().then((data) => {
		expect(data).toBeInstanceOf(Array);
	});
});
