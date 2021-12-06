/**
 * Schedule API response
 */
export interface Schedule {
	weeks: number;
	excludingWeeks: number;
	creById: number;
	source: number;
	externalRef: string;
	subjectId: number;
	orgId: number;
	/**
	 * Can be converted to date
	 */
	updDate: string;
	updByType: number;
	excludeClass: number;
	/**
	 * Can be converted to date -> time
	 */
	startTime: string;
	id: number;
	includingWeeks: number;
	subjectName: string;
	updById: number;
	creByType: number;
	/**
	 * Can be converted to date
	 */
	creDate: string;
	length: number;
	externalId: string;
	roomName: string;
	periodWeeks: number;
	includingWeeksString: string;
	dayId: number;
	name: string;
	absenceType: number;
	excludingWeeksString: string;
	/**
	 * Can be converted to date -> time
	 */
	endTime: string;
	weeksString: string;
	tmpLesson: number;
}
