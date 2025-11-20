import {
	Kotti,
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
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

import { getLast, ISO8601, ISO8601_SECONDS, today } from '~/utilities/date'

export type ComponentNames =
	| 'KtFieldCurrency'
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

type FieldValueLookup = {
	currencyValue: Kotti.FieldCurrency.ModelValue
	dateRangeValue: Kotti.FieldDateRange.ModelValue
	dateTimeRangeValue: Kotti.FieldDateRange.ModelValue
	dateTimeValue: Kotti.FieldDateTime.ModelValue
	dateValue: Kotti.FieldDate.ModelValue
	fileUploadValue: Kotti.FieldFileUpload.ModelValue
	multiSelectValue: Kotti.FieldMultiSelect.ModelValue
	numberValue: Kotti.FieldNumber.ModelValue
	singleSelectValue: Kotti.FieldSingleSelect.ModelValue
	textValue: Kotti.FieldText.ModelValue
	toggleGroupValue: Kotti.FieldToggleGroup.ModelValue
	toggleValue: Kotti.FieldToggle.ModelValue
}

type FormFieldSettings = {
	additionalProps: {
		allowMultiple: Kotti.FieldToggle.ModelValue
		allowPhotos: Kotti.FieldToggle.ModelValue
		autoSize: Kotti.FieldToggle.ModelValue
		clearOnSelect: Kotti.FieldToggle.ModelValue
		collapseExtensionsAfter: Kotti.FieldNumber.ModelValue
		collapseTagsAfter: Kotti.FieldNumber.ModelValue
		currencyCurrency: string
		defaultSlot: string | null
		emitEvents: boolean
		extensions: Kotti.FieldMultiSelect.ModelValue
		externalUrl: Kotti.FieldText.ModelValue
		hasActions: boolean
		hideChangeButtons: boolean
		hideDropArea: boolean
		icon: Yoco.Icon | null
		isInline: boolean
		isLoadingOptions: boolean
		isUnsorted: boolean
		maxFileSize: Kotti.FieldNumber.ModelValue
		maxHeight: Kotti.FieldNumber.ModelValue
		maximumDate: Kotti.FieldDate.ModelValue
		maximumSelectable: Kotti.FieldNumber.ModelValue
		minimumDate: Kotti.FieldDate.ModelValue
		numberAlign: Kotti.FieldSingleSelect.ModelValue
		numberDecimalPlaces: Kotti.FieldNumber.ModelValue
		numberHideChangeButtons: boolean
		numberHideMaximum: boolean
		numberMaximum: Kotti.FieldNumber.ModelValue
		numberMinimum: Kotti.FieldNumber.ModelValue
		numberStep: Kotti.FieldNumber.ModelValue
		rows: Kotti.FieldNumber.ModelValue
		shortcuts: Kotti.FieldToggleGroup.ModelValue
		showContentSlot: boolean
		showDropAreaExtraContentSlot: boolean
		showHeaderSideSlot: boolean
		showHeaderSlot: boolean
		showOptionSlot: boolean
		showVisibilityToggle: boolean
		toggleType: 'checkbox' | 'switch'
	}
	autoComplete: Kotti.FieldText.ModelValue
	autoCompleteToken: Kotti.FieldText.ModelValue
	booleanFlags: {
		hideClear: Kotti.FieldToggle.ModelValue
		hideValidation: Kotti.FieldToggle.ModelValue
		isBorderless: Kotti.FieldToggle.ModelValue
		isDisabled: Kotti.FieldToggle.ModelValue
		isLoading: Kotti.FieldToggle.ModelValue
		isOptional: Kotti.FieldToggle.ModelValue
	}
	component: ComponentNames
	dataTest: Kotti.FieldText.ModelValue
	decimalSeparator: Kotti.DecimalSeparator
	events: {
		emitBlur: Kotti.FieldToggle.ModelValue
		emitKeyup: Kotti.FieldToggle.ModelValue
		emitOpen: Kotti.FieldToggle.ModelValue
	}
	formId: Kotti.FieldText.ModelValue
	hasHelpTextSlot: boolean
	helpDescription: Kotti.FieldText.ModelValue
	helpText: Kotti.FieldText.ModelValue
	label: Kotti.FieldText.ModelValue
	leftIcon: Yoco.Icon | null
	locale: Kotti.I18n.SupportedLanguages
	placeholder: Kotti.FieldText.ModelValue
	placeholder2: Kotti.FieldText.ModelValue
	prefix: Kotti.FieldText.ModelValue
	rightIcon: Yoco.Icon | null
	size: Kotti.Field.Size | null
	suffix: Kotti.FieldText.ModelValue
	tabIndex: Kotti.FieldNumber.ModelValue
	validation: Kotti.Field.Validation.Result['type']
}

export const getInitialSettings = (): FormFieldSettings => ({
	additionalProps: {
		allowMultiple: false,
		allowPhotos: false,
		autoSize: false,
		clearOnSelect: false,
		collapseExtensionsAfter: null,
		collapseTagsAfter: null,
		currencyCurrency: 'USD',
		defaultSlot: 'Default Slot',
		emitEvents: false,
		extensions: [],
		externalUrl: null,
		hasActions: false,
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
		shortcuts: {
			lastMonth: false,
			lastWeek: false,
			lastYear: false,
			today: false,
		},
		showContentSlot: false,
		showDropAreaExtraContentSlot: false,
		showHeaderSideSlot: false,
		showHeaderSlot: false,
		showOptionSlot: false,
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
	size: null,
	suffix: null,
	tabIndex: 0,
	validation: 'empty',
})

const DATE_ADDITIONAL_PROPS = [
	'emitEvents',
	'maximumDate',
	'minimumDate',
	'shortcuts',
] as const

export const getInitialValue = (): FieldValueLookup => ({
	currencyValue: null,
	dateRangeValue: [null, null],
	dateTimeRangeValue: [null, null],
	dateTimeValue: null,
	dateValue: null,
	fileUploadValue: [],
	multiSelectValue: [],
	numberValue: null,
	singleSelectValue: null,
	textValue: null,
	toggleGroupValue: {
		disabled: false,
		hasLongLabel: false,
		initiallyFalse: false,
		initiallyNull: null,
		initiallyTrue: true,
	},
	toggleValue: null,
})

export type ComponentDefinition = {
	additionalProps: Array<
		| 'actions'
		| 'allowMultiple'
		| 'allowPhotos'
		| 'autoSize'
		| 'clearOnSelect'
		| 'collapseExtensionsAfter'
		| 'collapseTagsAfter'
		| 'currencyCurrency'
		| 'defaultSlot'
		| 'emitEvents'
		| 'extensions'
		| 'externalUrl'
		| 'hideDropArea'
		| 'icon'
		| 'isInline'
		| 'isLoadingOptions'
		| 'isUnsorted'
		| 'maxFileSize'
		| 'maxHeight'
		| 'maximumDate'
		| 'maximumSelectable'
		| 'minimumDate'
		| 'numberAlign'
		| 'numberDecimalPlaces'
		| 'numberHideChangeButtons'
		| 'numberHideMaximum'
		| 'numberMaximum'
		| 'numberMinimum'
		| 'numberStep'
		| 'query'
		| 'rows'
		| 'shortcuts'
		| 'showContentSlot'
		| 'showDropAreaExtraContentSlot'
		| 'showHeaderSideSlot'
		| 'showHeaderSlot'
		| 'showOptionSlot'
		| 'showVisibilityToggle'
		| 'toggleType'
	>
	formKey: keyof FieldValueLookup
	name: ComponentNames
	supports: Kotti.Field.Supports
}

export const FIELD_COMPONENTS: Array<ComponentDefinition> = [
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
		additionalProps: [
			'allowMultiple',
			'allowPhotos',
			'collapseExtensionsAfter',
			'extensions',
			'externalUrl',
			'hideDropArea',
			'icon',
			'maxFileSize',
			'showDropAreaExtraContentSlot',
		],
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
			'isUnsorted',
			'maximumSelectable',
			'showOptionSlot',
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
			'isLoadingOptions',
			'isUnsorted',
			'maximumSelectable',
			'query',
			'showOptionSlot',
		],
		formKey: 'multiSelectValue',
		name: 'KtFieldMultiSelectRemote',
		supports: KtFieldMultiSelectRemote.meta.supports,
	},
	{
		additionalProps: [
			'emitEvents',
			'numberAlign',
			'numberDecimalPlaces',
			'numberHideChangeButtons',
			'numberHideMaximum',
			'numberMaximum',
			'numberMinimum',
			'numberStep',
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
			'isInline',
			'showContentSlot',
			'showHeaderSideSlot',
			'showHeaderSlot',
		],
		formKey: 'singleSelectValue',
		name: 'KtFieldRadioGroup',
		supports: KtFieldRadioGroup.meta.supports,
	},
	{
		additionalProps: ['actions', 'emitEvents', 'showOptionSlot', 'isUnsorted'],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelect',
		supports: KtFieldSingleSelect.meta.supports,
	},
	{
		additionalProps: [
			'actions',
			'emitEvents',
			'isLoadingOptions',
			'isUnsorted',
			'query',
			'showOptionSlot',
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
			'isInline',
			'showContentSlot',
			'showHeaderSideSlot',
			'showHeaderSlot',
			'toggleType',
		],
		formKey: 'toggleGroupValue',
		name: 'KtFieldToggleGroup',
		supports: KtFieldToggleGroup.meta.supports,
	},
]

