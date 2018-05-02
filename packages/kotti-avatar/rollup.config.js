// rollup.config.js
import vue from 'rollup-plugin-vue';

export default {
  input: 'src/avatar.vue',
  output: {
    file: 'dist/kotti-avatar.cjs.js',
    format: 'cjs',
    sourcemap: true,
  },
  plugins: [
    vue({
      css: 'dist/kotti-avatar.css',
    }),
  ],
};
