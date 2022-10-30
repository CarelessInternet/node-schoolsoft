import { checkResponseStatus, ErrorCodes } from '../../src/index.js';

describe('Error Codes', () => {
	it('throw on error code 401', () => {
		expect(() => {
			checkResponseStatus(ErrorCodes.Unauthorized);
		}).toThrowError(Error);
	});

	it('throw on error code 404', () => {
		expect(() => {
			checkResponseStatus(ErrorCodes.NotFound);
		}).toThrowError(TypeError);
	});

	it('throw on error code 405', () => {
		expect(() => {
			checkResponseStatus(ErrorCodes.MethodNotAllowed);
		}).toThrowError(TypeError);
	});

	it('throw on error code 415', () => {
		expect(() => {
			checkResponseStatus(ErrorCodes.UnsupportedMediaType);
		}).toThrowError(Error);
	});

	it('throw on error code 500', () => {
		expect(() => {
			checkResponseStatus(ErrorCodes.InternalServerError);
		}).toThrowError(Error);
	});

	it('not throw an error on an unchecked error code', () => {
		expect(() => {
			checkResponseStatus(100);
		}).not.toThrowError();
	});
});
