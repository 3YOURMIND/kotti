<template>
	<ComponentInfo v-bind="{ component }" />

	<h2>Basic Usage</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`<KtToaster :total="50" :pageSize="10" />`'
		language="vue-html"
	>
		<KtButton label="Success"/>
		<KtToaster :total="50" :pageSize="10" />
	</CodePreview>
</template>

<script lang="ts">
import { KtButton, KtToaster } from '@3yourmind/kotti-ui'
import { defineComponent } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsToaster',
	components: {
		CodePreview,
		ComponentInfo,
		KtButton,
		KtToaster,
	},
	setup() {
		return {
			component: KtToaster,
		}
	},
})
</script>
