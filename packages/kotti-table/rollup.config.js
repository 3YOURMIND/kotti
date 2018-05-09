import vue from 'rollup-plugin-vue';

export default {
	input: 'src/Table.vue',
	output: [
		{
			file: 'dist/kotti-table.cjs.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			name: 'KottiTable',
			file: 'dist/kotti-table.umd.js',
			format: 'umd',
			sourcemap: true,
		},
		{
			file: 'dist/kotti-table.amd.js',
			format: 'amd',
			sourcemap: true,
		},
		{
			file: 'dist/kotti-table.esm.js',
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		vue({
			css: 'dist/kotti-table.css',
		}),
	],
};
