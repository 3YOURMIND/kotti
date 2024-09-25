import md from 'unplugin-vue-markdown/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vike from 'vike/plugin'
import Shiki from '@shikijs/markdown-it'

import markdownInVue from './plugins/vite-markdown-plugin'

const shikiInstance = await Shiki({ theme: 'vitesse-light' })

export default defineConfig({
	plugins: [
		vike({ prerender: true }),
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		markdownInVue({
			async markdownItSetup(md) {
				md.use(shikiInstance)
			},
		}),
		md({
			async markdownItSetup(md) {
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
