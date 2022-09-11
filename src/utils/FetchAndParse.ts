import { checkResponseStatus } from '../enums/index.js';

/**
 * Fetches the content, checks the status, and returns the JSON.
 * @returns A JSON-parsed response.
 */
export async function fetchAndParse<T>(url: RequestInfo | URL, options?: RequestInit) {
	const response = await fetch(url, options);
	checkResponseStatus(response.status);

	return (await response.json()) as T;
}
