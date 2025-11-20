<script lang="tsx">
import { computed, defineComponent, type PropType } from 'vue'

import {
	KtFieldDate,
	KtFieldMultiSelect,
	KtFieldNumber,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggle,
	KtFieldToggleGroup,
} from '@3yourmind/kotti-ui'

import { yocoIconOptions } from './data'
import type { ComponentDefinition } from './data'

const INVALID_ADDITIONAL_PROPS = new Set([
	'emitEvents',
] as ComponentDefinition['additionalProps'])

export default defineComponent({
	name: 'FormFieldsAdditionalProps',
	components: {
		KtFieldDate,
		KtFieldMultiSelect,
		KtFieldNumber,
		KtFieldSingleSelect,
		KtFieldText,
		KtFieldToggle,
		KtFieldToggleGroup,
	},
	props: {
		componentDefinition: {
			required: true,
			type: Object as PropType<ComponentDefinition>,
		},
	},
	setup(props) {
		return {
			showAdditionalPropsSection: computed(() =>
				props.componentDefinition.additionalProps.some(
					(propName) => !INVALID_ADDITIONAL_PROPS.has(propName),
				),
			),
			yocoIconOptions,
		}
	},
})
</script>

<template>
	<template v-if="showAdditionalPropsSection">
		<h4>Additional Props</h4>
		<KtFieldToggle
			v-show="componentDefinition.additionalProps.includes('actions')"
			formKey="hasActions"
			helpText="List of actions that can be triggered from the end of the dropdown"
			isOptional
			label="actions"
			type="switch"
		/>
		<KtFieldNumber
			v-if="componentDefinition.additionalProps.includes('collapseTagsAfter')"
			formKey="collapseTagsAfter"
			isOptional
			label="collapseTagsAfter"
			:minimum="0"
		/>
		<KtFieldNumber
			v-if="componentDefinition.additionalProps.includes('rows')"
			formKey="rows"
			isOptional
			label="rows"
		/>
		<div
			v-if="
				componentDefinition.additionalProps.includes('autoSize') ||
				componentDefinition.additionalProps.includes('maxHeight')
			"
			class="field-row"
		>
			<KtFieldToggle
				formKey="autoSize"
				isOptional
				label="autoSize"
				type="switch"
			/>
			<KtFieldNumber
				formKey="maxHeight"
				helpText="Maximum height in pixels when autoSize is enabled. It has no effect if autoSize is disabled."
				:isDisabled="!componentDefinition.additionalProps.includes('maxHeight')"
				isOptional
				label="maxHeight"
			/>
		</div>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('hideDropArea')"
			formKey="hideDropArea"
			isOptional
			label="hideDropArea"
			type="switch"
		/>
		<KtFieldSingleSelect
			v-if="componentDefinition.additionalProps.includes('toggleType')"
			formKey="toggleType"
			isOptional
			label="type"
			:options="[
				{ label: 'checkbox (Default)', value: 'checkbox' },
				{ label: 'switch', value: 'switch' },
			]"
		/>
		<KtFieldSingleSelect
			v-if="componentDefinition.additionalProps.includes('numberAlign')"
			formKey="numberAlign"
			helpText="Support varies"
			isOptional
			label="align"
			:options="[
				{ label: 'left (Default)', value: 'left' },
				{ label: 'right', value: 'right' },
			]"
		/>
		<div
			v-if="
				componentDefinition.additionalProps.includes('numberDecimalPlaces') ||
				componentDefinition.additionalProps.includes('numberStep')
			"
			class="field-row"
		>
			<KtFieldNumber
				v-if="
					componentDefinition.additionalProps.includes('numberDecimalPlaces')
				"
				formKey="numberDecimalPlaces"
				isOptional
				label="decimalPlaces"
				:minimum="0"
			/>
			<KtFieldNumber
				v-if="componentDefinition.additionalProps.includes('numberStep')"
				formKey="numberStep"
				isOptional
				label="step"
			/>
		</div>
		<div
			v-if="
				componentDefinition.additionalProps.includes('numberMaximum') ||
				componentDefinition.additionalProps.includes('numberMinimum')
			"
			class="field-row"
		>
			<KtFieldNumber
				v-if="componentDefinition.additionalProps.includes('numberMaximum')"
				formKey="numberMaximum"
				isOptional
				label="maximum"
			/>
			<KtFieldNumber
				v-if="componentDefinition.additionalProps.includes('numberMinimum')"
				formKey="numberMinimum"
				isOptional
				label="minimum"
			/>
		</div>
		<div
			v-if="
				componentDefinition.additionalProps.includes(
					'numberHideChangeButtons',
				) || componentDefinition.additionalProps.includes('numberHideMaximum')
			"
			class="field-row"
		>
			<KtFieldToggle
				v-if="
					componentDefinition.additionalProps.includes(
						'numberHideChangeButtons',
					)
				"
				formKey="numberHideChangeButtons"
				isOptional
				label="hideChangeButtons"
				type="switch"
			/>
			<KtFieldToggle
				v-if="componentDefinition.additionalProps.includes('numberHideMaximum')"
				formKey="numberHideMaximum"
				isOptional
				label="hideMaximum"
				type="switch"
			/>
		</div>
		<KtFieldSingleSelect
			v-if="componentDefinition.additionalProps.includes('currencyCurrency')"
			formKey="currencyCurrency"
			helpText='Available Currencies can be defined via <KtI18nContext :currencyMap="..."/>'
			label="currency"
			:options="[
				{ label: 'EUR', value: 'EUR' },
				{ label: 'USD', value: 'USD' },
			]"
		/>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('isInline')"
			formKey="isInline"
			isOptional
			label="isInline"
			type="switch"
		/>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('isLoadingOptions')"
			formKey="isLoadingOptions"
			isOptional
			label="isLoadingOptions"
			type="switch"
		/>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('isUnsorted')"
			formKey="isUnsorted"
			isOptional
			label="isUnsorted"
			type="switch"
		/>
		<div class="field-row">
			<KtFieldDate
				v-if="componentDefinition.additionalProps.includes('minimumDate')"
				formKey="minimumDate"
				isOptional
				label="minimumDate"
			/>
			<KtFieldDate
				v-if="componentDefinition.additionalProps.includes('maximumDate')"
				formKey="maximumDate"
				isOptional
				label="maximumDate"
			/>
		</div>
		<KtFieldNumber
			v-if="componentDefinition.additionalProps.includes('maximumSelectable')"
			formKey="maximumSelectable"
			helpText="Limits the amount of choices a user can select at the same time."
			isOptional
			label="maximumSelectable"
		/>
		<KtFieldToggleGroup
			v-if="componentDefinition.additionalProps.includes('shortcuts')"
			formKey="shortcuts"
			helpText="Add keepOpen to keep pop-up open on selection (see code sample for details)"
			isOptional
			label="shortcuts"
			:options="[
				{ key: 'today', label: 'Today' },
				{ key: 'lastWeek', label: 'Last Week' },
				{ key: 'lastMonth', label: 'Last Month' },
				{ key: 'lastYear', label: 'Last Year' },
			]"
		/>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('hasOptionSlot')"
			formKey="hasOptionSlot"
			isOptional
			label="option slot"
			type="switch"
		/>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('clearOnSelect')"
			formKey="clearOnSelect"
			isOptional
			label="clearOnSelect"
			type="switch"
		/>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('allowMultiple')"
			formKey="allowMultiple"
			helpText="Allows selecting more than one file"
			isOptional
			label="allowMultiple"
			type="switch"
		/>
		<KtFieldToggle
			v-if="componentDefinition.additionalProps.includes('allowPhotos')"
			formKey="allowPhotos"
			helpText="Allows taking photos with the device's camera. Photos are saved with .png extension."
			isOptional
			label="allowPhotos"
			type="switch"
		/>
		<KtFieldNumber
			v-if="
				componentDefinition.additionalProps.includes('collapseExtensionsAfter')
			"
			formKey="collapseExtensionsAfter"
			helpText="The maximum number of extensions to display in the Drop Area text"
			isOptional
			label="collapseExtensionsAfter"
			:minimum="0"
			size="small"
			:step="1"
		/>
		<KtFieldMultiSelect
			v-if="componentDefinition.additionalProps.includes('extensions')"
			formKey="extensions"
			helpText="List of allowed file extensions. Takes an array of case-insensitive strings."
			isOptional
			label="extensions"
			:options="[
				{ label: 'DOC', value: 'DOC' },
				{ label: 'GIF', value: 'GIF' },
				{ label: 'JP2', value: 'JP2' },
				{ label: 'JPEG', value: 'JPEG' },
				{ label: 'JPG', value: 'JPG' },
				{ label: 'OBJ', value: 'OBJ' },
				{ label: 'PDF', value: 'PDF' },
				{ label: 'PNG', value: 'PNG' },
				{ label: 'STL', value: 'STL' },
				{ label: 'TXT', value: 'TXT' },
			]"
		/>
		<KtFieldText
			v-if="componentDefinition.additionalProps.includes('externalUrl')"
			formKey="externalUrl"
			helpText="URL for external documentation"
			isOptional
			label="externalUrl"
			size="small"
		/>
		<KtFieldSingleSelect
			v-if="componentDefinition.additionalProps.includes('icon')"
			formKey="icon"
			helpText="The icon that appears inside the Drop Area"
			isOptional
			label="icon"
			:options="yocoIconOptions"
		>
			<template #option="{ option }">
				<i
					class="yoco"
					style="margin-right: 10px; font-size: 24px"
					v-text="option.value"
				/>
				<span v-text="option.label" />
			</template>
		</KtFieldSingleSelect>
		<KtFieldNumber
			v-if="componentDefinition.additionalProps.includes('maxFileSize')"
			:decimalPlaces="0"
			formKey="maxFileSize"
			helpText="The maximum file size allowed in bytes (in decimal base)"
			isOptional
			label="maxFileSize"
			:minimum="1"
			:step="1"
		/>
		<KtFieldToggle
			v-if="
				componentDefinition.additionalProps.includes('showVisibilityToggle')
			"
			formKey="showVisibilityToggle"
			helpText="For Password: display an eye icon to reveal/hide the content"
			isOptional
			label="Show visibility toggle"
			type="switch"
		/>
	</template>
</template>
