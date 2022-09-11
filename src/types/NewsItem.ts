import type { File } from '.';

export interface NewsInformation {
	id: number;
	orgId: number;
	creById: number;
	updById: number;
	creByType: number;
	updByType: number;
	/**
	 * Can be converted to a date.
	 */
	creDate: number;
	/**
	 * Can be converted to a date.
	 */
	updDate: number;
	userId: number;
	confirmation: number;
	response: number;
	userType: number;
	type: number;
	category: number;
	fileuploadFileSize: number;
	allDay: number;
	name: string;
	description: string;
	responseLabel: string;
	fileuploadFileName: string;
	/**
	 * Can be converted to a date.
	 */
	toDate: number;
	/**
	 * Can be converted to a date.
	 */
	fromDate: number;
	toTeacher: boolean;
	toStudent: boolean;
	toParent: boolean;
	decodedDescription: string;
}

export interface NewsItem {
	news: NewsInformation;
	files: File[];
	link: string;
}
