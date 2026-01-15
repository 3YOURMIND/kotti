<template>
	<ComponentInfo v-bind="{ component }" />

	Tags should either visualize active user input or invite for a user action.

	<CodePreview
		code='
			<KtTag text="I display Information" isDisabled />
			<KtTag
				v-if="showTag"
				text="You can remove me if you want"
				@close="showTag = false"
			/>
		'
		language="vue-html"
	>
		<KtTag isDisabled text="I display Information" />
		<KtTag
			v-if="showTag"
			text="You can remove me if you want"
			@close="showTag = false"
		/>
	</CodePreview>

	<h3>Color Styles</h3>

	<CodePreview language="vue-html">
		<div>
			<KtTag
				v-for="color in colors"
				:key="color"
				:colorStyle="color"
				hideActions
				:text="color"
			/>
		</div>
	</CodePreview>
	<TagForm />
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

import { Kotti, KtTag } from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsLine',
	components: {
		CodePreview,
		ComponentInfo,
		KtTag,
	},
	setup() {
		return {
			colors: Kotti.Tag.propsSchema.shape.colorStyle._def.innerType._def.values,
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
