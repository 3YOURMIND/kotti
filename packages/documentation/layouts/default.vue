<template>
	<KtTranslationContext locale="en-US">
		<LayoutContainer>
			<NavBar slot="navbar" />
			<ActionBar slot="actionbar" />
			<div slot="workspace">
				<nuxt class="content" />
			</div>
		</LayoutContainer>
	</KtTranslationContext>
</template>

<script>
import ActionBar from '~/components/ActionBar.vue'
import LayoutContainer from '~/components/LayoutContainer.vue'
import NavBar from '~/components/NavBar.vue'

export default {
	name: 'DefaultLayout',
	components: {
		ActionBar,
		NavBar,
		LayoutContainer,
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
