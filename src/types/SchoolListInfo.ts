export interface SchoolListInfo {
	studentLoginMethods: string;
	parentLoginMethods: string;
	name: string;
	teacherLoginMethods: string;
	/**
	 * The URL looks like this: https://sms.schoolsoft.se/{school}/
	 */
	url: string;
}
