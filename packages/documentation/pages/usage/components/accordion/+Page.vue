<template>
	<ComponentInfo v-bind="{ component }" />

	<h2>Basic Usage</h2>

	<i>
		An animated accordion for hiding content on click. The accordion is fully
		controlled.
	</i>
	<br />
	<br />
	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<KtAccordion
				:isClosed="isFirstAccordionClosed"
				@update:isClosed="(newVal) => (isFirstAccordionClosed = newVal)"
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
		language="vue"
	>
		<template #example>
			<KtAccordion
				:isClosed="isFirstAccordionClosed"
				@update:isClosed="(newVal) => (isFirstAccordionClosed = newVal)"
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

	<h2>Using icons We can use `yoco` icons as well:</h2>

	<!-- prettier-ignore -->
	<CodePreview
		:code='`
			<KtAccordion
				icon="edit"
				:isClosed="isSecondAccordionClosed"
				@update:isClosed="(newVal) => (isSecondAccordionClosed = newVal)"
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
		language="vue"
	>
		<template #example>
			<KtAccordion
				icon="edit"
				:isClosed="isSecondAccordionClosed"
				@update:isClosed="(newVal) => (isSecondAccordionClosed = newVal)"
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

	<!-- prettier-ignore -->
	<MarkdownBlock>
		## Since the component is fully controlled, custom open/close logic can be
		easily set up.

		```vue
		<KtButton
			label="Toggle Accordion"
			@click="() => (isThirdAccordionClosed = !isThirdAccordionClosed)"
		/>
		<KtAccordion :isClosed="isThirdAccordionClosed" title="Openable block :)">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc tristique
			purus vel felis posuere, quis posuere enim consequat. Cras vel metus non
			nibh vestibulum cursus. Maecenas nec nulla nec mi sodales dapibus id vitae
			leo. Aenean sodales placerat sodales. Pellentesque imperdiet ipsum at
			lacus tincidunt, eu mattis nisl convallis. Aliquam dolor massa, volutpat a
			dui ultricies, ornare feugiat nisl. Vivamus ut arcu non justo efficitur
			iaculis eget id dolor. Nulla eget tortor dictum nunc suscipit ornare at et
			nisl.
		</KtAccordion>
		```
	</MarkdownBlock>

	<div class="element-example">
		<KtButton
			label="Toggle Accordion"
			@click="() => (isThirdAccordionClosed = !isThirdAccordionClosed)"
		/>
		<KtAccordion
			dataTest="documentation-accordion-remote"
			:isClosed="isThirdAccordionClosed"
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
	</div>
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
