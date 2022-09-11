import type { File } from '.';

export interface AssignmentInformation {
	title: string;
	subject: string;
	teacher: string;
	max1: number;
	max2: number;
	max3: number;
	textToStartPage: string;
	description: string;
	centralContent: unknown[];
	proficiency: string[];
	files: File[];
}
