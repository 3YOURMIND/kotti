<template>
	<ComponentInfo v-bind="{ component }" />

	<KtForm v-model="values">
		<ComponentForm
			:component="component"
			:hiddenProps="componentProps.hidden"
			:props="componentProps.open"
		>
			<template #component-form-settings>
				<KtForm v-model="settings">
					<KtFieldSingleSelect
						formKey="component"
						hideClear
						label="Component"
						:options="componentOptions"
					/>
				</KtForm>
				<div />
			</template>
		</ComponentForm>
	</KtForm>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'

import {
	Kotti,
	// KtAvatar,
	// KtButton,
	KtFieldCurrency,
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
	KtFieldFileUpload,
	KtFieldMultiSelect,
	KtFieldMultiSelectRemote,
	KtFieldNumber,
	KtFieldPassword,
	KtFieldRadioGroup,
	KtFieldSingleSelect,
	KtFieldSingleSelectRemote,
	KtFieldText,
	KtFieldTextArea,
	KtFieldToggle,
	KtFieldToggleGroup,
	KtForm,
	// KtFormControllerObject,
	// KtI18nContext,
} from '@3yourmind/kotti-ui'
import type { Yoco } from '@3yourmind/yoco'

import ComponentForm from '~/components/component-form/ComponentForm.vue'
import ComponentInfo from '~/components/component-info/ComponentInfo.vue'
import { getLast, ISO8601, ISO8601_SECONDS, today } from '~/utilities/date'
import { info } from '~/utilities/toaster'

type ComponentNames =
	| 'KtFieldDate'
	| 'KtFieldDateRange'
	| 'KtFieldDateTime'
	| 'KtFieldDateTimeRange'
	| 'KtFieldFileUpload'
	| 'KtFieldMultiSelect'
	| 'KtFieldMultiSelectRemote'
	| 'KtFieldNumber'
	| 'KtFieldPassword'
	| 'KtFieldRadioGroup'
	| 'KtFieldSingleSelect'
	| 'KtFieldSingleSelectRemote'
	| 'KtFieldText'
	| 'KtFieldTextArea'
	| 'KtFieldToggle'
	| 'KtFieldToggleGroup'
	| 'KtFilters'
	| 'KtValueLabel'

type FieldValueLookup = {
	currencyValue: Kotti.FieldCurrency.Value
	dateRangeValue: Kotti.FieldDateRange.Value
	dateTimeRangeValue: Kotti.FieldDateRange.Value
	dateTimeValue: Kotti.FieldDateTime.Value
	dateValue: Kotti.FieldDate.Value
	fileUploadRemoteValue: Kotti.FieldFileUploadRemote.Value
	fileUploadValue: Kotti.FieldFileUpload.Value
	multiSelectValue: Kotti.FieldMultiSelect.Value
	numberValue: Kotti.FieldNumber.Value
	singleSelectValue: Kotti.FieldSingleSelect.Value
	textValue: Kotti.FieldText.Value
	toggleGroupValue: Kotti.FieldToggleGroup.Value
	toggleValue: Kotti.FieldToggle.Value
}

const DATE_ADDITIONAL_PROPS = [
	'emitEvents',
	'maximumDate',
	'minimumDate',
	'shortcuts',
]
const FILE_UPLOAD_SHARED_PROPS = [
	'allowMultiple',
	'allowPhotos',
	'collapseExtensionsAfter',
	'extensions',
	'externalUrl',
	'hideDropArea',
	'icon',
	'maxFileSize',
]

const getInitialValue = (): FieldValueLookup => ({
	currencyValue: null,
	dateRangeValue: [null, null],
	dateTimeRangeValue: [null, null],
	dateTimeValue: null,
	dateValue: null,
	fileUploadRemoteValue: [],
	fileUploadValue: [],
	multiSelectValue: [],
	numberValue: null,
	singleSelectValue: null,
	textValue: null,
	toggleGroupValue: {
		initiallyFalse: false,
		initiallyNull: null,
		initiallyTrue: true,
	},
	toggleValue: null,
})

