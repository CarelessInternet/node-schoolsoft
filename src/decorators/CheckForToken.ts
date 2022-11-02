import type { SchoolSoft } from '..';

/* eslint-disable-next-line @typescript-eslint/ban-types */
export function CheckForToken(_: Object, __: string, descriptor: PropertyDescriptor) {
	const original = descriptor.value as () => void;

	// This is an async function so that any errors thrown will always be caught in a reject.
	/* eslint-disable-next-line @typescript-eslint/require-await */
	descriptor.value = async function (this: SchoolSoft) {
		if (typeof this.baseFetchOptions.headers.token === 'undefined') {
			throw new ReferenceError("Missing the user's token, cannot perform operation.");
		}

		/* eslint-disable-next-line @typescript-eslint/no-unsafe-return */
		return Reflect.apply(original, this, arguments);
	};

	return descriptor;
}
