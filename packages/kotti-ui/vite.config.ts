import path from 'node:path'

import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue2'
import PresetEnv from 'postcss-preset-env'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import packageJSON from './package.json' assert { type: 'json' }

const getPlugins = ({ enableVisualizer }: { enableVisualizer: boolean }) => [
	commonjs({
		include: [/\/node_modules\//],
	}),
	viteStaticCopy({
		targets: [
			{
				dest: '.',
				rename: 'variables.scss',
				src: 'source/kotti-style/_variables.scss',
			},
		],
	}),
	vue(),
	...(enableVisualizer
		? [
				visualizer({
					filename: 'report.sunburst.html',
					template: 'sunburst',
				}),
				visualizer({
					filename: 'report.treemap.html',
					template: 'treemap',
				}),
			]
		: []),
]

/**
 * @see {@link https://vitejs.dev/config/}
 */
export default defineConfig(({ mode }) => {
	/**
	 * @see {@link https://vitejs.dev/guide/env-and-mode.html#node-env-and-modes}
	 */
	const isProduction = mode === 'production'

	const enableVisualizer = ['1', 'true', 'y', 'yes'].includes(
		process.env.ENABLE_VISUALIZER?.toLowerCase() ?? '',
	)

	// eslint-disable-next-line no-console
	if (enableVisualizer) console.info('enabling visualizer')

	const external = [
		...Object.keys(packageJSON.peerDependencies),
		...Object.keys(packageJSON.dependencies),
		/element-ui/,
		/tippy\.js/,
		/lodash\/.*/,
		/vue\/.*/,
	]

	return {
		build: {
			emptyOutDir: false,
			lib: {
				entry: path.resolve(__dirname, 'source/index.ts'),
				fileName: 'kotti-ui',
				formats: ['es', 'cjs'],
				name: 'KottiUI',
			},
			minify: isProduction ? 'esbuild' : false,
			rollupOptions: {
				external,
				output: {
					exports: 'named',
				},
				strictDeprecations: true,
			},
			sourcemap: isProduction ? true : 'inline',
			target: ['es2022', 'chrome109', 'firefox109', 'safari15', 'edge109'],
		},
		css: {
			postcss: {
				plugins: [PresetEnv()],
			},
		},
		plugins: getPlugins({ enableVisualizer }),
		test: {
			environment: 'jsdom',
			globals: true,
			typecheck: {
				checker: 'vue-tsc',
			},
		},
	}
})
