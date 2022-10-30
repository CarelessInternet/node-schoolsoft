import { checkResponseStatus } from '../enums/index.js';

/**
 * Sends the fetch request and returns whether the operation was successful.
 * @returns Whether the request succeeded.
 */
export async function fetchRequest(url: RequestInfo | URL, options?: RequestInit) {
	try {
		const response = await fetch(url, options);
		checkResponseStatus(response.status);

		return true;
	} catch {
		return false;
	}
}
