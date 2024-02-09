import { resolve } from 'path'

import commonjs from '@rollup/plugin-commonjs'
import vue from '@vitejs/plugin-vue2'
import PresetEnv from 'postcss-preset-env'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

import packageJSON from './package.json' assert { type: 'json' }

/**
 * @see {@link https://vitejs.dev/guide/env-and-mode.html#node-env-and-modes}
 */
enum Mode {
	DEVELOPMENT = 'development',
	PRODUCTION = 'production',
}

const getPlugins = ({
	enableVisualizer,
}: {
	enableVisualizer: boolean
	isProduction: boolean
}) => [
	commonjs({
		include: [/\/node_modules\//],
	}),
	viteStaticCopy({
		targets: [
			{
				src: 'source/kotti-style/_variables.scss',
				dest: '.',
				rename: 'variables.scss',
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
	const isProduction = mode === Mode.PRODUCTION

	const enableVisualizer = ['1', 'true', 'yes', 'y'].includes(
		process.env.ENABLE_VISUALIZER?.toLowerCase() ?? '',
	)

	// eslint-disable-next-line no-console
	if (enableVisualizer) console.info('enabling visualizer')

	const external = [
		...Object.keys(packageJSON.peerDependencies),
		...Object.keys(packageJSON.dependencies),
		/.*element-ui.*/,
		/.*tippy\.js.*/,
		/lodash\/.*/,
		/vue\/.*/,
	]

	return {
		build: {
			minify: isProduction ? 'esbuild' : false,
			emptyOutDir: false,
			lib: {
				entry: resolve(__dirname, 'source/index.ts'),
				formats: ['es', 'cjs'],
				name: 'KottiUI',
				fileName: 'kotti-ui',
			},
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
		plugins: getPlugins({ enableVisualizer, isProduction }),
		test: {
			environment: 'jsdom',
			globals: true,
			typecheck: {
				checker: 'vue-tsc',
			},
		},
	}
})
