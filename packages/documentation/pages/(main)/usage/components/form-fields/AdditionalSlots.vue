<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'

import { KtFieldText, KtFieldToggle } from '@3yourmind/kotti-ui'

import type { ComponentDefinition } from './data'

const SLOT_RELEVANT_PROPS = new Set([
	'defaultSlot',
	'showContentSlot',
	'showDropAreaExtraContentSlot',
	'showHeaderSideSlot',
	'showHeaderSlot',
	'showOptionSlot',
] as ComponentDefinition['additionalProps'])

export default defineComponent({
	name: 'FormFieldsAdditionalSlots',
	components: {
		KtFieldText,
		KtFieldToggle,
	},
	props: {
		componentDefinition: {
			required: true,
			type: Object as PropType<ComponentDefinition>,
		},
	},
	setup(props) {
		return {
			showAdditionalSlotsSection: computed(() =>
				props.componentDefinition.additionalProps.some((propName) =>
					SLOT_RELEVANT_PROPS.has(propName),
				),
			),
		}
	},
})
</script>

<template>
	<template v-if="showAdditionalSlotsSection">
		<h4>Additional Slots</h4>
		<KtFieldText
			v-if="componentDefinition.additionalProps.includes('defaultSlot')"
			formKey="defaultSlot"
			isOptional
			label="Slot for the label in a toggle"
		/>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('showHeaderSlot')"
			formKey="showHeaderSlot"
			isOptional
		>
			<template #default>
				Slot for the header of a radio/toggle group option
			</template>
			<template #helpText>
				The content in here will be put into the radio/toggle option's
				<code>label</code> block.
			</template>
		</KtFieldToggle>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('showHeaderSideSlot')"
			formKey="showHeaderSideSlot"
			isOptional
		>
			<template #default>
				Show header-side slot of a radio/toggle group option
			</template>
			<template #helpText>
				The content in here will be put outside the radio/toggle option's
				<code>label</code> block. and can therefore contain interactive elements
				like buttons or links
			</template>
		</KtFieldToggle>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('showContentSlot')"
			formKey="showContentSlot"
			isOptional
		>
			<template #default>
				Slot for the sub-text of a radio/toggle group option
			</template>
		</KtFieldToggle>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('showOptionSlot')"
			formKey="showOptionSlot"
			isOptional
		>
			<template #default> Slot for options in select fields </template>
		</KtFieldToggle>
		<KtFieldToggle
			v-if="
				componentDefinition.additionalProps.includes(
					'showDropAreaExtraContentSlot',
				)
			"
			formKey="showDropAreaExtraContentSlot"
			isOptional
		>
			<template #default>
				Shows Drop Area slot for additional content
			</template>
			<template #helpText>
				Allows to add custom content to the Drop Area
			</template>
		</KtFieldToggle>
	</template>
</template>
