<template>
	<div>
		<ComponentInfo v-bind="{ component }" />
		<nuxt-link to="/examples/layouts">
			<button class="primary">Show Layout Example</button>
		</nuxt-link>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtUserMenu } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageLayoutsUserMenu',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtUserMenu,
		}
	},
})
</script>
