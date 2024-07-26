<template>
	<ComponentInfo v-bind="{ component }" />

	<KtForm v-model:value="componentProps" size="small">
		<ComponentForm
			:component="component"
			:hiddenProps="{
				'onUpdate:isClosed': (val: boolean) => (componentProps.isClosed = val),
			}"
			:props="omit(componentProps, ['content'])"
			:slots="[{ content: ['Example Content'], name: 'default' }]"
		>
			<template #component-form-settings>
				<div>
					<KtFieldText label="title" formKey="title" />
				</div>
				<div>
					<FieldYocoIcon isOptional />
				</div>
			</template>
		</ComponentForm>
	</KtForm>

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
import FieldYocoIcon from '~/components/component-form/FieldYocoIcon.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsAccordion',
	components: {
		CodePreview,
		ComponentForm,
		ComponentInfo,
		FieldYocoIcon,
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
