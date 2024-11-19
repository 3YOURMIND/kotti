// @ts-check

import path from 'node:path'
import { fileURLToPath } from 'url'

import tseslint from 'typescript-eslint'

import eslintConfig3YD from '@3yourmind/eslint-config'

import kottiUIPackageJSON from './packages/kotti-ui/package.json' assert { type: 'json' }
import vueUseTippyPackageJSON from './packages/vue-use-tippy/package.json' assert { type: 'json' }
import yocoPackageJSON from './packages/yoco/package.json' assert { type: 'json' }

const trustedDependencies = new Set([
	'@metatypes/typography',
	'@metatypes/units',
	'filesize',
	'nanoid',
	'zod',
])

const notYetESMCompatible = Object.keys({
	...kottiUIPackageJSON.dependencies,
	...vueUseTippyPackageJSON.dependencies,
	...yocoPackageJSON.dependencies,
})
	.filter((dep) => !dep.startsWith('@3yourmind'))
	.filter((dep) => !trustedDependencies.has(dep))

/**
 * Find the project root in a way that is compatible with most javascript engines (e.g. node, vscode's node, bun)
 */
const root = (() => {
	const cause = []

	try {
		const result = __dirname
		if (result) return result
	} catch (error) {
		cause.push(error)
	}

	try {
		const result = import.meta.dirname
		if (result) return result
	} catch (error) {
		cause.push(error)
	}

	try {
		const result = path.dirname(fileURLToPath(import.meta.url))
		if (result) return result
	} catch (error) {
		cause.push(error)
	}

	throw new Error('could not determine project root', { cause })
})()

const config = tseslint.config(
	/**
	 * DO NOT ADD ANY OTHER KEYS TO THIS FIRST OBJECT
	 *
	 * @see {@link https://eslint.org/docs/latest/use/configure/ignore#ignoring-files}
	 */
	{
		ignores: [
			'**/dist/**',
			'**/.nuxt/**',
			'**/.turbo/**',
			'**/*.js',
			'**/vite.config.ts.timestamp-*', // used by vite to interpret vite.config.ts
		],
	},
	...eslintConfig3YD.configs.global,
	{
		languageOptions: {
			ecmaVersion: 2022,
			parserOptions: {
				project: [
					'./tsconfig.json',
					'./internals/*/tsconfig.json',
					'./packages/*/tsconfig.json',
					'./packages/kotti-ui/tsconfig.node.json',
				],
				tsconfigRootDir: root,
			},
			sourceType: 'module',
		},
	},
	...eslintConfig3YD.configs.default.map((config) => ({
		...config,
		files: ['packages/**/*.ts', 'packages/**/*.tsx'],
	})),
	...eslintConfig3YD.configs.untyped,
	...eslintConfig3YD.configs.json,
	...eslintConfig3YD.configs.tests.map((config) => ({
		...config,
		files: [...config.files, 'packages/kotti-ui/source/test-utils/**/*.ts'],
	})),
	{
		extends: eslintConfig3YD.configs.vue,
		rules: {
			'vue/no-deprecated-dollar-listeners-api': 'error',
		},
	},
	{
		rules: {
			'@typescript-eslint/no-restricted-imports': [
				'error',
				{
					paths: [
						{
							message:
								"Avoid direct imports from lodash; e.g. import foo from 'lodash/foo.js' instead of import { foo } from 'lodash'",
							name: 'lodash',
						},
						...notYetESMCompatible.map((name) => ({
							allowImportNames: ['default'],
							allowTypeImports: true,
							message:
								'The default import is the only export guaranteed to resolve in packages without explicit cjs/esm import declarations. Named imports, inferred through heuristics, may fail in various environments. Therefore, it is advisable to always use the default import.',
							name,
						})),
					],
				},
			],
		},
	},
	{
		files: ['packages/kotti-ui/source/*/index.ts'],
		rules: {
			'@typescript-eslint/naming-convention': 'off',
		},
	},
)

export default config
