// rollup.config.js
import vue from 'rollup-plugin-vue';

export default {
	input: 'src/avatar-group.vue',
	output: [
		{
			file: 'dist/kotti-avatar-group.cjs.js',
			format: 'cjs',
			sourcemap: true,
		},
		{
			name: 'KottiAvatarGroup',
			file: 'dist/kotti-avatar-group.umd.js',
			format: 'umd',
			sourcemap: true,
		},
		{
			file: 'dist/kotti-avatar-group.amd.js',
			format: 'amd',
			sourcemap: true,
		},
		{
			file: 'dist/kotti-avatar-group.esm.js',
			format: 'es',
			sourcemap: true,
		},
	],
	plugins: [
		vue({
			css: 'dist/kotti-avatar-group.css',
		}),
	],
};
