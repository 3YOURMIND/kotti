// eslint-disable-next-line @typescript-eslint/no-var-requires
import { NuxtConfig } from '@nuxt/types'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

const config: NuxtConfig = {
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
	css: ['./styles/main.scss'],
	modules: ['@nuxtjs/markdownit', '@nuxtjs/style-resources'],
	loading: {
		color: '#2C64CC',
	},
	plugins: [
		'~/plugins/vue-clipboard2',
		'~/plugins/yoco',
		{ src: '~/plugins/kotti-ui', ssr: false },
	],
	/*
	 ** Build configuration
	 */
	build: {
		extend(config) {
			config.plugins!.push(new CaseSensitivePathsPlugin())
		},
		transpile: [
			'@octokit/core',
			'@octokit/request',
			'@octokit/endpoint',
			'marked',
		],
	},
	buildModules: ['@nuxt/typescript-build'],
	generate: {
		dir: 'dist',
	},
	router: {
		base: '/kotti/',
	},
}

module.exports = config
