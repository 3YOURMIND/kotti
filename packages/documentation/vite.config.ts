import Shiki from '@shikijs/markdown-it'
import vue from '@vitejs/plugin-vue'
import md from 'unplugin-vue-markdown/vite'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'

import markdownInVue from './plugins/vite-markdown-plugin'

const shikiInstance = await Shiki({ theme: 'vitesse-light' })

export default defineConfig({
	css: {
		preprocessorOptions: {
			scss: {
				api: 'modern-compiler',
			},
		},
	},
	plugins: [
		vike({ prerender: true }),
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
