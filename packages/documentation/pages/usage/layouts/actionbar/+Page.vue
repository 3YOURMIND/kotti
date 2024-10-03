<template>
	<ComponentInfo v-bind="{ component }" />

	<a href="/examples/layouts">
		<button class="primary">Show Layout Example</button>
	</a>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`<KtActionbar
			slot="actionbar"
			headerTitle="KtContainer Example"
			:menuStyle="menuStyle"
			:menu="menu"
		/>`'
		language="vue-html"
	/>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
		menuStyle: {
			iconPosition: "left",
		},
		menu: [
			{
				label: "First Link",
				to: "/examples/layouts",
				icon: "user",
				active: false,
				disabled: false,
			},
			{
				label: "Second Link",
				to: "https://google.com",
				icon: "basket",
				active: true,
			},
			{
				label: "Third Link",
				to: "/",
				icon: "bell",
				disabled: true,
			},
		],`'
		language="js"
	/>
</template>

<script lang="ts">
import { KtActionbar } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageLayoutsActionbar',
	components: {
		CodePreview,
		ComponentInfo,
	},
	setup() {
		return {
			component: KtActionbar,
		}
	},
})
</script>
