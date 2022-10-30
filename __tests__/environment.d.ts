declare global {
	namespace NodeJS {
		/* eslint-disable-next-line unicorn/prevent-abbreviations */
		interface ProcessEnv {
			SCHOOL?: string;
			SCHOOL_USERNAME?: string;
			SCHOOL_PASSWORD?: string;
		}
	}
}

export {};
