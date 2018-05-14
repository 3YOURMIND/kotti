import vue from 'rollup-plugin-vue';

const inputPath = 'src/avatar-group.vue';
const filePrefix = 'kotti-avatar-group';
const camelCasesPrefix = 'KottiAvatarGroup';
const globals = {
	KtAvatar: '@3yourmind/kotti-avatar',
};

export default {
	external: ['@3yourmind/kotti-avatar'],
	input: 'src/avatar-group.vue',
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
