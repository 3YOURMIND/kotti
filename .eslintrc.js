module.exports = {
	root: true,
	env: {
		node: true,
		es6: true,
		browser: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint',
		allowImportExportEverywhere: true,
		ecmaVersion: 2020,
		sourceType: 'module',
	},
	plugins: ['sonarjs'],
	extends: [
		'eslint:recommended',
		'plugin:vue/recommended',
		'plugin:sonarjs/recommended',
		'plugin:prettier/recommended',
		'prettier/vue',
	],
	rules: {
		'no-magic-numbers': [
			'warn',
			{ ignoreArrayIndexes: true, ignore: [0, 1, 2, -1, 10] },
		],
		'prettier/prettier':  'error',
		'import/max-dependencies': 'off',
		'import/order': 'off',
		'no-param-reassign':  'warn',
		'linebreak-style': ['error', 'unix'],
		'no-console':  'error',
		'no-debugger': 'error',
		'vue/attribute-hyphenation': ['error', 'never'],
		'vue/require-default-prop': 'off',
		'vue/require-component-is':  'warn',
		'vue/html-indent': 'off',
		'sonarjs/no-duplicate-string':  'warn',
	},
}
