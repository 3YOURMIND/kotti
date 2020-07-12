import path from 'path'

import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { nodeResolve } from '@rollup/plugin-node-resolve'
// import autoprefixer from 'autoprefixer'
// import postcss from 'postcss'
// import css from 'rollup-plugin-css-only'
import postcssPlugin from 'rollup-plugin-postcss'
// import typescript from '@rollup/plugin-typescript'
import scss from 'rollup-plugin-scss'
import typescript2 from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import sass from 'sass'

import packageJSON from './package.json'

const external = [...Object.keys(packageJSON.peerDependencies)]

const plugins = [
	commonjs({
		include: /node_modules/,
	}),
	getBabelOutputPlugin({
		presets: ['@babel/preset-env'],
	}),
	json(),
	nodeResolve({
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
	}),
	babel({
		babelHelpers: 'bundled',
	}),
	// typescript({
	// 	tsconfig: false,
	// 	experimentalDecorators: true,
	// 	module: 'es2015',
	// }),
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
		// processor: (css) =>
		// 	postcss([autoprefixer])
		// 		.process(css)
		// 		.then((result) => result.css),
	}),
	postcssPlugin({
		// modules: true,
		extract: path.resolve(packageJSON.style),
	}),
	// css({
	// 	output: packageJSON.style,
	// }),
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
