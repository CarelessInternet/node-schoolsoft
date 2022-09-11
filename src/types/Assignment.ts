import type { BaseNotice, JsonInformation } from '.';

export interface AssignmentJson extends JsonInformation {
	studentfileupload?: number;
}

export interface Assignment extends BaseNotice {
	object: 'test';
	json: AssignmentJson;
}