export const radioGroupOptions: Kotti.FieldRadioGroup.Props['options'] = [
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

export const singleOrMultiSelectOptions: Kotti.FieldSingleSelect.Props['options'] =
	[
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

export const toggleGroupOptions: Kotti.FieldToggleGroup.Props['options'] = [
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

export const getShortcuts = (
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

	const isRange = component.endsWith('Range')

	const templateFormat = component.includes('Time') ? ISO8601_SECONDS : ISO8601
	const todayDate = today(templateFormat)

	const getShortcutValue = (start: 'month' | 'week' | 'year' | null) => {
		const startDate =
			start === null ? todayDate : getLast(start, templateFormat)

		return isRange ? ([startDate, todayDate] as [string, string]) : startDate
	}

	return {
		lastMonth: {
			label: 'Last Month',
			value: getShortcutValue('month'),
		},
		lastWeek: {
			label: 'Last Week',
			value: getShortcutValue('week'),
		},
		lastYear: {
			label: 'Last Year',
			value: getShortcutValue('year'),
		},
		today: {
			keepOpen: true,
			label: 'Today',
			value: getShortcutValue(null),
		},
	}
}

export const yocoIconOptions = Object.values(Yoco.Icon).map((icon) => ({
	label: icon,
	value: icon,
}))
