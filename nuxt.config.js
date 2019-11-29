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
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{
				href: 'https://fonts.googleapis.com/css?family=Roboto&display=swap',
				rel: 'stylesheet',
			},
		],
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
	loading: {
		color: '#2C64CC',
	},
	plugins: [
		'~/plugins/vue-clipboard2',
		'~/plugins/kotti-ui',
		'~/plugins/composition-api',
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
