module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	// https://github.com/prettier/prettier-eslint/issues/201#issuecomment-901299351
	parserOptions: {
		project: ['tsconfig.json']
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'plugin:@typescript-eslint/strict',
		'plugin:unicorn/recommended',
		// Prettier should be last.
		'prettier'
	],
	rules: {
		// TypeScript ESLint rules from error to off:
		'@typescript-eslint/no-explicit-any': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/array-type': 'off',
		// ESLint Plugin Unicorn rules from error to off:
		'unicorn/filename-case': ['error', { case: 'pascalCase', ignore: [/environment/] }],
		// ESLint rules from error to off:
		'no-return-await': 'error',
		'prefer-rest-params': 'off'
	}
};
