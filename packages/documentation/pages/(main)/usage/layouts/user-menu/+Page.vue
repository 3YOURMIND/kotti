<template>
	<div>
		<ComponentInfo v-bind="{ component }" />
		<a href="/examples/layouts">
			<button class="primary">Show Layout Example</button>
		</a>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { KtUserMenu } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

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
