import { BaseNotice } from '.';

interface Notice extends BaseNotice {
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

export interface NoticeLimit {
	notices: Notice[];
	/**
	 * Usually increments by 16 for every +1 on second to last parameter
	 */
	lastUsedOffset: number;
}
