<template>
	<KtI18nContext locale="en-US">
		<div class="d-flex responsive">
			<NavBar />
			<div class="workspace">
				<nuxt class="content" />
			</div>
			<MyToaster />
		</div>
	</KtI18nContext>
</template>

<script>
import { KtI18nContext } from '@3yourmind/kotti-ui'

import MyToaster from '~/components/MyToaster.vue'
import NavBar from '~/components/NavBar.vue'

/* eslint-disable perfectionist/sort-objects */
export default {
	name: 'FullPageLayout',
	components: {
		KtI18nContext,
		MyToaster,
		NavBar,
	},
}
/* eslint-enable perfectionist/sort-objects */
</script>

<style lang="scss" scoped>
.content {
	width: 100%;
	max-width: 40rem;
	padding: 2rem 0;
	margin: 0 auto;
}
</style>
