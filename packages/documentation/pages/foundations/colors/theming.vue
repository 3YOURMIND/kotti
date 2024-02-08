<template lang="md">
# Theming

You can apply your own theme to the kotti design system.
Since we are defining the theme tokens with CSS custom properties, they can easily be overwriten.

However, if done on a dedicated stylesheet, it would have to be imported after importing Kotti

> priority by precedence of loading stylesheets

Example:

```css
.kt-navbar {
	--primary-70: red;
}
```

A simpler approach is to overwrite the root element style:

```css
:root {
	--primary-70: red;
}
```

## Demo

Overwrite the Primary Color:

> E.g. Used for buttons and Navbar background

<KtFieldSingleSelect isOptional label="Primary Brand Color" v-model="primaryColor" :options="colors" />
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from 'vue'

export default defineComponent({
	name: 'DocumenationPageFoundationsColorsTheming',
	setup() {
		const primaryColor = ref<string | null>(null)

		type ElementWithStyle = Element & {
			style: { setProperty: (key: string, value?: string) => void }
		}

		const rootElement = ref<ElementWithStyle | null>(null)
		onMounted(() => {
			rootElement.value = document.querySelector(':root')
		})

		watchEffect(
			() => {
				if (rootElement.value !== null) {
					rootElement.value.style.setProperty(
						'--primary-70',
						primaryColor.value ?? '#2659ab',
					)
				}
			},
			{ flush: 'post' },
		)

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
