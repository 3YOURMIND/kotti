<template>
	<KtI18nContext locale="en-US">
		<div class="d-flex responsive">
			<NavBar />
			<div class="workspace">
				<nuxt class="content" />
			</div>
		</div>
	</KtI18nContext>
</template>

<script>
import { KtI18nContext } from '@3yourmind/kotti-ui'
import NavBar from '~/components/NavBar.vue'

export default {
	name: 'FullPageLayout',
	components: {
		KtI18nContext,
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
