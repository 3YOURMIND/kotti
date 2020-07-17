import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import postcssPluginAutoprefixer from 'autoprefixer'
import postcss from 'postcss'
import postcssPluginFlexbugs from 'postcss-flexbugs-fixes'
import postcssPluginPresetEnv from 'postcss-preset-env'
import scss from 'rollup-plugin-scss'
import typescript2 from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import sass from 'sass'

import packageJSON from './package.json'

const external = [...Object.keys(packageJSON.peerDependencies)]

const plugins = [
	nodeResolve({
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	}),
	commonjs({
		include: /\/node_modules\//,
	}),
	getBabelOutputPlugin({
		presets: ['@babel/preset-env'],
	}),
	json(),
	babel({
		babelHelpers: 'bundled',
	}),
	typescript2({
		check: false,
		tsconfig: 'tsconfig.json',
		useTsconfigDeclarationDir: true,
		experimentalDecorators: true,
		module: 'esnext',
	}),
	vue({
		css: false,
		needMap: false,
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
			format: 'esm',
			file: packageJSON.module,
			sourcemap: true,
		},
		external,
		plugins,
	},
	{
		input: 'source/index.ts',
		output: {
			format: 'cjs',
			file: packageJSON.main,
			sourcemap: false,
		},
		external,
		plugins,
	},
]
