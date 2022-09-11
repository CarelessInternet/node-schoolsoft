import type { BaseNotice, JsonInformation, NoticeObject } from '.';

export interface Notice extends BaseNotice {
	object: NoticeObject;
	/**
	 * Sometimes needs to be converted to an object via JSON.parse().
	 */
	json: JsonInformation;
}

export interface NoticeLimit {
	notices: Notice[];
	/**
	 * Usually increments by 16 for every +1 on the second to last API parameter.
	 */
	lastUsedOffset: number;
}
