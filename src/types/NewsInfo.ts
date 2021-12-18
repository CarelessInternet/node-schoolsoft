export interface NewsInfo {
	news: {
		id: number;
		orgId: number;
		creById: number;
		updById: number;
		creByType: number;
		updByType: number;
		/**
		 * Can be converted to date
		 */
		creDate: number;
		/**
		 * Can be converted to date
		 */
		updDate: number;
		userId: number;
		confirmation: number;
		response: number;
		userType: number;
		type: number;
		category: number;
		fileuploadFileSize: number;
		allDay: number;
		name: string;
		description: string;
		responseLabel: string;
		fileuploadFileName: string;
		/**
		 * Can be converted to date
		 */
		toDate: number;
		/**
		 * Can be converted to date
		 */
		fromDate: number;
		toTeacher: boolean;
		toStudent: boolean;
		toParent: boolean;
		decodedDescription: string;
	};
	files: string[];
	link: string;
}
