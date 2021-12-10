/**
 * Absences API response
 */
export interface Absence {
	week: number;
	lessonIds: number[];
	dayIds: number[];
}
