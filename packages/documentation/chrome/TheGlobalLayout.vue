<template>
	<KtToaster :toaster="toaster">
		<template #success>
			<KtToast style="background-color: var(--green-20)" />
		</template>
		<template #error>
			<KtToast style="background-color: var(--red-20)" />
		</template>
	</KtToaster>
	<KtI18nContext locale="en-US" v-if="shouldRender">
		<div class="kt-container">
			<TheNavbar />
			<slot />
		</div>
	</KtI18nContext>
</template>

<script lang="ts">
import { KtI18nContext, KtToast, KtToaster } from '@3yourmind/kotti-ui'
import { defineComponent, onMounted, ref } from 'vue'

import TheNavbar from '~/chrome/TheNavbar.vue'
import { toaster } from '~/utilities/toaster'

export default defineComponent({
	name: 'TheGlobalLayout',
	components: {
		KtI18nContext,
		KtToaster,
		KtToast,
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
			toaster,
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
