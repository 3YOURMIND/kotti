import vue from 'rollup-plugin-vue';

const inputPath = 'src/inlineEdit.vue';
const filePrefix = 'kotti-inline-edit';
const camelCasesPrefix = 'KottiInlineEdit';
const globals = {
	KtButton: '@3yourmind/kotti-button',
	KtButtonGroup: '@3yourmind/kotti-button-group',
};

export default {
	external: ['@3yourmind/kotti-button', '@3yourmind/kotti-button-group'],
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
