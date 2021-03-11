<template lang="md">
	<ComponentInfo v-bind="{ component }" />

	You can use horizontal row to separte similar elements to create a better information structure.

	You can add `text` to `KtLine` to display the text in the middle.

	<div class="element-example white">
		<h4>Login Options</h4>
		<p>Login with you account</p>
		<KtButton type="primary">Login</KtButton>
		<KtLine text="Or Login with Google"/>
		<KtButton type="secondary">Connect Google</KtButton>
		<KtLine text="Or"/>
		<p>Register a new account</p>
		<KtLine/>
		<p>Text below</p>
	</div>

	```html
	<KtLine text="Or Login with Google"/>
	```
</template>

<script lang="ts">
import { KtLine } from '@3yourmind/kotti-ui'
import { defineComponent } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLine',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtLine,
		}
	},
})
</script>
