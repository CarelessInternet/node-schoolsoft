import type { SchoolSoft } from '..';

/* eslint-disable @typescript-eslint/ban-types */
export function CheckForToken(_: Object, __: string, descriptor: PropertyDescriptor) {
	const original = descriptor.value as () => void;

	descriptor.value = async function (this: SchoolSoft) {
		if (typeof this.baseFetchOptions.headers.token === 'undefined') {
			throw new ReferenceError("Missing the user's token, cannot perform operation.");
		}

		// We disable no-return-await and return the awaited version of the function
		// to avoid redundancy of returning an awaited promise in every "async" method.
		/* eslint-disable @typescript-eslint/no-unsafe-return, no-return-await */
		return await Reflect.apply(original, this, arguments);
	};

	return descriptor;
}
