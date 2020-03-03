const { resolve } = require('path')

module.exports = {
	productionSourceMap: false,
	pluginOptions: {
		'style-resources-loader': {
			preProcessor: 'scss',
			patterns: [
				resolve(__dirname, './packages/kotti-style/_variables.scss'),
				resolve(__dirname, './packages/kotti-style/mixins/index.scss'),
			],
		},
	},
	configureWebpack: {
		resolve: {
			alias: {
				'::p': resolve(__dirname, './packages/'),
				vue$: 'vue/dist/vue.esm.js',
			},
		},
	},
}
