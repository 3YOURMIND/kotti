import type { NuxtConfig } from '@nuxt/types'
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'

const config: NuxtConfig = {
	srcDir: './',
	/*
	 ** Headers of the page
	 */
	css: ['./styles/main.scss'],
	head: {
		link: [{ href: '/favicon.ico', rel: 'icon', type: 'image/x-icon' }],
		meta: [
			{ charset: 'utf-8' },
			{ content: 'width=device-width, initial-scale=1', name: 'viewport' },
			{
				content: `Kotti helps to unify our design language and provides the documentation for further product design decisions. The Kotti design system has two main parts: foundation and components.`,
				hid: 'description',
				name: 'description',
			},
		],
		title: 'Kotti Design System',
	},
	loading: {
		color: '#2C64CC',
	},
	modules: ['@nuxtjs/markdownit', '@nuxtjs/style-resources'],
	plugins: ['~/plugins/yoco', { src: '~/plugins/kotti-ui', ssr: false }],
	/*
	 ** Build configuration
	 */
	build: {
		extend(config) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
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
