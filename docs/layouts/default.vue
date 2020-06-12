<template>
	<KtContainer :hasActionBar="showActionbar">
		<Navbar slot="navbar" />
		<Actionbar slot="actionbar" />
		<div slot="workspace">
			<nuxt class="content" />
		</div>
	</KtContainer>
</template>

<script>
import cssVars from 'css-vars-ponyfill'

import KtContainer from '../../packages/kotti-container'

import Actionbar from '~/components/Actionbar.vue'
import Navbar from '~/components/Navbar.vue'

export default {
	name: 'DefaultLayout',
	components: {
		Actionbar,
		Navbar,
		KtContainer,
	},
	computed: {
		showActionbar() {
			const exclusivePage = ['index', 'changelog', 'designkit']
			return !exclusivePage.includes(this.$route.name)
		},
	},
	mounted() {
		// loading IE11 polyfill
		const isIE = !!window.MSInputMethodContext && !!document.documentMode
		if (isIE) {
			cssVars({ watch: true, shadowDOM: true, onlyLegacy: true })
		}
	},
}
</script>

<style>
.content {
	width: 100%;
	max-width: 40rem;
	margin: 0 auto;
}
.content img {
	max-width: 100%;
}
</style>
