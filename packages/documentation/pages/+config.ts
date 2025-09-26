import vikeVue from 'vike-vue/config'
import type { Config } from 'vike/types'

import Layout from '~/chrome/TheGlobalLayout.vue'

// Default config (can be overridden by pages)
// https://vike.dev/config

export default {
	// https://vike.dev/Layout
	Layout,

	// https://vike.dev/head-tags
	description: '3YOURMIND’s Vue UI Framework & Design System ',
	extends: [vikeVue],
	title: 'Kotti Design System',
} satisfies Config
