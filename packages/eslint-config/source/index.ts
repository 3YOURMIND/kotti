import comments from '@eslint-community/eslint-plugin-eslint-comments/configs'
import eslint from '@eslint/js'
import type { TSESLint } from '@typescript-eslint/utils'
import type { SharedConfig } from '@typescript-eslint/utils/ts-eslint'
import jsonc from 'eslint-plugin-jsonc'
import perfectionist from 'eslint-plugin-perfectionist'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import sonarjs from 'eslint-plugin-sonarjs'
import eslintPluginUnicorn from 'eslint-plugin-unicorn'
import vitest from 'eslint-plugin-vitest'
import pluginVue from 'eslint-plugin-vue'
import jsoncEslintParser from 'jsonc-eslint-parser'
import tseslint from 'typescript-eslint'
import vueParser from 'vue-eslint-parser'

import vueConsistentRefNames from './rules/vue-consistent-ref-names.js'
import vueNoVModelDeep from './rules/vue-no-v-model-deep.js'
import vueNoVTOnComponents from './rules/vue-no-v-t-on-components.js'
import vueNoVTWithoutTranslation from './rules/vue-no-v-t-without-translation.js'
import { noRestrictedGlobalsConfig } from './utils/no-restricted-globals.js'

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
	...IGNORED_AS_COVERED_BY_TS,
	...IGNORED_AS_COVERED_BY_TS_ESLINT,
	...IGNORED_AS_UNLIKELY,
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
	extends: [
		eslintPluginPrettierRecommended as TSESLint.FlatConfig.Config,
		sonarjs.configs.recommended,
	],
	name: '@3yourmind/eslint-config/base-config',
	rules: {
		...ignoredRules,

		// Typescript Eslint
		'@typescript-eslint/no-namespace': 'off', // We want to be able to use modules for namespacing
		'@typescript-eslint/no-unsafe-enum-comparison': 'off', // This rule forbids comparing enums with their literal member values, which is useful in many cases
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ argsIgnorePattern: '^_', destructuredArrayIgnorePattern: '^_' },
		],
		'@typescript-eslint/no-use-before-define': 'error',
		'@typescript-eslint/switch-exhaustiveness-check': [
			'error',
			{
				considerDefaultExhaustiveForUnions: true,
			},
		],

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

		// prettier
		'prettier/prettier': 'warn',

		// SonarJS
		'sonarjs/deprecation': 'off', // deprecation is intentionally used for flagging outdated but not yet removed code
		'sonarjs/different-types-comparison': 'off', // conflicts with @typescript-eslint/no-unnecessary-condition
		'sonarjs/empty-string-repetition': 'off',
		'sonarjs/fixme-tag': 'off',
		'sonarjs/function-return-type': 'off',
		'sonarjs/no-collapsible-if': 'off', // replaced by unicorn/no-lonely-if
		'sonarjs/no-duplicate-string': 'off',
		'sonarjs/no-nested-conditional': 'off',
		'sonarjs/no-redundant-jump': 'off',
		'sonarjs/no-small-switch': 'off',
		'sonarjs/no-use-of-empty-return-value': 'off',
		'sonarjs/pseudo-random': 'off',
		'sonarjs/redundant-type-aliases': 'off',
		'sonarjs/void-use': 'off',

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
		'unicorn/prefer-array-flat': 'warn',
		'unicorn/prefer-array-flat-map': 'warn',
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
	'@typescript-eslint/ban-ts-comment': [
		'error',
		{
			minimumDescriptionLength: 24,
			'ts-expect-error': 'allow-with-description',
		},
	],
	'@typescript-eslint/consistent-type-imports': 'warn',
	'@typescript-eslint/explicit-function-return-type': 'off',
	'@typescript-eslint/explicit-module-boundary-types': 'error',
	'@typescript-eslint/naming-convention': [
		'error',
		{
			...defaultNamingConventionConfig,
			format: null,
			selector: 'default',
		},
		{
			...defaultNamingConventionConfig,
			format: ['camelCase'],
			selector: [
				'classMethod',
				'function',
				'objectLiteralMethod',
				'typeMethod',
			],
		},
		{
			...defaultNamingConventionConfig,
			format: ['PascalCase'],
			selector: 'enum',
		},
		{
			...defaultNamingConventionConfig,
			format: ['UPPER_CASE'],
			selector: 'enumMember',
		},
		{
			...defaultNamingConventionConfig,
			format: ['camelCase', 'UPPER_CASE'],
			selector: ['parameter', 'variable'],
		},
		{
			...defaultNamingConventionConfig,
			format: ['UPPER_CASE'],
			selector: 'typeParameter',
		},
		{
			...defaultNamingConventionConfig,
			format: ['PascalCase'],
			selector: ['class', 'enum', 'interface', 'typeAlias'],
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
	'@typescript-eslint/no-empty-interface': 'error',
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
			allowNever: false,
			allowNullish: false,
			allowNumber: true,
			allowRegExp: false,
		},
	],
} satisfies SharedConfig.RulesRecord

