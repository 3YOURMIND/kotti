<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<p>
			Tags should either visualize active user input or invite for a user
			action.
		</p>

		<CodePreviewNew
			code='
				<KtTag text="I display Information" isDisabled />
				<KtTag label="Label:" text="I have a label" hideActions />
				<KtTag v-if="showTag" text="You can remove me if you want" @close="showTag = false" />
			'
			language="vue-html"
		>
			<KtTag isDisabled text="I display Information" />
			<KtTag hideActions label="Label" text="I have a label" />
			<KtTag
				v-if="showTag"
				text="You can remove me if you want"
				@close="showTag = false"
			/>
		</CodePreviewNew>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { KtTag } from '@3yourmind/kotti-ui'

import CodePreviewNew from '~/components/CodePreviewNew.vue'
import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLine',
	components: {
		CodePreviewNew,
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
