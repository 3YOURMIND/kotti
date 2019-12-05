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
import KtContainer from '../../packages/kotti-container'
import Actionbar from '~/components/Actionbar.vue'
import Navbar from '~/components/Navbar.vue'
import cssVars from 'css-vars-ponyfill'

export default {
	name: 'DefaultLayout',
	components: {
		Actionbar,
		Navbar,
		KtContainer,
	},
	mounted() {
		// loading IE11 polyfill
		console.log('lol')
		const isIE =
			(!!window.MSInputMethodContext && !!document.documentMode) || true
		console.log(isIE)
		if (isIE) {
			let oo = cssVars({ watch: true, shadowDOM: true, onlyLegacy: true })
			console.log('IE 11')
			console.log(oo)
		}
	},
	computed: {
		showActionbar() {
			const exclusivePage = ['index', 'changelog', 'designkit']
			return !exclusivePage.includes(this.$route.name)
		},
	},
}
</script>

<style>
.content {
	margin: 0 auto;
	width: 100%;
	max-width: 40rem;
}
.content img {
	max-width: 100%;
}
</style>
