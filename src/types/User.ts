import type { UserTypes } from '../enums';

export interface UserOrgs {
	name: string;
	blogger: boolean;
	schoolType: number;
	leisureSchool: number;
	class: string;
	orgId: number;
	tokenLogin: string;
}

export interface User {
	pictureUrl: string;
	name: string;
	isOfAge: boolean;
	appKey: string;
	orgs: UserOrgs[];
	type: UserTypes;
	userId: number;
}
