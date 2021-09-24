/**
 * @type {import('eslint').Linter.Config}
 */
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
	plugins: ['sonarjs', 'import'],
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
		'plugin:sonarjs/recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'@vue/typescript',
		'prettier/vue',
	],
	rules: {
		'import/order': [
			'warn',
			{
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
				'newlines-between': 'always',
			},
		],
		'no-console': process.env.NODE_ENV === 'development' ? 'off' : 'error',
		'no-debugger': process.env.NODE_ENV === 'development' ? 'off' : 'error',
		'no-magic-numbers': [
			'warn',
			{ ignoreArrayIndexes: true, ignore: [0, 1, 2, -1, 10] },
		],
		'no-param-reassign': 'warn',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/member-delimiter-style': 'off',
		'@typescript-eslint/no-extra-semi': 'off', // conflicts with prettier
		'@typescript-eslint/no-namespace': 'off',
		'sonarjs/no-duplicate-string': 'warn',
		'prettier/prettier': 'warn',
		'vue/attribute-hyphenation': ['error', 'never'],
		'vue/attributes-order': ['error', { alphabetical: true }],
		'vue/html-indent': 'off',
		'vue/require-component-is': 'warn',
		'vue/require-default-prop': 'off',
	},
	overrides: [
		{
			files: ['**/*.vue', '**/*.js'],
			rules: {},
		},
		{
			files: [
				'packages/**/tests.ts',
				'packages/**/*.test.ts',
				'packages/kotti-ui/source/test-utils/**/*.ts',
				'packages/storybook/**/*',
			],
			env: {
				jest: true,
			},
			plugins: ['jest'],
			extends: ['plugin:jest/recommended'],
			rules: {
				'import/order': [
					'warn',
					{
						alphabetize: {
							order: 'asc',
							caseInsensitive: true,
						},
						'newlines-between': 'always',
					},
				],
				'no-console': 'off',
				'no-magic-numbers': 'off',
				'sonarjs/no-duplicate-string': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
			},
		},
	],
}
