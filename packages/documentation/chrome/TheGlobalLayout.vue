<template>
	<KtI18nContext locale="en-US" v-if="shouldRender">
		<div class="kt-container">
			<TheNavbar />
			<slot />
		</div>
	</KtI18nContext>
</template>

<script lang="ts">
import { KtI18nContext } from '@3yourmind/kotti-ui'
import { defineComponent, onMounted, ref } from 'vue'

import TheNavbar from '~/chrome/TheNavbar.vue'

export default defineComponent({
	name: 'TheGlobalLayout',
	components: {
		KtI18nContext,
		TheNavbar,
	},
	setup() {
		const shouldRender = ref(false)

		onMounted(async () => {
			await Promise.race([
				document.fonts.load('16px "Yoco"'),
				new Promise<void>((resolve) => {
					window.setTimeout(resolve, 1000)
				}),
			])

			// prevent FOUC
			shouldRender.value = true
		})
		return {
			shouldRender,
		}
	},
})
</script>

<style scoped>
/* Page Transition Animation */
/* TODO Decide if these transitions should be kept */
#page-content {
	opacity: 1;
	transition: opacity 0.3s ease-in-out;
}
body.page-is-transitioning #page-content {
	opacity: 0;
}
</style>
