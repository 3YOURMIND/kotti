module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
		browser: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
		allowImportExportEverywhere: true,
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['sonarjs'],
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
		'plugin:sonarjs/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier/vue',
	],
	rules: {
		'no-magic-numbers': [
			'warn',
			{ ignoreArrayIndexes: true, ignore: [0, 1, 2, -1, 10] },
		],
		'no-param-reassign': 'warn',
		'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
		'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
		'vue/attribute-hyphenation': ['error', 'never'],
		'vue/require-default-prop': 'off',
		'vue/require-component-is': 'warn',
		'vue/html-indent': 'off',
		'sonarjs/no-duplicate-string': 'warn',
		'@typescript-eslint/member-delimiter-style': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'prettier/prettier': 'warn',
	},
	overrides: [
		{
			files: ['**/*.vue', '**/*.js'],
			rules: {},
		},
		{
			files: ['**/*.spec.ts'],
			env: {
				jest: true,
			},
			plugins: ['plugin:jest/recommended'],
		},
	],
}
