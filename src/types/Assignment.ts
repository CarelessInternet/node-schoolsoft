import { BaseNotice } from '.';

export interface Assignment extends BaseNotice {
	object: 'test';
	json: {
		/**
		 * Can be converted to date
		 */
		fromDate: string;
		/**
		 * Can be converted to date
		 */
		endDate: string;
		creByName: string;
		contentPreview: string;
		title: string;
		studentfileupload?: number;
	};
}
