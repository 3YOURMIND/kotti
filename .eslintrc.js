module.exports = {
	env: {
		node: true,
		es6: true,
		browser: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: 'babel-eslint',
		allowImportExportEverywhere: true,
		ecmaVersion: 2018,
		sourceType: 'module',
	},
    "extends": [
        "@nuxtjs",
        "plugin:vue/recommended",
        'plugin:prettier/recommended',
        "@vue/prettier"
    ],
    "root": true,
}