const plugin = {
	rules,
} satisfies TSESLint.FlatConfig.Plugin

const kottiEslintConfig: {
	configs: {
		default: TSESLint.FlatConfig.ConfigArray
		global: TSESLint.FlatConfig.ConfigArray
		json: TSESLint.FlatConfig.ConfigArray
		tests: TSESLint.FlatConfig.ConfigArray
		untyped: TSESLint.FlatConfig.ConfigArray
		vue: TSESLint.FlatConfig.ConfigArray
	}
	plugin: TSESLint.FlatConfig.Plugin
} = {
	configs: {
		/**
		 * Should be used on .ts and .tsx files. This enables rules that rely on type checking.
		 */
		default: tseslint.config({
			extends: [
				eslint.configs.recommended,
				...tseslint.configs.strictTypeChecked,
				...baseConfig,
			],
			name: '@3yourmind/eslint-config/default',
			rules: {
				...rulesRequiringTypes,
			},
		}),
		/**
		 * Registers plugins and settings that should be globally enabled.
		 */
		global: tseslint.config({
			extends: [
				comments.recommended,
				perfectionist.configs[
					'recommended-natural'
				] as TSESLint.FlatConfig.Config,
			],
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
			name: '@3yourmind/eslint-config/global',
			plugins: {
				'@3yourmind/eslint-config': plugin,
				'@typescript-eslint': tseslint.plugin,
				unicorn: eslintPluginUnicorn,
				vue: pluginVue,
			},
			rules: {
				'@eslint-community/eslint-comments/no-duplicate-disable': 'off',
				'perfectionist/sort-array-includes': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-classes': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-enums': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-exports': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-imports': [
					'warn',
					{
						customGroups: {
							type: {
								'3yourmind': ['@3yourmind/*'],
							},
							value: {
								'3yourmind': ['@3yourmind/*'],
							},
						},
						groups: [
							'type',
							'builtin',
							['external-type', 'external'],
							'3yourmind',
							'side-effect',
							['internal-type', 'internal'],
							['parent-type', 'parent'],
							['sibling-type', 'sibling', 'index-type', 'index'],
							['object', 'unknown'],
						],
						order: 'asc',
						type: 'natural',
					},
				],
				'perfectionist/sort-interfaces': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-intersection-types': [
					'warn',
					{
						groups: ['named', 'object', 'function', 'unknown', 'nullish'],
						order: 'asc',
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-jsx-props': [
					'warn',
					{
						type: 'natural',
					},
				],
				'perfectionist/sort-maps': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-modules': 'off', // conflicts with @typescript-eslint/no-use-before-define
				'perfectionist/sort-named-exports': [
					'warn',
					{ partitionByComment: true, type: 'natural' },
				],
				'perfectionist/sort-named-imports': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-object-types': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-objects': [
					'warn',
					{
						ignorePattern: ['defineComponent'],
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-sets': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-switch-case': [
					'warn',
					{
						type: 'natural',
					},
				],
				'perfectionist/sort-union-types': [
					'warn',
					{
						groups: ['named', 'object', 'function', 'unknown', 'nullish'],
						order: 'asc',
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-variable-declarations': [
					'warn',
					{
						partitionByComment: true,
						type: 'natural',
					},
				],
				'perfectionist/sort-vue-attributes': 'off',
			},
		}),
		/**
		 * Should be used only on JSON files. Treats some files (e.g. tsconfig) as jsonc.
		 */
		json: tseslint.config(
			{
				files: ['**/*.json'],
				ignores: ['**/tsconfig*.json'],
				languageOptions: {
					parser: jsoncEslintParser,
				},
				name: '@3yourmind/eslint-config/json',
				plugins: {
					jsonc,
				},
				rules: {
					...(jsonc.configs['recommended-with-json']
						.rules as TSESLint.FlatConfig.Rules),
					'jsonc/sort-keys': [
						'warn',
						{
							order: ['types', 'default', 'import', 'require'],
							pathPattern: '^exports(?:\\[[^\\]]+\\]|\\.[^.]+)+$',
						},
						{
							order: { caseSensitive: false, natural: true, type: 'asc' },
							pathPattern: '.*',
						},
					],
				},
			},
			{
				files: ['**/tsconfig*.json'],
				languageOptions: {
					parser: jsoncEslintParser,
				},
				name: '@3yourmind/eslint-config/tsconfig-json',
				plugins: {
					jsonc,
				},
				rules: {
					...(jsonc.configs['recommended-with-jsonc']
						.rules as TSESLint.FlatConfig.Rules),
					'jsonc/sort-keys': [
						'warn',
						{
							order: { type: 'asc' },
							pathPattern: '.*',
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
			extends: [vitest.configs.recommended, ...baseConfig],
			files: ['**/*.test.{ts,tsx}'],
			name: '@3yourmind/eslint-config/tests',
			plugins: { vitest },
			rules: {
				'@typescript-eslint/ban-ts-comment': 'off',
				'@typescript-eslint/explicit-module-boundary-types': 'off',
				'@typescript-eslint/naming-convention': 'off',
				'@typescript-eslint/no-empty-function': 'off',
				'@typescript-eslint/no-empty-interface': 'off',
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-non-null-assertion': 'off',
				'@typescript-eslint/no-unnecessary-condition': 'off',
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-call': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',
				'@typescript-eslint/no-unsafe-return': 'off',
				'@typescript-eslint/no-unused-expressions': 'off',
				'@typescript-eslint/no-use-before-define': 'off',
				'@typescript-eslint/restrict-template-expressions': 'off',
				'no-console': 'off',
				'no-magic-numbers': 'off',
				'sonarjs/no-nested-functions': 'off',
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
		untyped: tseslint.config(
			{
				extends: [
					eslint.configs.recommended,
					...tseslint.configs.recommended,
					...baseConfig,
				],
				files: ['**/*.{cjs,js,mjs}'],
				name: '@3yourmind/eslint-config/untyped',
			},
			{
				files: ['**/*.cjs'],
				name: '@3yourmind/eslint-config/untyped-cjs',
				rules: {
					'@typescript-eslint/no-var-requires': 'off',
				},
			},
		),
		/**
		 * Should be used only on .vue files. Includes vue-specific rules. Works best on `<script lang="ts">`
		 */
		vue: tseslint.config({
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
			name: '@3yourmind/eslint-config/vue',
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
				'vue/no-deprecated-data-object-declaration': 'error',
				'vue/no-deprecated-destroyed-lifecycle': 'error',
				// 'vue/no-deprecated-dollar-scopedslots-api': 'error', -- FIXME: reactivate with Vue@3
				'vue/no-deprecated-events-api': 'error',
				'vue/no-deprecated-filter': 'error',
				'vue/no-deprecated-functional-template': 'error',
				'vue/no-deprecated-html-element-is': 'error',
				'vue/no-deprecated-inline-template': 'error',
				'vue/no-deprecated-props-default-this': 'error',
				'vue/no-deprecated-router-link-tag-prop': 'error',
				'vue/no-deprecated-scope-attribute': 'error',
				'vue/no-deprecated-slot-attribute': 'error',
				'vue/no-deprecated-slot-scope-attribute': 'error',
				'vue/no-deprecated-v-bind-sync': 'error',
				'vue/no-deprecated-v-is': 'error',
				'vue/no-deprecated-v-on-native-modifier': 'error',
				'vue/no-deprecated-v-on-number-modifiers': 'error',
				'vue/no-deprecated-vue-config-keycodes': 'error',
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
				'vue/require-explicit-emits': 'error',
			},
		}),
	},
	plugin,
}

export default kottiEslintConfig
