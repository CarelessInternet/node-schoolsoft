/**
 * Information about the current logged in user
 */
export interface User {
	pictureUrl: string;
	name: string;
	isOfAge: boolean;
	appKey: string;
	orgs: {
		name: string;
		blogger: boolean;
		schoolType: number;
		leisureSchool: number;
		class: string;
		orgId: number;
		tokenLogin: string;
	}[];
	type: number;
	userId: number;
}
