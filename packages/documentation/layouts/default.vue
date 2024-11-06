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
				<div>
					<nuxt class="content" />
				</div>
			</template>
		</LayoutContainer>
		<MyToaster />
	</KtI18nContext>
</template>

<script>
import { KtI18nContext } from '@3yourmind/kotti-ui'

import ActionBar from '~/components/ActionBar.vue'
import LayoutContainer from '~/components/LayoutContainer.vue'
import MyToaster from '~/components/MyToaster.vue'
import NavBar from '~/components/NavBar.vue'

/* eslint-disable perfectionist/sort-objects */
export default {
	name: 'DefaultLayout',
	components: {
		ActionBar,
		KtI18nContext,
		MyToaster,
		NavBar,
		LayoutContainer,
	},
}
/* eslint-enable perfectionist/sort-objects */
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
