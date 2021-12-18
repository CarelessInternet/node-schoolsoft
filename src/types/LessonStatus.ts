import { BaseNotice } from '.';

export interface LessonStatus extends BaseNotice {
	/**
	 * For some reason they're all the same
	 */
	object: 'lessonstatusstudent_1';
	json: {
		week: number;
		absence: number;
		absenceType: string;
		absenceReason: string;
		lessonId: number;
	};
}
