export interface BaseNotice {
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
	 * Can be converted to date
	 */
	confirmDate: string | null;
	/**
	 * Can be converted to date
	 */
	readDate: string | null;
	/**
	 * Can be converted to date
	 */
	fromDate: number;
	infoDate: string;
	infoImage: string;
	deleted: number;
	/**
	 * Can be converted to date
	 */
	nuUpdDate: number;
	nuDeleted: number;
}
