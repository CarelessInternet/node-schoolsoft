/**
 * Returns login information about a school
 */
export interface SchoolListInfo {
	studentLoginMethods: string;
	parentLoginMethods: string;
	name: string;
	teacherLoginMethods: string;
	/**
	 * https://sms.schoolsoft.se/{school}/
	 */
	url: string;
}
