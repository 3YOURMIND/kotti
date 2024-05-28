import type { TSESLint } from '@typescript-eslint/utils'
import eslint from '@eslint/js'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import jsonc from 'eslint-plugin-jsonc'
import jsoncEslintParser from 'jsonc-eslint-parser'
import pluginVue from 'eslint-plugin-vue'
import sonarjs from 'eslint-plugin-sonarjs'
import tseslint from 'typescript-eslint'
import vitest from 'eslint-plugin-vitest'
import vueParser from 'vue-eslint-parser'

import vueConsistentRefNames from './rules/vue-consistent-ref-names.js'
import vueNoVModelDeep from './rules/vue-no-v-model-deep.js'
import vueNoVTOnComponents from './rules/vue-no-v-t-on-components.js'
import vueNoVTWithoutTranslation from './rules/vue-no-v-t-without-translation.js'
import { noRestrictedGlobalsConfig } from './utils/no-restricted-globals.js'
import type { SharedConfig } from '@typescript-eslint/utils/ts-eslint'

const IGNORED_AS_UNLIKELY = ['for-direction']
const IGNORED_AS_COVERED_BY_TS = [
	'getter-return',
	'no-async-promise-executor',
	'no-class-assign',
	'no-const-assign',
	'no-constant-binary-expression',
	'no-delete-var',
	'no-dupe-args',
	'no-dupe-class-members',
	'no-dupe-keys',
	'no-extra-boolean-cast',
	'no-func-assign',
	'no-import-assign',
	'no-new-native-nonconstructor',
	'no-obj-calls',
	'no-setter-return',
	'no-this-before-super',
	'no-undef',
	'no-unreachable',
	'no-unsafe-optional-chaining',
	'valid-typeof',
]
const IGNORED_AS_COVERED_BY_TS_ESLINT = [
	'no-array-constructor',
	'no-implied-eval',
	'no-loss-of-precision',
	'no-unused-vars',
	'require-await',
]

/**
 * For unknown reasons eslint is not able to infer all types reliably.
 * This seems to only occur in the context of iterators. However, since we were not able to track the
 * reason for this misbehavior down, we decided to deactivate these rules for now.
 *
 * Consider the following snippet:
 *
 * @example
 * const lowerCaseSet = (set: Set<string>) => {
 * 	const result = new Set()
 * 	for (const item of set) {
 *		result.add(item.toLowerCase()) // eslint will assume that `item` is any and raise '@typescript-eslint/no-unsafe-member-access'
 *	}
 *	return result
 * }
 *
 */
const IGNORED_BECAUSE_ESLINT_CAN_NOT_RELIABLY_INFER_TYPES = [
	'@typescript-eslint/no-unsafe-argument',
	'@typescript-eslint/no-unsafe-assignment',
	'@typescript-eslint/no-unsafe-call',
	'@typescript-eslint/no-unsafe-member-access',
	'@typescript-eslint/no-unsafe-return',
]

const IGNORED_RULES = new Set([
	...IGNORED_AS_UNLIKELY,
	...IGNORED_AS_COVERED_BY_TS,
	...IGNORED_AS_COVERED_BY_TS_ESLINT,
	...IGNORED_BECAUSE_ESLINT_CAN_NOT_RELIABLY_INFER_TYPES,
])

const ignoredRules = Object.fromEntries(
	Array.from(IGNORED_RULES).map((rule) => [rule, 'off']),
) satisfies SharedConfig.RulesRecord

const rules = {
	/**
	 * @see {@link https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/vue-consistent-ref-names.ts}
	 */
	'vue-consistent-ref-names': vueConsistentRefNames,
	/**
	 * @see {@link https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/vue-no-v-model-deep.ts}
	 */
	'vue-no-v-model-deep': vueNoVModelDeep,
	/**
	 * @see {@link https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/vue-no-v-t-on-components.ts}
	 */
	'vue-no-v-t-on-components': vueNoVTOnComponents,
	/**
	 * @see {@link https://github.com/3YOURMIND/kotti/blob/master/packages/eslint-config/source/rules/vue-no-v-t-without-translation.ts}
	 */
	'vue-no-v-t-without-translation': vueNoVTWithoutTranslation,
} satisfies Record<string, TSESLint.LooseRuleDefinition>

