import { ErrorCodes, SchoolSoft } from '../../src/index.js';
import { fetchAndParse } from '../../src/utils/index.js';
import type { SchoolListInfo } from '../../src/types';

interface Response {
	message: 'hello';
}

const statusCodes = [ErrorCodes.Unauthorized, 200];
const normalFetch = global.fetch;

// @ts-expect-error: We only need the `status` property and `json` method.
global.fetch = () => {
	/* eslint-disable-next-line @typescript-eslint/no-non-null-assertion */
	const status = statusCodes.shift()!;

	return Promise.resolve({
		json: () => Promise.resolve<Response>({ message: 'hello' }),
		status
	});
};

describe('Fetch', () => {
	it('fetch and throw an error on bad status code', async () => {
		await expect(fetchAndParse<Response>('')).rejects.toThrowError(Error);
	});

	it('fetch and parse with a successful response', async () => {
		await expect(fetchAndParse<Response>('')).resolves.toStrictEqual<Response>({
			message: 'hello'
		});
	});

	it('fetch list of schools', async () => {
		global.fetch = normalFetch;

		const schools = await SchoolSoft.getSchoolList();
		const mockSchoolKeys: Array<keyof SchoolListInfo> = [
			'name',
			'url',
			'parentLoginMethods',
			'studentLoginMethods',
			'teacherLoginMethods'
		];

		expect(Array.isArray(schools)).toBeTruthy();
		expect(Object.keys(schools[0])).toEqual(expect.arrayContaining(mockSchoolKeys));
	});
});
