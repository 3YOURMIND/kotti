/*eslint no-undef: "error"*/
/*eslint-env node*/

const routerBase =
	process.env.DEPLOY_ENV === 'GH_PAGES'
		? {
				router: {
					base: '/kotti/',
				},
		  }
		: {}

const outputDir = process.env.DEPLOY_ENV === 'GH_PAGES' ? 'gh-pages' : 'docs'

module.exports = {
	srcDir: './www/',
	...routerBase,
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Kotti Design System',
		meta: [
			{
				charset: 'utf-8',
			},
			{
				name: 'viewport',
				content: 'width=device-width, initial-scale=1',
			},
			{
				hid: 'description',
				name: 'description',
				content: `Kotti helps to unify our design language and provides the documentation for further product
design decisions. The Kotti design system has two main parts: foundation and components.`,
			},
		],
		link: [
			{
				rel: 'icon',
				type: 'image/x-icon',
				href: '/favicon.ico',
			},
		],
	},
	/*
	 ** Customize the progress bar color
	 */
	css: [
		'../packages/kotti-style/src/index.scss',
		'@/assets/css/main.scss',
		'@3yourmind/yoco',
	],
	modules: ['@nuxtjs/markdownit'],
	loading: {
		color: '#2C64CC',
	},
	plugins: ['~/plugins/vue-clipboard2'],
	/*
	 ** Build configuration
	 */
	generate: {
		dir: outputDir,
	},
	build: {
		extend(config, ctx) {
			if (ctx.isDev && ctx.isClient) {
				config.module.rules.push({
					enforce: 'pre',
					test: /\.(js|vue)$/,
					// loader: 'eslint-loader',
					exclude: /(node_modules)/,
				})
			}
		},
	},
}
