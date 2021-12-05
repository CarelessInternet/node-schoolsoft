const { default: SchoolSoft } = require('../../dist');
const { config } = require('dotenv');

config();

const school = new SchoolSoft(
	process.env.SCHOOL_USERNAME,
	process.env.SCHOOL_PASSWORD,
	process.env.SCHOOL
);

it('get school list', () => {
	return SchoolSoft.getSchoolList()
		.then((data) => {
			expect(data).toBeInstanceOf(Array);
			expect(data[0]).toBeDefined();
		})
		.catch(console.error);
});

it('should login', () => {
	return school
		.login()
		.then((data) => {
			console.log('token', data);
			expect(data).toBeInstanceOf(Object);
			expect(data.token).toBeDefined();
		})
		.catch(console.error);
});

it('should fetch lunch', () => {
	return school
		.getLunch()
		.then((data) => {
			console.log('lunch', data);
			expect(data).toBeInstanceOf(Array);
		})
		.catch(console.error);
});
