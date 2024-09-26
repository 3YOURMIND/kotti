<template>
	<ComponentInfo v-bind="{ component }" />

	<h2>Basic Usage</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<KtAccordion
				v-model:isClosed="isClosed"
				title="Accordion"
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique
				purus vel felis posuere, quis posuere enim consequat. Cras vel metus non
				nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae
				leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at
				lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a
				dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur
				iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et
				nisl.
			</KtAccordion>
		`'
		language="vue-html"
	>
		<template #example>
			<KtAccordion
				v-model:isClosed="isFirstAccordionClosed"
				title="Accordion"
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique
				purus vel felis posuere, quis posuere enim consequat. Cras vel metus non
				nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae
				leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at
				lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a
				dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur
				iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et
				nisl.
			</KtAccordion>
		</template>
	</CodePreview>

	<h2>With Icon</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<KtAccordion
				v-model:isClosed="isClosed"
				icon="edit"
				title="Accordion with icon"
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique
				purus vel felis posuere, quis posuere enim consequat. Cras vel metus non
				nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae
				leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at
				lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a
				dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur
				iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et
				nisl.
			</KtAccordion>
		`'
		language="vue-html"
	>
		<template #example>
			<KtAccordion
				v-model:isClosed="isSecondAccordionClosed"
				icon="edit"
				title="Accordion with icon"
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique
				purus vel felis posuere, quis posuere enim consequat. Cras vel metus non
				nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae
				leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at
				lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a
				dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur
				iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et
				nisl.
			</KtAccordion>
		</template>
	</CodePreview>

	<h2>As Controlled Component</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<KtAccordion v-model:isClosed="isClosed" title="Openable block :)">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique
				purus vel felis posuere, quis posuere enim consequat. Cras vel metus non
				nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae
				leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at
				lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a
				dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur
				iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et
				nisl.
			</KtAccordion>
			<KtButton
				label="Toggle Accordion"
				@click="() => (isClosed = !isClosed)"
			/>
		`'
		language="vue-html"
	>
		<template #example>
			<KtAccordion
				v-model:isClosed="isThirdAccordionClosed"
				title="Openable block :)"
			>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique
				purus vel felis posuere, quis posuere enim consequat. Cras vel metus non
				nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae
				leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at
				lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a
				dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur
				iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et
				nisl.
			</KtAccordion>
			<KtButton
				label="Toggle Accordion"
				@click="() => (isThirdAccordionClosed = !isThirdAccordionClosed)"
			/>
		</template>
	</CodePreview>
</template>

<script lang="ts">
import { KtAccordion, KtButton } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'

import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAccordion',
	components: {
		CodePreview,
		ComponentInfo,
		KtAccordion,
		KtButton,
	},
	setup() {
		return {
			component: KtAccordion,
			isFirstAccordionClosed: ref(false),
			isSecondAccordionClosed: ref(false),
			isThirdAccordionClosed: ref(false),
		}
	},
})
</script>
