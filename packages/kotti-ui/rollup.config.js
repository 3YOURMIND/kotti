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
import vue from 'rollup-plugin-vue'
import sass from 'sass'

import packageJSON from './package.json'

const external = [
	/@babel\/runtime/,
	...Object.keys(packageJSON.peerDependencies),
	...Object.keys(packageJSON.dependencies),
]
const plugins = (module) => [
	nodeResolve(),
	vue({
		css: false,
		needMap: false,
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
			[
				'@babel/plugin-transform-runtime',
				{
					useESModules: true,
				},
			],
			'@babel/plugin-proposal-nullish-coalescing-operator',
			'@babel/plugin-proposal-optional-chaining',
			'@babel/plugin-syntax-dynamic-import',
			'transform-vue-jsx',
		],
	}),
	scss({
		sass,
		output: packageJSON.style,
		processor: (css) =>
			postcss([
				postcssPluginAutoprefixer,
				postcssPluginFlexbugs,
				postcssPluginPresetEnv,
			])
				.process(css)
				.then((result) => result.css),
	}),
]

export default [
	{
		input: 'source/index.ts',
		output: {
			dir: 'dist/esm',
			format: 'esm',
			// file: packageJSON.module,
			sourcemap: true,
		},
		external,
		plugins: plugins('esm'),
	},
	{
		input: 'source/index.ts',
		output: {
			dir: 'dist/cjs',
			format: 'cjs',
			// file: packageJSON.main,
			name: 'KottiUI',
			sourcemap: true,
		},
		external,
		plugins: plugins('cjs'),
	},
]
