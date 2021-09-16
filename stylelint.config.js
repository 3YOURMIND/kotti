// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

module.exports = {
	configBaseDir: path.resolve(__dirname, 'node_modules'),
	plugins: ['stylelint-csstree-validator', 'stylelint-selector-no-empty'],
	extends: [
		'stylelint-config-recommended-scss',
		'stylelint-config-recess-order',
		'stylelint-prettier/recommended',
		'stylelint-scss',
	],
	rules: {
		'no-descending-specificity': null,
		'no-empty-source': null,
		'scss/selector-no-redundant-nesting-selector': null,
		'scss/no-duplicate-dollar-variables': true,
		'csstree/validator': true,
		'plugin/stylelint-selector-no-empty': true,
		'selector-pseudo-element-no-unknown': [
			true,
			{
				ignorePseudoElements: ['v-deep'],
			},
		],
	},
}