/**
 * This config should be used as the last item in `extends` since eslint-plugin-prettier
 * should be the last config that gets applied
 */
const baseConfig = tseslint.config({
	name: '@3yourmind/eslint-config/base-config',
	extends: [
		eslintPluginPrettierRecommended as TSESLint.FlatConfig.Config,
		sonarjs.configs.recommended,
	],
	rules: {
		...ignoredRules,

		// Typescript Eslint
		'@typescript-eslint/ban-ts-comment': [
			'error',
			{
				'ts-expect-error': 'allow-with-description',
				minimumDescriptionLength: 24,
			},
		],
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'error',
		'@typescript-eslint/no-empty-interface': 'error',
		'@typescript-eslint/no-namespace': 'off', // We want to be able to use modules for namespacing
		'@typescript-eslint/no-unsafe-enum-comparison': 'off', // This rule forbids comparing enums with their literal member values, which is useful in many cases
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
		],
		'@typescript-eslint/no-use-before-define': 'error',

		// Eslint
		'dot-notation': 'warn',
		'no-alert': 'error',
		'no-console': 'error',
		'no-debugger': 'error',
		'no-lonely-if': 'warn', // needed by unicorn/no-lonely-if
		'no-magic-numbers': ['warn', { ignore: [0, 1, 2, -1, 10] }],
		'no-param-reassign': 'error',
		'no-restricted-globals': ['error', ...noRestrictedGlobalsConfig],
		'prefer-const': 'warn',
		radix: 'error',
		'valid-typeof': 'error',

		// SonarJS
		'sonarjs/no-collapsible-if': 'off', // replaced by unicorn/no-lonely-if
		'sonarjs/no-duplicate-string': 'off',
		'sonarjs/no-small-switch': 'off',
		'sonarjs/no-redundant-jump': 'off',

		// Unicorn
		'unicorn/catch-error-name': 'warn',
		'unicorn/consistent-destructuring': 'warn',
		'unicorn/custom-error-definition': 'warn',
		'unicorn/error-message': 'warn',
		'unicorn/explicit-length-check': 'warn',
		'unicorn/new-for-builtins': 'warn',
		'unicorn/no-array-method-this-argument': 'warn',
		'unicorn/no-array-push-push': 'warn',
		'unicorn/no-for-loop': 'warn',
		'unicorn/no-instanceof-array': 'warn',
		'unicorn/no-lonely-if': 'warn',
		'unicorn/no-new-array': 'warn',
		'unicorn/no-object-as-default-parameter': 'error',
		'unicorn/no-this-assignment': 'error',
		'unicorn/no-unused-properties': 'error',
		'unicorn/no-useless-length-check': 'warn',
		'unicorn/no-useless-spread': 'warn',
		'unicorn/no-zero-fractions': 'warn',
		'unicorn/prefer-array-find': 'warn',
		'unicorn/prefer-array-flat-map': 'warn',
		'unicorn/prefer-array-flat': 'warn',
		'unicorn/prefer-array-index-of': 'warn',
		'unicorn/prefer-array-some': 'warn',
		'unicorn/prefer-date-now': 'warn',
		'unicorn/prefer-dom-node-append': 'warn',
		'unicorn/prefer-dom-node-remove': 'warn',
		'unicorn/prefer-includes': 'warn',
		'unicorn/prefer-keyboard-event-key': 'warn',
		'unicorn/prefer-math-trunc': 'warn',
		'unicorn/prefer-modern-dom-apis': 'warn',
		'unicorn/prefer-negative-index': 'warn',
		'unicorn/prefer-number-properties': 'warn',
		'unicorn/prefer-object-from-entries': 'warn',
		'unicorn/prefer-prototype-methods': 'warn',
		'unicorn/prefer-query-selector': 'warn',
		'unicorn/prefer-regexp-test': 'warn',
		'unicorn/prefer-set-has': 'warn',
		'unicorn/prefer-string-replace-all': 'warn',
		'unicorn/prefer-string-slice': 'warn',
		'unicorn/prefer-string-starts-ends-with': 'warn',
		'unicorn/prefer-string-trim-start-end': 'warn',
		'unicorn/prefer-switch': 'warn',
		'unicorn/prefer-ternary': ['warn', 'only-single-line'],
		'unicorn/prefer-type-error': 'warn',
		'unicorn/require-array-join-separator': 'error',
		'unicorn/require-number-to-fixed-digits-argument': 'warn',
	},
})

