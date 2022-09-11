/**
 * Sometimes needs to be converted to an object via JSON.parse().
 */
export interface JsonInformation {
	creByName: string;
	contentPreview: string;
	title: string;
	allDay?: number;
	/**
	 * Can be converted to a date.
	 */
	fromDate?: string;
	/**
	 * Can be converted to a date.
	 */
	endDate?: string;
}
