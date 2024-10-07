import md from 'unplugin-vue-markdown/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import vike from 'vike/plugin'
import Shiki from '@shikijs/markdown-it'

export default defineConfig({
	plugins: [
		vike({ prerender: true }),
		vue({
			include: [/\.vue$/, /\.md$/],
		}),
		md({
			markdownItSetup(md) {
				md.use(Shiki, {
					theme: 'nord',
				})
			},
		}),
	],
})
