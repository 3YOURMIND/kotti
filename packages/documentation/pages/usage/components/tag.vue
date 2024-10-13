<template lang="md">
    <ComponentInfo v-bind="{ component }" />

    Tags should either visualize active user input or invite for a user action.

    ```html
    	<KtTag text="I display Information" isDisabled/>
    	<KtTag v-if="showTag" text="You can remove me if you want" @close="showTag = false" />
    ```
    <KtTag text="I display Information" isDisabled/>
    <KtTag v-if="showTag" text="You can remove me if you want" @close="showTag = false" />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { KtTag } from '@3yourmind/kotti-ui'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLine',
	components: {
		ComponentInfo,
	},
	setup() {
		return {
			component: KtTag,
			showTag: ref(true),
		}
	},
})
</script>

<style scoped>
.line-description {
	margin: 1.5rem 0 0.5rem;
}
</style>
