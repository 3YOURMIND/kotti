import vue from 'rollup-plugin-vue';

export default {
	input: 'src/avatar.vue',
	output: [
		{
			file: 'dist/kotti-avatar.cjs.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			name: 'KottiAvatar',
			file: 'dist/kotti-avatar.umd.js',
			format: 'umd',
			sourcemap: true,
		},
		{
			file: 'dist/kotti-avatar.amd.js',
			format: 'amd',
			sourcemap: true,
		},
		{
			file: 'dist/kotti-avatar.esm.js',
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		vue({
			css: 'dist/kotti-avatar.css',
		}),
	],
};
