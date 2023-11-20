import path from 'path'

import sassNodeModulesImporter from '@3yourmind/sass-node-modules-importer'
import { DEFAULT_EXTENSIONS } from '@babel/core'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import postcssPluginAutoprefixer from 'autoprefixer'
import postcss from 'postcss'
import postcssPluginFlexbugs from 'postcss-flexbugs-fixes'
import postcssPluginPresetEnv from 'postcss-preset-env'
import scss from 'rollup-plugin-scss'
import { visualizer } from 'rollup-plugin-visualizer'
import vue from 'rollup-plugin-vue'
import sass from 'sass'

import packageJSON from './package.json'

const external = [
	...Object.keys(packageJSON.peerDependencies),
	...Object.keys(packageJSON.dependencies),
	/.*element-ui.*/,
	/.*tippy\.js.*/,
]

const plugins = ({ enableVisualizer, module }) => [
	...(enableVisualizer
		? [visualizer({ filename: `report.${module}.html` })]
		: []),
	nodeResolve(),
	vue({
		css: false,
		needMap: false,
	}),
	scss({
		importer: sassNodeModulesImporter.default(),
		output: packageJSON.style,
		processor: (css) =>
			postcss([
				postcssPluginAutoprefixer,
				postcssPluginFlexbugs,
				postcssPluginPresetEnv,
			])
				.process(css)
				.then((result) => result.css),
		sass,
	}),
	typescript({
		declarationDir: `dist/${module}`,
		outDir: `dist/${module}`,
		tsconfig: 'tsconfig.json',
	}),
	commonjs({
		include: [/\/node_modules\//],
	}),
	json(),
	babel({
		skipPreflightCheck: true,
		babelHelpers: 'runtime',
		exclude: ['node_modules/@babel/**', /\/core-js\//],
		sourceMap: true,
		extensions: [...DEFAULT_EXTENSIONS, '.ts', '.tsx', '.vue'],
		presets: [
			[
				'@babel/preset-env',
				{
					corejs: 3,
					useBuiltIns: 'usage',
					forceAllTransforms: true,
				},
			],
			[
				'@babel/preset-typescript',
				{
					allowNamespaces: true,
				},
			],
		],
		plugins: [
			'@babel/plugin-transform-runtime',
			'@babel/plugin-proposal-nullish-coalescing-operator',
			'@babel/plugin-proposal-optional-chaining',
			'@babel/plugin-syntax-dynamic-import',
			'transform-vue-jsx',
		],
	}),
]

const { ENABLE_VISUALIZER, MODULE } = process.env

if (!['cjs', 'esm'].includes(MODULE))
	throw new Error(
		'Expected --environment MODULE:cjs or --environment MODULE:esm',
	)

export default {
	input: 'source/index.ts',
	output: {
		dir: path.dirname(MODULE === 'esm' ? packageJSON.module : packageJSON.main),
		exports: 'named',
		format: MODULE,
		preserveModules: true,
		preserveModulesRoot: './source',
		sourcemap: true,
	},
	external,
	plugins: plugins({
		module: MODULE,
		enableVisualizer: Boolean(ENABLE_VISUALIZER),
	}),
}
