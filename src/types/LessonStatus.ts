import type { BaseNotice } from '.';

export interface LessonStatusJson {
	week: number;
	absence: number;
	absenceType: string;
	absenceReason: string;
	lessonId: number;
}

export interface LessonStatus extends BaseNotice {
	/**
	 * For some reason they're all the same.
	 */
	object: 'lessonstatusstudent_1';
	json: LessonStatusJson;
}
