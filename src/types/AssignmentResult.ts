export interface AssignmentResultText {
	title: string;
	text: string;
}

export interface AssignmentResult {
	title: string;
	description: string;
	link: string;
	/**
	 * First item in the array is guaranteed, others are not.
	 */
	texts: AssignmentResultText[];
}
