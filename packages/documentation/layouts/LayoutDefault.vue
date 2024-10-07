<template>
	<KtI18nContext locale="en-US" v-if="shouldRender">
		<LayoutContainer>
			<template #navbar>
				<TheNavbar />
			</template>
			<template #actionbar>
				<TheActionbar />
			</template>
			<template #workspace>
				<div class="content">
					<TheContent> <slot /></TheContent>
				</div>
			</template>
		</LayoutContainer>
	</KtI18nContext>
</template>

<script lang="ts">
import { KtI18nContext } from '@3yourmind/kotti-ui'
import { defineComponent, onMounted, ref } from 'vue'

import LayoutContainer from '../chrome/LayoutContainer.vue'
import TheActionbar from '../chrome/TheActionbar.vue'
import TheContent from '../chrome/TheContent.vue'
import TheNavbar from '../chrome/TheNavbar.vue'

export default defineComponent({
	components: {
		KtI18nContext,
		LayoutContainer,
		TheActionbar,
		TheContent,
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
.layout {
	display: flex;
}
.content {
	padding: 20px;
	padding-bottom: 50px;
	min-height: 100vh;
	flex-grow: 1;
}
/* Page Transition Animation */
#page-content {
	opacity: 1;
	transition: opacity 0.3s ease-in-out;
}
body.page-is-transitioning #page-content {
	opacity: 0;
}
</style>
