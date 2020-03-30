const config = {
	srcDir: './docs/',
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
	/*
	 ** Customize the progress bar color
	 */
	css: [
		'../packages/kotti-style/index.scss',
		'@/assets/css/main.scss',
		'@3yourmind/yoco',
	],
	modules: ['@nuxtjs/markdownit', '@nuxtjs/axios', '@nuxtjs/style-resources'],
	styleResources: {
		scss: ['./packages/kotti-style/_variables.scss'],
	},
	loading: {
		color: '#2C64CC',
	},
	plugins: ['~/plugins/vue-clipboard2', '~/plugins/kotti-ui'],
	/*
	 ** Build configuration
	 */
	build: {
		extractCSS: {
			allChunks: true,
		},
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
	},
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
