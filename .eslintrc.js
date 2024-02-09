const noExtraneousDependenciesOverride = (package) => ({
	'import/no-extraneous-dependencies': [
		'error',
		{
			packageDir: ['.', `./packages/${package}`],
		},
	],
})

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
		'prettier',
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
		'@typescript-eslint/no-restricted-imports': [
			'error',
			{
				message:
					"Avoid direct imports from lodash; e.g. import foo from 'lodash/foo' instead of import { foo } from 'lodash'",
				name: 'lodash',
			},
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/member-delimiter-style': 'off',
		'@typescript-eslint/no-extra-semi': 'off', // conflicts with prettier
		'@typescript-eslint/no-namespace': 'off',
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
		'no-param-reassign': 'warn',
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
			files: ['packages/kotti-ui/**/*.{ts,js,vue}'],
			rules: {
				...noExtraneousDependenciesOverride('kotti-ui'),
			},
		},
		{
			files: ['packages/documentation/**/*.{ts,js,vue}'],
			rules: {
				...noExtraneousDependenciesOverride('documentation'),
			},
		},
		{
			files: ['packages/vue-use-tippy/**/*.{ts,vue}'],
			rules: {
				...noExtraneousDependenciesOverride('vue-use-tippy'),
			},
		},
		{
			files: ['packages/yoco/**/*.ts'],
			rules: {
				...noExtraneousDependenciesOverride('yoco'),
			},
		},
		{
			files: ['**/*.vue', '**/*.js'],
			rules: {},
		},
		{
			extends: ['plugin:vitest/recommended'],
			files: [
				'packages/**/*.test.ts',
				'packages/kotti-ui/source/test-utils/**/*.ts',
			],
			plugins: ['vitest'],
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
				'vue/one-component-per-file': 'off',
				'@typescript-eslint/ban-ts-comment': 'off',
			},
		},
		{
			files: ['**/*.json'],
			rules: {
				'sonarjs/no-duplicate-string': 'off',
			},
		},
	],
}
