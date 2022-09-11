import {
	userTypeFromNumber,
	userTypeFromString,
	UserTypes,
	UserTypesAsNumbers
} from '../../src/index.js';

describe('User Types...', () => {
	describe('From Number', () => {
		it('return student as string', () => {
			expect(userTypeFromNumber(UserTypesAsNumbers.Student)).toStrictEqual(UserTypes.Student);
		});

		it('return guardian as string', () => {
			expect(userTypeFromNumber(UserTypesAsNumbers.Guardian)).toStrictEqual(UserTypes.Guardian);
		});

		it('return staff as string', () => {
			expect(userTypeFromNumber(UserTypesAsNumbers.Staff)).toStrictEqual(UserTypes.Staff);
		});

		it('return undefined on an invalid value', () => {
			expect(userTypeFromNumber(420)).toBeUndefined();
		});
	});

	describe('From String', () => {
		it('return student as number', () => {
			expect(userTypeFromString(UserTypes.Student)).toStrictEqual(UserTypesAsNumbers.Student);
		});

		it('return guardian as number', () => {
			expect(userTypeFromString(UserTypes.Guardian)).toStrictEqual(UserTypesAsNumbers.Guardian);
		});

		it('return staff as number', () => {
			expect(userTypeFromString(UserTypes.Staff)).toStrictEqual(UserTypesAsNumbers.Staff);
		});

		it('return undefined on an invalid value', () => {
			// @ts-expect-error: Expecting an invalid parameter value to return undefined.
			expect(userTypeFromString('wergwre')).toBeUndefined();
		});
	});
});
