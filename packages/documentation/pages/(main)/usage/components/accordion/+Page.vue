<template>
	<ComponentInfo v-bind="{ component }" />

	<p>
		The <code>KtAccordion</code> component allows you to create collapsible
		content panels. It is useful for organizing large amounts of information
		into manageable sections.
	</p>

	<KtForm v-model="localProps" size="small">
		<ComponentForm
			:component="component"
			:hiddenProps="{
				'onUpdate:isClosed': (val: boolean) => (localProps.isClosed = val),
			}"
			:props="localProps"
			:slots="slots"
		>
			<template #component-form-settings>
				<div>
					<KtFieldText formKey="title" isOptional label="title" />
					<KtFieldText formKey="dataTest" isOptional label="dataTest" />
					<FieldYocoIcon isOptional />
					<KtFieldToggle
						formKey="isClosed"
						isOptional
						label="isClosed"
						type="switch"
					/>
				</div>
				<div>
					<KtFieldToggle
						v-model="showTitleSlot"
						formKey="NONE"
						isOptional
						label="Use Title Slot"
						type="switch"
					/>
				</div>
			</template>
		</ComponentForm>
	</KtForm>

	<h2>As Controlled Component</h2>

	<CodePreview
		code='
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
		'
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
import { computed, defineComponent, ref } from 'vue'

import {
	KtAccordion,
	KtButton,
	KtFieldText,
	KtFieldToggle,
	KtForm,
} from '@3yourmind/kotti-ui'

import CodePreview from '~/components/CodePreview.vue'
import ComponentForm from '~/components/component-form/ComponentForm.vue'
import FieldYocoIcon from '~/components/component-form/FieldYocoIcon.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'

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
		KtFieldToggle,
		KtForm,
	},
	setup() {
		const showTitleSlot = ref(false)
		return {
			component: KtAccordion,
			isThirdAccordionClosed: ref(false),
			localProps: ref({
				dataTest: null,
				icon: null,
				isClosed: false,
				title: 'Example title',
			}),
			showTitleSlot,
			slots: computed(() => {
				const slots = [
					{
						content: ['This is the content of the accordion'],
						name: 'default',
					},
				]

				if (showTitleSlot.value) {
					slots.push({ content: ['Title From Slot'], name: 'title' })
				}

				return slots
			}),
		}
	},
})
</script>