const components: Array<{
	additionalProps: Array<string>
	formKey: keyof FieldValueLookup
	name: string
	supports: Kotti.Field.Supports
}> = [
	{
		additionalProps: [
			'currencyCurrency',
			'emitEvents',
			'numberMaximum',
			'numberMinimum',
		],
		formKey: 'currencyValue',
		name: 'KtFieldCurrency',
		supports: KtFieldCurrency.meta.supports,
	},
	{
		additionalProps: DATE_ADDITIONAL_PROPS,
		formKey: 'dateValue',
		name: 'KtFieldDate',
		supports: KtFieldDate.meta.supports,
	},
	{
		additionalProps: DATE_ADDITIONAL_PROPS,
		formKey: 'dateRangeValue',
		name: 'KtFieldDateRange',
		supports: KtFieldDateRange.meta.supports,
	},
	{
		additionalProps: DATE_ADDITIONAL_PROPS,
		formKey: 'dateTimeValue',
		name: 'KtFieldDateTime',
		supports: KtFieldDateTime.meta.supports,
	},
	{
		additionalProps: DATE_ADDITIONAL_PROPS,
		formKey: 'dateTimeRangeValue',
		name: 'KtFieldDateTimeRange',
		supports: KtFieldDateTimeRange.meta.supports,
	},
	{
		additionalProps: [...FILE_UPLOAD_SHARED_PROPS, 'emitEvents'],
		formKey: 'fileUploadValue',
		name: 'KtFieldFileUpload',
		supports: KtFieldFileUpload.meta.supports,
	},
	{
		additionalProps: [
			'actions',
			'clearOnSelect',
			'collapseTagsAfter',
			'emitEvents',
			'hasOptionSlot',
			'isUnsorted',
			'maximumSelectable',
		],
		formKey: 'multiSelectValue',
		name: 'KtFieldMultiSelect',
		supports: KtFieldMultiSelect.meta.supports,
	},
	{
		additionalProps: [
			'actions',
			'clearOnSelect',
			'collapseTagsAfter',
			'emitEvents',
			'hasOptionSlot',
			'isLoadingOptions',
			'isUnsorted',
			'maximumSelectable',
			'query',
		],
		formKey: 'multiSelectValue',
		name: 'KtFieldMultiSelectRemote',
		supports: KtFieldMultiSelectRemote.meta.supports,
	},
	{
		additionalProps: [
			'numberAlign',
			'numberDecimalPlaces',
			'numberHideChangeButtons',
			'numberHideMaximum',
			'numberMaximum',
			'numberMinimum',
			'numberStep',
			'emitEvents',
		],
		formKey: 'numberValue',
		name: 'KtFieldNumber',
		supports: KtFieldNumber.meta.supports,
	},
	{
		additionalProps: ['emitEvents', 'showVisibilityToggle'],
		formKey: 'textValue',
		name: 'KtFieldPassword',
		supports: KtFieldPassword.meta.supports,
	},
	{
		additionalProps: [
			'contentSlot',
			'headerSlot',
			'isInline',
			'showHeaderSideSlot',
		],
		formKey: 'singleSelectValue',
		name: 'KtFieldRadioGroup',
		supports: KtFieldRadioGroup.meta.supports,
	},
	{
		additionalProps: ['actions', 'emitEvents', 'hasOptionSlot', 'isUnsorted'],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelect',
		supports: KtFieldSingleSelect.meta.supports,
	},
	{
		additionalProps: [
			'actions',
			'emitEvents',
			'hasOptionSlot',
			'isLoadingOptions',
			'isUnsorted',
			'query',
		],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelectRemote',
		supports: KtFieldSingleSelectRemote.meta.supports,
	},
	{
		additionalProps: ['emitEvents'],
		formKey: 'textValue',
		name: 'KtFieldText',
		supports: KtFieldText.meta.supports,
	},
	{
		additionalProps: ['autoSize', 'emitEvents', 'maxHeight', 'rows'],
		formKey: 'textValue',
		name: 'KtFieldTextArea',
		supports: KtFieldTextArea.meta.supports,
	},
	{
		additionalProps: ['defaultSlot', 'toggleType'],
		formKey: 'toggleValue',
		name: 'KtFieldToggle',
		supports: KtFieldToggle.meta.supports,
	},
	{
		additionalProps: [
			'contentSlot',
			'headerSlot',
			'isInline',
			'showHeaderSideSlot',
			'toggleType',
		],
		formKey: 'toggleGroupValue',
		name: 'KtFieldToggleGroup',
		supports: KtFieldToggleGroup.meta.supports,
	},
]

