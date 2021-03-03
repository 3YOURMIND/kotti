<template>
	<KtTranslationContext locale="en-US">
		<div class="d-flex responsive">
			<NavBar />
			<div class="workspace"><nuxt class="content" /></div>
		</div>
	</KtTranslationContext>
</template>

<script>
import NavBar from '../components/NavBar.vue'

export default {
	name: 'FullPageLayout',
	components: {
		NavBar,
	},
}
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	max-width: 40rem;
	padding: 2rem 0;
	margin: 0 auto;
}
</style>
