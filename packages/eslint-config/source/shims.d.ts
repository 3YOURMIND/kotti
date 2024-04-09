declare module 'eslint-plugin-vue/lib/utils/index.js'

declare module 'eslint-plugin-unicorn' {
	import type { TSESLint } from '@typescript-eslint/utils'

	const plugin: TSESLint.FlatConfig.Plugin
	export = plugin
}

declare module 'eslint-plugin-vue' {
	import type { TSESLint } from '@typescript-eslint/utils'
	const plugin: TSESLint.FlatConfig.Plugin & {
		configs: {
			'flat/vue2-recommended': TSESLint.FlatConfig.ConfigArray
		}
	}
	export = plugin
}