const defaultNamingConventionConfig = {
	leadingUnderscore: 'allow',
	trailingUnderscore: 'forbid',
}

const rulesRequiringTypes = {
	'@typescript-eslint/consistent-type-imports': 'warn',
	'@typescript-eslint/naming-convention': [
		'error',
		{
			...defaultNamingConventionConfig,
			selector: 'default',
			format: null,
		},
		{
			...defaultNamingConventionConfig,
			selector: [
				'classMethod',
				'function',
				'objectLiteralMethod',
				'typeMethod',
			],
			format: ['camelCase'],
		},
		{
			...defaultNamingConventionConfig,
			selector: 'enum',
			format: ['PascalCase'],
		},
		{
			...defaultNamingConventionConfig,
			selector: 'enumMember',
			format: ['UPPER_CASE'],
		},
		{
			...defaultNamingConventionConfig,
			selector: ['parameter', 'variable'],
			format: ['camelCase', 'UPPER_CASE'],
		},
		{
			...defaultNamingConventionConfig,
			selector: 'typeParameter',
			format: ['UPPER_CASE'],
		},
		{
			...defaultNamingConventionConfig,
			selector: ['class', 'enum', 'interface', 'typeAlias'],
			format: ['PascalCase'],
		},
	],
	'@typescript-eslint/no-confusing-void-expression': 'warn',
	'@typescript-eslint/no-duplicate-type-constituents': [
		'error',
		/**
		 * Only do for intersections, sometimes we use duplicate types to add context to a type definition
		 */
		{ ignoreUnions: true },
	],
	'@typescript-eslint/no-unnecessary-condition': 'error',
	'@typescript-eslint/no-unnecessary-type-arguments': 'warn',
	'@typescript-eslint/no-unnecessary-type-assertion': 'error',
	'@typescript-eslint/prefer-nullish-coalescing': 'warn',
	'@typescript-eslint/prefer-optional-chain': 'warn',
	'@typescript-eslint/restrict-template-expressions': [
		'error',
		{
			allowAny: false,
			allowBoolean: false,
			allowNullish: false,
			allowNumber: true,
			allowRegExp: false,
			allowNever: false,
		},
	],
	'@typescript-eslint/switch-exhaustiveness-check': 'error',
} satisfies SharedConfig.RulesRecord

const plugin = {
	rules,
} satisfies TSESLint.FlatConfig.Plugin

