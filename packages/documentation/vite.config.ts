import Shiki from '@shikijs/markdown-it'
import vue from '@vitejs/plugin-vue'
import md from 'unplugin-vue-markdown/vite'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

import markdownInVue from './plugins/vite-markdown-plugin'

const shikiInstance = await Shiki({
	themes: {
		dark: 'vitesse-dark',
		light: 'vitesse-light',
	},
})

export default defineConfig({
	base: '/kotti/',
	plugins: [
		vike(),
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		markdownInVue({
			markdownItSetup(md) {
				md.use(shikiInstance)
			},
		}),
		md({
			markdownItSetup(md) {
				md.use(shikiInstance)
			},
		}),
	],
	resolve: {
		alias: [
			{
				find: '~',
				replacement: import.meta.dirname,
			},
		],
	},
})
