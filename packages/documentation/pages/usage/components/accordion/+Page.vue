<template>
	<ComponentInfo v-bind="{ component }" />

	<ComponentForm
		:component="component"
		:propFormatters="{}"
		:props="omit(componentProps, ['content'])"
		:hiddenProps="{
			'onUpdate:isClosed': (val: boolean) => (componentProps.isClosed = val),
		}"
		:slots="[{ content: componentProps.content, name: 'default' }]"
	>
		<template #component-form-settings>
			<div>
				<KtForm v-model:value="componentProps" size="small">
					<KtFieldText label="title" formKey="title" />
					<KtFieldText label="content" formKey="content" />
				</KtForm>
			</div>
		</template>
	</ComponentForm>

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
	</CodePreview>
</template>

<script lang="ts">
import { KtAccordion, KtButton, KtFieldText, KtForm } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from 'vue'
import omit from 'lodash/omit.js'

import ComponentForm from '~/components/component-form/ComponentForm.vue'
import CodePreview from '~/components/CodePreview.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAccordion',
	components: {
		CodePreview,
		ComponentForm,
		ComponentInfo,
		KtAccordion,
		KtButton,
		KtFieldText,
		KtForm,
	},
	setup() {
		return {
			component: KtAccordion,
			componentProps: ref({
				dataTest: null,
				icon: null,
				isClosed: false,
				content: 'Example Content',
				title: 'Example title',
			}),
			isClosed: ref(false),
			isFirstAccordionClosed: ref(false),
			isSecondAccordionClosed: ref(false),
			isThirdAccordionClosed: ref(false),
			omit,
		}
	},
})
</script>