export default {
	configs: {
		/**
		 * Should be used on .ts and .tsx files. This enables rules that rely on type checking.
		 */
		default: tseslint.config({
			name: '@3yourmind/eslint-config/default',
			extends: [
				eslint.configs.recommended,
				...tseslint.configs.strictTypeChecked,
				...baseConfig,
			],
			rules: {
				...rulesRequiringTypes,
			},
		}),
		/**
		 * Registers plugins and settings that should be globally enabled.
		 */
		global: tseslint.config({
			name: '@3yourmind/eslint-config/global',
			languageOptions: {
				/**
				 * As recommended by eslint-plugin-unicorn
				 * @see {@link https://github.com/sindresorhus/eslint-plugin-unicorn/blob/b3888f87cd83fa5c697ee8acfebf998271eecc2a/readme.md#es-module-recommended}
				 */
				// globals: eslintrc.Legacy.environments.get('es2024'),
			},
			linterOptions: {
				reportUnusedDisableDirectives: 'error',
			},
			plugins: {
				'@3yourmind/eslint-config': plugin,
				'@typescript-eslint': tseslint.plugin,
				unicorn: eslintPluginUnicorn,
			},
		}),
		/**
		 * Should be used only on JSON files. Treats some files (e.g. tsconfig) as jsonc.
		 */
		json: tseslint.config(
			{
				name: '@3yourmind/eslint-config/json',
				files: ['**/*.json'],
				ignores: ['**/tsconfig*.json'],
				languageOptions: {
					parser: jsoncEslintParser,
				},
				plugins: {
					jsonc,
				},
				rules: {
					...(jsonc.configs['recommended-with-json']
						.rules as TSESLint.FlatConfig.Rules),
					'jsonc/sort-keys': [
						'warn',
						{
							pathPattern: '^exports(?:\\[[^\\]]+\\]|\\.[^.]+)+$',
							order: ['types', 'default', 'import', 'require'],
						},
						{
							pathPattern: '.*',
							order: { caseSensitive: false, natural: true, type: 'asc' },
						},
					],
				},
			},
			{
				name: '@3yourmind/eslint-config/tsconfig-json',
				files: ['**/tsconfig*.json'],
				languageOptions: {
					parser: jsoncEslintParser,
				},
				plugins: {
					jsonc,
				},
				rules: {
					...(jsonc.configs['recommended-with-jsonc']
						.rules as TSESLint.FlatConfig.Rules),
					'jsonc/sort-keys': [
						'warn',
						{
							pathPattern: '.*',
							order: { type: 'asc' },
						},
					],
				},
			},
		),
		/**
		 * Should be used on test files. It includes vitest-specific rules and turns off rules that
		 * would be unhelpful/annoying when writing tests.
		 */
		tests: tseslint.config({
			name: '@3yourmind/eslint-config/tests',
			files: ['**/*.test.{ts,tsx}'],
			plugins: { vitest },
			extends: [vitest.configs.recommended, ...baseConfig],
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				'@typescript-eslint/no-empty-interface': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/no-use-before-define': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'no-console': 'off',
				'no-magic-numbers': 'off',
				'vitest/no-disabled-tests': 'error',
				'vitest/no-identical-title': 'error',
				'vue/one-component-per-file': 'off',
			},
		}),
		/**
		 * Enables basic rules for javascript files. Use a more specific config if possible
		 *
		 * @deprecated
		 */
		untyped: tseslint.config({
			name: '@3yourmind/eslint-config/untyped',
			extends: [
				eslint.configs.recommended,
				...tseslint.configs.recommended,
				...baseConfig,
			],
			files: ['**/*.{cjs,js,mjs}'],
		}),
		/**
		 * Should be used only on .vue files. Includes vue-specific rules. Works best on `<script lang="ts">`
		 */
		vue: tseslint.config({
			name: '@3yourmind/eslint-config/vue',
			extends: [
				...pluginVue.configs['flat/vue2-recommended'],
				...tseslint.configs.strictTypeChecked,
				...baseConfig,
			],
			files: ['**/*.vue'],
			languageOptions: {
				parser: vueParser,
				parserOptions: {
					ecmaFeatures: {
						jsx: true,
					},
					ecmaVersion: 2020,
					extraFileExtensions: ['.vue'],
					parser: tseslint.parser,
				},
			},
			rules: {
				...rulesRequiringTypes,
				'@3yourmind/eslint-config/vue-consistent-ref-names': 'error',
				'@3yourmind/eslint-config/vue-no-v-model-deep': 'error',
				'@3yourmind/eslint-config/vue-no-v-t-on-components': 'error',
				'vue/attribute-hyphenation': ['warn', 'never'],
				'vue/attributes-order': ['warn', { alphabetical: true }],
				'vue/custom-event-name-casing': ['error', 'camelCase'],
				'vue/html-self-closing': [
					'warn',
					{
						html: { component: 'always', normal: 'always', void: 'always' },
						math: 'always',
						svg: 'always',
					},
				],
				'vue/jsx-uses-vars': 'error',
				'vue/no-empty-component-block': 'error',
				'vue/no-mutating-props': 'error',
				'vue/no-ref-as-operand': 'error',
				'vue/no-setup-props-reactivity-loss': 'error',
				'vue/no-unused-properties': 'error',
				'vue/no-unused-refs': 'error',
				'vue/no-useless-mustaches': ['warn', { ignoreIncludesComment: true }],
				'vue/no-useless-v-bind': 'warn',
				'vue/require-component-is': 'error',
				'vue/require-default-prop': 'off', // disabled because it doesn’t handle boolean props correctly
			},
		}),
	},
	plugin,
}
