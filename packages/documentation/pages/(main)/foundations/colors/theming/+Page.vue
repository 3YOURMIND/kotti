<template>
	<h1>Theming</h1>

	<p>
		You can apply your own theme to the kotti design system. Since we are
		defining the theme tokens with CSS custom properties, they can easily be
		overwriten.
	</p>

	<p>
		However, if done on a dedicated stylesheet, it would have to be imported
		after importing Kotti
	</p>

	<h3>Examples</h3>

	<p>Overwrite style in a single component</p>

	<CodePreview
		code="
		.kt-navbar {
			--primary-70: red;
		}"
		language="css"
	/>

	<p>A simpler approach is to overwrite the root element style.</p>

	<CodePreview
		code="
			:root {
				--primary-70: red;
			}
		"
		language="css"
	/>

	<h2>Demo</h2>

	<p>Overwrite the Primary Color.</p>

	<KtFieldSingleSelect
		v-model:value="primaryColor"
		isOptional
		label="Primary Brand Color"
		:options="colors"
	/>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

import { KtFieldSingleSelect } from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'

export default defineComponent({
	name: 'DocumentationPageFoundationsColorsTheming',
	components: {
		CodePreview,
		KtFieldSingleSelect,
	},
	setup() {
		const primaryColor = ref<string>('#2659ab')

		watchEffect(() => {
			const rootElement = document.querySelector(':root')

			rootElement.style.setProperty('--primary-70', primaryColor.value)
		})

		return {
			colors: [
				{ label: 'Default Blue', value: '#2659ab' },
				{ label: 'Navy', value: '#001f3f' },
				{ label: 'Red', value: '#FF4136' },
				{ label: 'Green', value: '#2ECC40' },
				{ label: 'Teal', value: '#39CCCC' },
				{ label: 'White', value: 'white' },
				{ label: 'Black', value: '#111111' },
			],
			primaryColor,
		}
	},
})
</script>
