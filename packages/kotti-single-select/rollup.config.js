import vue from 'rollup-plugin-vue';

const inputPath = 'src/SingleSelect.vue';
const filePrefix = 'kotti-single-select';
const camelCasesPrefix = 'KottiSingleSelect';
const globals = {
	KtInput: '@3yourmind/kotti-input',
};

export default {
	external: ['@3yourmind/kotti-input'],
	input: inputPath,
	output: [
		{
			file: `dist/${filePrefix}.cjs.js`,
			format: 'cjs',
			globals,
			sourcemap: true,
		},
		{
			file: `dist/${filePrefix}.umd.js`,
			format: 'umd',
			globals,
			name: camelCasesPrefix,
			sourcemap: true,
		},
		{
			file: `dist/${filePrefix}.amd.js`,
			format: 'amd',
			globals,
			sourcemap: true,
		},
		{
			file: `dist/${filePrefix}.esm.js`,
			format: 'es',
			globals,
			sourcemap: true,
		},
	],
	plugins: [
		vue({
			css: `dist/${filePrefix}.css`,
		}),
	],
};
