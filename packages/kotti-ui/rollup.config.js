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

const external = [
	/@babel\/runtime/,
	...Object.keys(packageJSON.peerDependencies),
]

const babelOptions = {
	presets: ['@babel/preset-env'],
	plugins: ['@babel/plugin-transform-runtime'],
}

const getPlugins = (includeDeclarations) => [
	nodeResolve({
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	}),
	commonjs({
		include: /\/node_modules\//,
	}),
	getBabelOutputPlugin({
		...babelOptions,
	}),
	json(),
	babel({
		...babelOptions,
		skipPreflightCheck: true,
		babelHelpers: 'runtime',
	}),
	typescript2({
		check: false,
		tsconfigOverride: { declaration: includeDeclarations },
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
	// {
	// 	input: 'source/index.ts',
	// 	output: {
	// 		format: 'esm',
	// 		file: packageJSON.module,
	// 		sourcemap: true,
	// 	},
	// 	external,
	// 	plugins: getPlugins(true),
	// },
	{
		input: 'source/index.ts',
		output: {
			format: 'cjs',
			file: packageJSON.main,
			sourcemap: false,
		},
		external,
		plugins: getPlugins(false),
	},
]
