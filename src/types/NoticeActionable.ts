import type { BaseNotice, JsonInformation, NoticeObject } from '.';

export interface NoticeActionable extends BaseNotice {
	object: NoticeObject;
	/**
	 * Sometimes needs to be converted to an object via JSON.parse().
	 */
	json: JsonInformation;
}

export interface NoticeActionableResponse {
	responseText: string;
}