const radioGroupOptions: Kotti.FieldRadioGroup.Props['options'] = [
	{ dataTest: 'data-test-key-1', label: 'Key 1', value: 'value1' },
	{
		dataTest: 'data-test-key-2',
		label: 'Key 2',
		tooltip: 'Some tooltip',
		value: 'value2',
	},
	{
		isDisabled: true,
		label: 'Key 3',
		tooltip: 'This option is disabled',
		value: 'value3',
	},
	{
		label:
			'Key 4 Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
		tooltip: 'This option has a long label',
		value: 'value4',
	},
]

const singleOrMultiSelectOptions: Kotti.FieldSingleSelect.Props['options'] = [
	{ label: 'Key 2', value: 'value2' },
	{ label: 'Key 1', value: 'value1' },
	{ isDisabled: true, label: 'Key 3', value: 'value3' },
	{ label: 'Key 7', value: 'value7' },
	{ label: 'Key 10', value: 'value10' },
	{ label: 'Key 4', value: 'value4' },
	{ label: 'Key 9', value: 'value9' },
	{ label: 'Key 6', value: 'value6' },
	{ label: 'Key 8', value: 'value8' },
	{ label: 'Key 5', value: 'value5' },
]

const toggleGroupOptions: Kotti.FieldToggleGroup.Props['options'] = [
	{
		dataTest: 'data-test-initially-false',
		key: 'initiallyFalse',
		label: 'Initially False',
	},
	{
		dataTest: 'data-test-initially-null',
		key: 'initiallyNull',
		label: 'Initially Null',
		tooltip: 'null is for uninitialized data',
	},
	{ key: 'initiallyTrue', label: 'Initially True' },
	{
		isDisabled: true,
		key: 'disabled',
		label: 'Disabled',
		tooltip: 'A tooltip!',
	},

	{
		key: 'hasLongLabel',
		label:
			'Long Label: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
		tooltip: 'A tooltip!',
	},
]

const getShortcuts = (
	component: ComponentNames,
): Record<
	string,
	{
		keepOpen?: boolean
		label: string
		value: [string, string] | string
	}
