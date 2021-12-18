import { BaseNotice } from '.';

export interface NoticeActionable extends BaseNotice {
	object:
		| 'message'
		| 'news'
		| 'forum'
		| 'forummessage'
		| 'inquiry'
		| 'teststudent';
	/**
	 * Sometimes needs to be converted to object via JSON.parse()
	 */
	json: {
		creByName: string;
		contentPreview: string;
		title: string;
		/**
		 * Can be converted to date
		 */
		fromDate?: string;
		allDay?: number;
		/**
		 * Can be converted to date
		 */
		endDate?: string;
	};
}
