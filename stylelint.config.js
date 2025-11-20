// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path')

const BEM_REGEX = new RegExp(
	/^[a-z]([-]?[a-z0-9]+)*(__[a-z0-9]([-]?[a-z0-9]+)*)?(--[a-z0-9]([-]?[a-z0-9]+)*)?$/,
)

module.exports = {
	configBaseDir: path.resolve(__dirname, 'node_modules'),
	extends: [
		'stylelint-config-standard',
		'stylelint-config-standard-scss',
		'stylelint-config-recess-order',
		'stylelint-prettier/recommended',
		'stylelint-config-recommended-vue',
	],
	rules: {
		'at-rule-no-unknown': null,
		'declaration-property-value-no-unknown': null,
		'function-no-unknown': null,
		'media-query-no-invalid': null,
		'no-descending-specificity': null,
		'no-empty-source': null,
		'selector-class-pattern': [
			BEM_REGEX,
			{
				resolveNestedSelectors: true,
				message: (error) =>
					`"${error}" is not a valid BEM class name (see https://getbem.com/naming/)`,
			},
		],
		'selector-pseudo-class-no-unknown': [
			true,
			{
				ignorePseudoClasses: ['deep'],
			},
		],
		'scss/at-import-no-partial-leading-underscore': null,
		'scss/at-import-partial-extension': null,
		'scss/at-rule-no-unknown': true,
		'scss/dollar-variable-colon-space-after': null,
		'scss/function-no-unknown': true,
		'scss/load-partial-extension': null,
		'scss/no-duplicate-dollar-variables': true,

		'scss/load-no-partial-leading-underscore': null,
		'value-keyword-case': [
			'lower',
			{
				camelCaseSvgKeywords: true,
			},
		],
	},
}
