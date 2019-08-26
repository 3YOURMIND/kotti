module.exports = {
	extends: [
		'stylelint-config-recommended-scss',
		'stylelint-config-recess-order',
		'stylelint-prettier/recommended',
		'stylelint-scss',
	],
	rules: {
		'no-empty-source': null,
		// check and add avaialble rules here: https://github.com/kristerkari/stylelint-scss
		'scss/selector-no-redundant-nesting-selector': true,
	},
}
