// eslint-disable-next-line @typescript-eslint/no-var-requires
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

const config = {
	srcDir: './',
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Kotti Design System',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				hid: 'description',
				name: 'description',
				content: `Kotti helps to unify our design language and provides the documentation for further product design decisions. The Kotti design system has two main parts: foundation and components.`,
			},
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	css: ['@3yourmind/yoco', './assets/css/main.scss'],
	modules: ['@nuxtjs/markdownit', '@nuxtjs/axios', '@nuxtjs/style-resources'],
	loading: {
		color: '#2C64CC',
	},
	plugins: [
		'~/plugins/composition-api',
		'~/plugins/vue-clipboard2',
		{ src: '~/plugins/kotti-ui', ssr: false },
	],
	/*
	 ** Build configuration
	 */
	build: {
		babel: {
			presets({ isServer }) {
				return [
					[
						require.resolve('@nuxt/babel-preset-app'),
						{
							buildTarget: isServer ? 'server' : 'client',
							corejs: { version: 3 },
						},
					],
				]
			},
		},
		extend(config) {
			config.plugins.push(new CaseSensitivePathsPlugin())
		},
	},
	buildModules: ['@nuxt/typescript-build'],
}

if (process.env.DEPLOY_ENV === 'GH_PAGES') {
	config.generate = {
		dir: 'gh-pages',
	}
	config.router = {
		base: '/kotti/',
	}
}

module.exports = config
