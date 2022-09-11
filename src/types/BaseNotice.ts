export interface BaseNotice {
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
	objectId1: number;
	objectId2: number;
	objectId3: number;
	objectId4: number;
	needsConfirmation: number;
	userType: number;
	userId: number;
	info1: string;
	info2: string;
	url: string;
	child: string;
	childId: number;
	responseText: string;
	/**
	 * Can be converted to a date.
	 */
	confirmDate?: string;
	/**
	 * Can be converted to a date.
	 */
	readDate?: string;
	/**
	 * Can be converted to a date.
	 */
	fromDate: number;
	infoDate: string;
	infoImage: string;
	deleted: number;
	/**
	 * Can be converted to a date.
	 */
	nuUpdDate: number;
	nuDeleted: number;
}
