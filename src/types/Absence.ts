import type { LessonStatusJson } from './LessonStatus';

export interface Absence {
	week: number;
	lessonIds: LessonStatusJson['lessonId'][];
	dayIds: number[];
}
