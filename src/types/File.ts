export interface FileObject {
	id: number;
	orgId: number;
	creById: number;
	updById: number;
	creByType: number;
	updByType: number;
	/**
	 * Can be converted to a date.
	 */
	creDate: number;
	/**
	 * Can be converted to a date.
	 */
	updDate: number;
	name: string;
	description: string;
	originalFilename: string;
	size: number;
	parentFileId: number;
	userType: number;
	userId: number;
	folder: number;
	deleted: number;
	state: number;
	children: unknown[];
	file: boolean;
}

export interface File {
	file: FileObject;
	url: string;
}
