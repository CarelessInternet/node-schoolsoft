export interface AssignmentResult {
	title: string;
	description: string;
	link: string;
	/**
	 * First item in array is guaranteed, second is not
	 */
	texts: {
		title: string;
		text: string;
	}[];
}
