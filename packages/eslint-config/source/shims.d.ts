declare module 'eslint-plugin-vue/lib/utils/index.js'

declare module '@eslint-community/eslint-plugin-eslint-comments/configs'

declare module 'eslint-plugin-unicorn' {
	import type { TSESLint } from '@typescript-eslint/utils'

	const plugin: TSESLint.FlatConfig.Plugin
	export = plugin
}

declare module 'eslint-plugin-vue' {
	import type { TSESLint } from '@typescript-eslint/utils'
	const plugin: TSESLint.FlatConfig.Plugin & {
		configs: {
			'flat/recommended': TSESLint.FlatConfig.ConfigArray
		}
	}
	export = plugin
}
