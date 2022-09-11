import type { SchoolSoft } from '..';

/* eslint-disable @typescript-eslint/ban-types */
export function CheckForToken(_: Object, __: string, descriptor: PropertyDescriptor) {
	const original = descriptor.value as () => void;

	descriptor.value = async function (this: SchoolSoft) {
		if (typeof this.baseFetchOptions.headers.token === 'undefined') {
			throw new ReferenceError("Missing the user's token, cannot perform operation.");
		}

		/* eslint-disable @typescript-eslint/no-unsafe-return */
		return await Reflect.apply(original, this, arguments);
	};

	return descriptor;
}
