export enum UserTypes {
	Student = 'student',
	Guardian = 'guardian',
	Staff = 'staff'
}

export enum UserTypesAsNumbers {
	Student = 1,
	Guardian,
	Staff
}

function capitalize(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

export function userTypeFromString(type: UserTypes) {
	return UserTypesAsNumbers[capitalize(type) as keyof typeof UserTypesAsNumbers];
}

export function userTypeFromNumber(type: UserTypesAsNumbers) {
	return UserTypes[UserTypesAsNumbers[type] as keyof typeof UserTypes];
}
