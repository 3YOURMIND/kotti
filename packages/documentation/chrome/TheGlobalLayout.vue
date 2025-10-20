<template>
	<KtToaster :toaster="toaster">
		<template #success>
			<KtToast style="background-color: var(--green-20)" />
		</template>
		<template #error>
			<KtToast style="background-color: var(--red-20)" />
		</template>
	</KtToaster>
	<KtI18nContext v-if="shouldRender" locale="en-US">
		<div class="kt-container">
			<TheNavbar />
			<slot />
		</div>
	</KtI18nContext>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from 'vue'

import { KtI18nContext, KtToast, KtToaster } from '@3yourmind/kotti-ui'

import TheNavbar from '~/chrome/TheNavbar.vue'
import { toaster } from '~/utilities/toaster'

export default defineComponent({
	name: 'TheGlobalLayout',
	components: {
		KtI18nContext,
		KtToast,
		KtToaster,
		TheNavbar,
	},
	setup() {
		const shouldRender = ref(false)

		onMounted(async () => {
			await Promise.race([
				document.fonts.load('16px "Yoco"'),
				new Promise<void>((resolve) => {
					// eslint-disable-next-line no-magic-numbers
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