> => {
	if (
		![
			'KtFieldDate',
			'KtFieldDateRange',
			'KtFieldDateTime',
			'KtFieldDateTimeRange',
		].includes(component)
	)
		throw new Error(`getShortcuts: invalid component "${component}"`)

	const isRange = ['KtFieldDateRange', 'KtFieldDateTimeRange'].includes(
		component,
	)
	const templateFormat = ['KtFieldDate', 'KtFieldDateRange'].includes(component)
		? ISO8601
		: ISO8601_SECONDS
	const todayDate = today(templateFormat)

	return {
		lastMonth: {
			label: 'Last Month',
			value: isRange
				? [getLast('month', templateFormat), todayDate]
				: getLast('month', templateFormat),
		},
		lastWeek: {
			label: 'Last Week',
			value: isRange
				? [getLast('week', templateFormat), todayDate]
				: getLast('week', templateFormat),
		},
		lastYear: {
			label: 'Last Year',
			value: isRange
				? [getLast('year', templateFormat), todayDate]
				: getLast('year', templateFormat),
		},
		today: {
			keepOpen: true,
			label: 'Today',
			value: isRange ? [todayDate, todayDate] : todayDate,
		},
	}
}

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFormFields',
	components: {
		ComponentForm,
		ComponentInfo,
		// KtAvatar,
		// KtButton,
		// KtFieldCurrency,
		// KtFieldDate,
		// KtFieldDateRange,
		// KtFieldDateTime,
		// KtFieldDateTimeRange,
		// KtFieldFileUpload,
		// KtFieldMultiSelect,
		// KtFieldMultiSelectRemote,
		// KtFieldNumber,
		// KtFieldPassword,
		// KtFieldRadioGroup,
		KtFieldSingleSelect,
		// KtFieldSingleSelectRemote,
		// KtFieldText,
		// KtFieldTextArea,
		// KtFieldToggle,
		// KtFieldToggleGroup,
		KtForm,
	},
	setup() {
		const values = ref(getInitialValue())

		const remoteSingleSelectQuery =
			ref<Kotti.FieldSingleSelectRemote.Props['query']>(null)

		const settings = ref<{
			additionalProps: {
				allowMultiple: Kotti.FieldToggle.Value
				allowPhotos: Kotti.FieldToggle.Value
				autoSize: Kotti.FieldToggle.Value
				clearOnSelect: Kotti.FieldToggle.Value
				collapseExtensionsAfter: Kotti.FieldNumber.Value
				collapseTagsAfter: Kotti.FieldNumber.Value
				contentSlot: string | null
				currencyCurrency: string
				defaultSlot: string | null
				emitEvents: boolean
				extensions: Kotti.FieldMultiSelect.Value
				externalUrl: Kotti.FieldText.Value
				hasActions: boolean
				hasOptionSlot: boolean
				headerSlot: string | null
				hideChangeButtons: boolean
				hideDropArea: boolean
				icon: Yoco.Icon | null
				isInline: boolean
				isLoadingOptions: boolean
				isUnsorted: boolean
				maxFileSize: Kotti.FieldNumber.Value
				maxHeight: Kotti.FieldNumber.Value
				maximumDate: Kotti.FieldDate.Value
				maximumSelectable: Kotti.FieldNumber.Value
				minimumDate: Kotti.FieldDate.Value
				numberAlign: Kotti.FieldSingleSelect.Value
				numberDecimalPlaces: Kotti.FieldNumber.Value
				numberHideChangeButtons: boolean
				numberHideMaximum: boolean
				numberMaximum: Kotti.FieldNumber.Value
				numberMinimum: Kotti.FieldNumber.Value
				numberStep: Kotti.FieldNumber.Value
				rows: Kotti.FieldNumber.Value
				shortcuts: Kotti.FieldToggleGroup.Value
				showHeaderSideSlot: boolean
				showVisibilityToggle: boolean
				toggleType: 'checkbox' | 'switch'
			}
			autoComplete: Kotti.FieldSingleSelect.Value
			autoCompleteToken: Kotti.FieldText.Value
			booleanFlags: {
				hideClear: Kotti.FieldToggle.Value
				hideValidation: Kotti.FieldToggle.Value
				isBorderless: Kotti.FieldToggle.Value
				isDisabled: Kotti.FieldToggle.Value
				isLoading: Kotti.FieldToggle.Value
				isOptional: Kotti.FieldToggle.Value
			}
			component: ComponentNames
			dataTest: Kotti.FieldText.Value
			decimalSeparator: Kotti.DecimalSeparator
			events: {
				emitBlur: Kotti.FieldToggle.Value
				emitKeyup: Kotti.FieldToggle.Value
				emitOpen: Kotti.FieldToggle.Value
			}
			formId: Kotti.FieldText.Value
			hasHelpTextSlot: boolean
			helpDescription: Kotti.FieldText.Value
			helpText: Kotti.FieldText.Value
			label: Kotti.FieldText.Value
			leftIcon: Yoco.Icon | null
			locale: Kotti.I18n.SupportedLanguages
			placeholder: Kotti.FieldText.Value
			placeholder2: Kotti.FieldText.Value
			prefix: Kotti.FieldText.Value
			rightIcon: Yoco.Icon | null
			size: Kotti.Field.Size
			suffix: Kotti.FieldText.Value
			tabIndex: Kotti.FieldNumber.Value
			validation: Kotti.Field.Validation.Result['type']
		}>({
			additionalProps: {
				allowMultiple: false,
				allowPhotos: false,
				autoSize: false,
				clearOnSelect: false,
				collapseExtensionsAfter: null,
				collapseTagsAfter: null,
				contentSlot: null,
				currencyCurrency: 'USD',
				defaultSlot: 'Default Slot',
				emitEvents: false,
				extensions: [],
				externalUrl: null,
				hasActions: false,
				hasOptionSlot: false,
				headerSlot: null,
				hideChangeButtons: false,
				hideDropArea: false,
				icon: null,
				isInline: false,
				isLoadingOptions: false,
				isUnsorted: false,
				maxFileSize: null,
				maxHeight: null,
				maximumDate: null,
				maximumSelectable: null,
				minimumDate: null,
				numberAlign: 'left',
				numberDecimalPlaces: null,
				numberHideChangeButtons: false,
				numberHideMaximum: false,
				numberMaximum: null,
				numberMinimum: null,
				numberStep: null,
				rows: null,
				shortcuts: null,
				showHeaderSideSlot: false,
				showVisibilityToggle: false,
				toggleType: 'checkbox',
			},
			autoComplete: Kotti.Field.AutoComplete.OFF,
			autoCompleteToken: null,
			booleanFlags: {
				hideClear: false,
				hideValidation: false,
				isBorderless: false,
				isDisabled: false,
				isLoading: false,
				isOptional: true,
			},
			component: 'KtFieldText',
			dataTest: null,
			decimalSeparator: Kotti.DecimalSeparator.DOT,
			events: {
				emitBlur: false,
				emitKeyup: false,
				emitOpen: false,
			},
			formId: null,
			hasHelpTextSlot: false,
			helpDescription: null,
			helpText: null,
			label: 'Label',
			leftIcon: null,
			locale: 'en-US',
			placeholder: null,
			placeholder2: null,
			prefix: null,
			rightIcon: null,
			size: Kotti.Field.Size.MEDIUM,
			suffix: null,
			tabIndex: null,
			validation: 'empty',
		})

		const componentDefinition = computed(() => {
			const result = components.find(
				({ name }) => name === settings.value.component,
			)

			if (!result) throw new Error('Invalid Component Name')

			return result
		})

		const isRangeComponent = computed(() =>
			settings.value.component.includes('Range'),
		)

		// eslint-disable-next-line sonarjs/cognitive-complexity
		const componentProps = computed(() => {
			const standardProps = {
				dataTest: settings.value.dataTest,
				helpDescription: settings.value.helpDescription,
				helpText: settings.value.helpText,
				hideValidation: settings.value.booleanFlags.hideValidation,
				isDisabled: settings.value.booleanFlags.isDisabled,
				isLoading: settings.value.booleanFlags.isLoading,
				isOptional: settings.value.booleanFlags.isOptional,
				label: settings.value.label,
				size: settings.value.size,
			}

			const additionalProps = {}

			if (componentDefinition.value.supports.clear)
				Object.assign(additionalProps, {
					hideClear: settings.value.booleanFlags.hideClear,
				})

			if (componentDefinition.value.supports.borderless)
				Object.assign(additionalProps, {
					isBorderless: settings.value.booleanFlags.isBorderless,
				})

			if (componentDefinition.value.supports.decoration)
				Object.assign(additionalProps, {
					leftIcon: settings.value.leftIcon,
					prefix: settings.value.prefix,
					rightIcon: settings.value.rightIcon,
					suffix: settings.value.suffix,
				})

			if (componentDefinition.value.supports.placeholder)
				if (isRangeComponent.value) {
					if (
						settings.value.placeholder !== null ||
						settings.value.placeholder2 !== null
					)
						Object.assign(additionalProps, {
							placeholder: [
								settings.value.placeholder,
								settings.value.placeholder2,
							],
						})
				} else
					Object.assign(additionalProps, {
						placeholder: settings.value.placeholder,
					})

			if (componentDefinition.value.supports.tabIndex)
				Object.assign(additionalProps, {
					tabIndex: settings.value.tabIndex,
				})

			if (componentDefinition.value.supports.autoComplete)
				Object.assign(additionalProps, {
					autoComplete:
						settings.value.autoComplete === 'token'
							? settings.value.autoCompleteToken
							: (settings.value.autoComplete ?? undefined),
				})

			if (
				componentDefinition.value.additionalProps.includes('toggleType') &&
				settings.value.additionalProps.toggleType !== 'checkbox' // Exclude Default Value
			)
				Object.assign(additionalProps, {
					type: settings.value.additionalProps.toggleType,
				})
			if (componentDefinition.value.additionalProps.includes('autoSize')) {
				Object.assign(additionalProps, {
					autoSize: settings.value.additionalProps.autoSize,
				})
			}
			if (
				componentDefinition.value.additionalProps.includes(
					'showVisibilityToggle',
				)
			) {
				Object.assign(additionalProps, {
					showVisibilityToggle:
						settings.value.additionalProps.showVisibilityToggle,
				})
			}

			if (componentDefinition.value.additionalProps.includes('rows'))
				Object.assign(additionalProps, {
					rows: settings.value.additionalProps.rows,
				})
			if (componentDefinition.value.additionalProps.includes('maxHeight'))
				Object.assign(additionalProps, {
					maxHeight: settings.value.additionalProps.maxHeight,
				})

			if (
				componentDefinition.value.additionalProps.includes(
					'numberDecimalPlaces',
				) &&
				settings.value.additionalProps.numberDecimalPlaces !== null
			)
				Object.assign(additionalProps, {
					decimalPlaces: settings.value.additionalProps.numberDecimalPlaces,
				})

			if (
				componentDefinition.value.additionalProps.includes('currencyCurrency')
			)
				Object.assign(additionalProps, {
					currency: settings.value.additionalProps.currencyCurrency,
				})

			if (componentDefinition.value.additionalProps.includes('numberAlign'))
				Object.assign(additionalProps, {
					align: settings.value.additionalProps.numberAlign ?? 'left',
				})

			if (
				componentDefinition.value.additionalProps.includes(
					'numberHideChangeButtons',
				)
			)
				Object.assign(additionalProps, {
					hideChangeButtons:
						settings.value.additionalProps.numberHideChangeButtons,
				})

			if (
				componentDefinition.value.additionalProps.includes('numberHideMaximum')
			)
				Object.assign(additionalProps, {
					hideMaximum: settings.value.additionalProps.numberHideMaximum,
				})

			if (componentDefinition.value.additionalProps.includes('numberMaximum'))
				Object.assign(additionalProps, {
					maximum: settings.value.additionalProps.numberMaximum,
				})

			if (componentDefinition.value.additionalProps.includes('numberMinimum'))
				Object.assign(additionalProps, {
					minimum: settings.value.additionalProps.numberMinimum,
				})

			if (
				componentDefinition.value.additionalProps.includes('numberStep') &&
				settings.value.additionalProps.numberStep !== null
			)
				Object.assign(additionalProps, {
					step: settings.value.additionalProps.numberStep,
				})

			if (componentDefinition.value.additionalProps.includes('isInline'))
				Object.assign(additionalProps, {
					isInline: settings.value.additionalProps.isInline,
				})

			if (
				componentDefinition.value.additionalProps.includes('isLoadingOptions')
			)
				Object.assign(additionalProps, {
					isLoadingOptions: settings.value.additionalProps.isLoadingOptions,
				})

			if (componentDefinition.value.additionalProps.includes('isUnsorted'))
				Object.assign(additionalProps, {
					isUnsorted: settings.value.additionalProps.isUnsorted,
				})

			if (componentDefinition.value.additionalProps.includes('maximumDate'))
				Object.assign(additionalProps, {
					maximumDate: settings.value.additionalProps.maximumDate,
				})

			if (
				componentDefinition.value.additionalProps.includes(
					'maximumSelectable',
				) &&
				settings.value.additionalProps.maximumSelectable !== null
			)
				Object.assign(additionalProps, {
					maximumSelectable: settings.value.additionalProps.maximumSelectable,
				})

			if (componentDefinition.value.additionalProps.includes('minimumDate'))
				Object.assign(additionalProps, {
					minimumDate: settings.value.additionalProps.minimumDate,
				})

			if (componentDefinition.value.additionalProps.includes('shortcuts'))
				Object.assign(additionalProps, {
					shortcuts: Object.entries(
						settings.value.additionalProps.shortcuts ?? {},
					)
						.filter(([_, value]) => value)
						.map(([key]) => getShortcuts(settings.value.component)[key]),
				})

			if (
				componentDefinition.value.additionalProps.includes(
					'collapseTagsAfter',
				) &&
				settings.value.additionalProps.collapseTagsAfter !== null
			)
				Object.assign(additionalProps, {
					collapseTagsAfter: settings.value.additionalProps.collapseTagsAfter,
				})
			if (componentDefinition.value.additionalProps.includes('clearOnSelect'))
				Object.assign(additionalProps, {
					clearOnSelect: settings.value.additionalProps.clearOnSelect,
				})

			if (componentDefinition.value.additionalProps.includes('allowMultiple'))
				Object.assign(additionalProps, {
					allowMultiple: settings.value.additionalProps.allowMultiple,
				})
			if (componentDefinition.value.additionalProps.includes('allowPhotos'))
				Object.assign(additionalProps, {
					allowPhotos: settings.value.additionalProps.allowPhotos,
				})
			if (
				componentDefinition.value.additionalProps.includes(
					'collapseExtensionsAfter',
				) &&
				settings.value.additionalProps.collapseExtensionsAfter !== null
			)
				Object.assign(additionalProps, {
					collapseExtensionsAfter:
						settings.value.additionalProps.collapseExtensionsAfter,
				})
			if (componentDefinition.value.additionalProps.includes('extensions'))
				Object.assign(additionalProps, {
					extensions: settings.value.additionalProps.extensions,
				})
			if (componentDefinition.value.additionalProps.includes('externalUrl'))
				Object.assign(additionalProps, {
					externalUrl: settings.value.additionalProps.externalUrl,
				})
			if (
				componentDefinition.value.additionalProps.includes('icon') &&
				settings.value.additionalProps.icon !== null
			)
				Object.assign(additionalProps, {
					icon: settings.value.additionalProps.icon,
				})
			if (
				componentDefinition.value.additionalProps.includes('maxFileSize') &&
				settings.value.additionalProps.maxFileSize !== null
			)
				Object.assign(additionalProps, {
					maxFileSize: settings.value.additionalProps.maxFileSize,
				})

			if (componentDefinition.value.additionalProps.includes('hideDropArea'))
				Object.assign(additionalProps, {
					hideDropArea: settings.value.additionalProps.hideDropArea,
				})
			if (
				[
					'KtFieldMultiSelect',
					'KtFieldMultiSelectRemote',
					'KtFieldSingleSelect',
					'KtFieldSingleSelectRemote',
				].includes(settings.value.component)
			) {
				const options = (
					['KtFieldMultiSelectRemote', 'KtFieldSingleSelectRemote'].includes(
						settings.value.component,
					)
						? singleOrMultiSelectOptions.filter((option) =>
								option.label
									.toLowerCase()
									.includes(
										(remoteSingleSelectQuery.value ?? '').toLowerCase(),
									),
							)
						: singleOrMultiSelectOptions
				).map((option, index) => ({
					...option,
					dataTest: index % 2 === 0 ? String(option.value) : undefined,
				}))

				Object.assign(additionalProps, {
					options,
				})
			}

			if (componentDefinition.value.additionalProps.includes('actions'))
				Object.assign(additionalProps, {
					actions: [
						{
							label: 'Create Item',
							onClick: () => {
								info({ text: 'actions[0].onClick called' })
							},
						},
						{
							label: 'Edit Item',
							onClick: () => {
								info({ text: 'actions[1].onClick called' })
							},
						},
					],
				})

			if (
				['KtFieldMultiSelectRemote', 'KtFieldSingleSelectRemote'].includes(
					settings.value.component,
				)
			) {
				Object.assign(additionalProps, { query: remoteSingleSelectQuery.value })
			}

			if (['KtFieldRadioGroup'].includes(settings.value.component)) {
				Object.assign(additionalProps, {
					contentSlot: null,
					headerSlot: null,
					options: radioGroupOptions,
					showHeaderSideSlot: false,
				})
			}
			if (['KtFieldToggle'].includes(settings.value.component))
				Object.assign(additionalProps, {
					defaultSlot: 'Default Slot',
				})

			if (['KtFieldToggleGroup'].includes(settings.value.component))
				Object.assign(additionalProps, {
					contentSlot: null,
					headerSlot: null,
					options: toggleGroupOptions,
				})

			return {
				hidden: {
					formKey: componentDefinition.value.formKey,
				},
				open: { ...standardProps, ...additionalProps },
			}
		})

		return {
			component: computed(
				(): { meta: Kotti.Meta; name: string } =>
					(
						({
							KtFieldCurrency,
							KtFieldDate,
							KtFieldDateRange,
							KtFieldDateTime,
							KtFieldDateTimeRange,
							KtFieldFileUpload,
							KtFieldMultiSelect,
							KtFieldMultiSelectRemote,
							KtFieldNumber,
							KtFieldPassword,
							KtFieldRadioGroup,
							KtFieldSingleSelect,
							KtFieldSingleSelectRemote,
							KtFieldText,
							KtFieldTextArea,
							KtFieldToggle,
							KtFieldToggleGroup,
						}) as Record<string, { meta: Kotti.Meta; name: string }>
					)[settings.value.component],
			),
			componentOptions: components.map((comp) => ({
				label: comp.name,
				value: comp.name,
			})),
			componentProps,
			settings,
			values,
		}
	},
})
</script>
