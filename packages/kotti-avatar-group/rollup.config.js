import vue from 'rollup-plugin-vue';

export default {
	external: ['@3yourmind/kotti-avatar'],
	input: 'src/avatar-group.vue',
	output: [
		{
			file: 'dist/kotti-avatar-group.cjs.js',
			format: 'cjs',
			globals: {
				KtAvatar: '@3yourmind/kotti-avatar',
			},
			sourcemap: true,
		},
		{
			file: 'dist/kotti-avatar-group.umd.js',
			format: 'umd',
			globals: {
				KtAvatar: '@3yourmind/kotti-avatar',
			},
			name: 'KottiAvatarGroup',
			sourcemap: true,
		},
		{
			file: 'dist/kotti-avatar-group.amd.js',
			format: 'amd',
			globals: {
				KtAvatar: '@3yourmind/kotti-avatar',
			},
			sourcemap: true,
		},
		{
			file: 'dist/kotti-avatar-group.esm.js',
			format: 'es',
			globals: {
				KtAvatar: '@3yourmind/kotti-avatar',
			},
			sourcemap: true,
		},
	],
	plugins: [
		vue({
			css: 'dist/kotti-avatar-group.css',
		}),
	],
};
