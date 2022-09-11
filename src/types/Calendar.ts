import type { BaseNotice, JsonInformation } from '.';

export type CalendarObject = 'calendar' | 'schoolcalendar' | 'privatecalendar';

export interface Calendar extends BaseNotice {
	object: CalendarObject;
	json: JsonInformation;
}
