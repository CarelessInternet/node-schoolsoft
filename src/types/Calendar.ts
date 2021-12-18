import { BaseNotice } from '.';

export interface Calendar extends BaseNotice {
	object: 'calendar' | 'schoolcalendar' | 'privatecalendar';
	json: {
		/**
		 * Can be converted to date
		 */
		fromDate: string;
		allDay: number;
		/**
		 * Can be converted to date
		 */
		endDate: string;
		creByName: string;
		contentPreview: string;
		title: string;
	};
}
