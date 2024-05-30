// @ts-check

import tseslint from 'typescript-eslint'
import eslintConfig3YD from '@3yourmind/eslint-config'
import { fileURLToPath } from 'url'
import path from 'node:path'

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
	...eslintConfig3YD.configs.vue,
	{
		rules: {
			'@typescript-eslint/no-restricted-imports': [
				'error',
				{
					message:
						"Avoid direct imports from lodash; e.g. import foo from 'lodash/foo' instead of import { foo } from 'lodash'",
					name: 'lodash',
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
