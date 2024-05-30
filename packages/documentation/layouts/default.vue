<template>
	<KtI18nContext locale="en-US">
		<LayoutContainer>
			<template #navbar>
				<NavBar />
			</template>
			<template #actionbar>
				<ActionBar />
			</template>
			<template #workspace>
				<nuxt class="content" />
			</template>
		</LayoutContainer>
	</KtI18nContext>
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
