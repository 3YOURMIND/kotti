<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtI18nContext
			:currencyMap="{
				USD: {
					symbol: '$',
					decimalPlaces: 2,
				},
				EUR: {
					symbol: '€',
					decimalPlaces: 2,
				},
			}"
			:locale="settings.locale"
			:numberFormat="{ decimalSeparator: settings.decimalSeparator }"
		>
			<div class="overview">
				<div class="overview__component">
					<h4>Component</h4>
					<KtForm
						v-model="values"
						:formId="settings.formId || undefined"
						@submit="onSubmit"
					>
						<component
							:is="componentRepresentation.name"
							v-bind="componentRepresentation.props"
							:actions="componentRepresentation.actions"
							:validator="componentRepresentation.validator"
							@update:query="updateQuery"
						>
							<template
								v-if="componentRepresentation.hasHelpTextSlot"
								#helpText
							>
								<div>
									Supports
									<abbr title="Hypertext Markup Language">HTML</abbr> via
									<code>&lt;template #helpText&gt;</code>
								</div>
							</template>
							<template
								v-if="componentRepresentation.hasOptionSlot"
								#option="{ option }"
							>
								<div style="display: flex; gap: 10px; align-items: center">
									<KtAvatar
										size="sm"
										:src="`https://picsum.photos/seed/${option.label}/100/100`"
									/>
									{{ option.label }}
								</div>
							</template>
							<template
								v-if="componentRepresentation.headerSlot !== null"
								slot="header"
							>
								<div v-text="settings.additionalProps.headerSlot" />
							</template>
							<template
								v-if="componentRepresentation.contentSlot !== null"
								slot="content"
							>
								<div v-text="settings.additionalProps.contentSlot" />
							</template>
							<a
								v-if="componentRepresentation.showHeaderSideSlot"
								slot="headerSide"
								href="#"
								v-text="'Interactive'"
							/>
							<template v-if="componentRepresentation.defaultSlot">
								<div v-text="componentRepresentation.defaultSlot" />
							</template>
						</component>
					</KtForm>
					<div class="overview__component__value">
						<strong>Value</strong>:
						<span v-text="JSON.stringify(values[componentProps.formKey])" />
						<a @click.prevent="reset">reset</a>
					</div>
				</div>
				<div class="overview__code">
					<h4>Code</h4>
					<pre v-text="componentRepresentation.code" />
					<KtButton
						class="mt-4"
						label="Save to LocalStorage"
						type="primary"
						@click="savedFieldsAdd"
					/>
				</div>
			</div>
			<KtForm v-model="settings" size="small">
				<div class="wrapper">
					<div>
						<h4>Settings</h4>
						<KtFieldSingleSelect
							formKey="component"
							hideClear
							label="Component"
							:options="componentOptions"
						/>
						<KtFieldSingleSelect
							formKey="decimalSeparator"
							helpText="Can be set via KtI18nContext"
							hideClear
							label="Decimal Separator"
							leftIcon="csv"
							:options="decimalSeparatorOptions"
						/>
						<KtFieldSingleSelect
							formKey="locale"
							helpText="Can be set via KtI18nContext"
							hideClear
							label="Language"
							leftIcon="global"
							:options="[
								{ label: 'German (de-DE)', value: 'de-DE' },
								{ label: 'English (en-US)', value: 'en-US' },
								{ label: 'Spanish (es-ES)', value: 'es-ES' },
								{ label: 'French (fr-FR)', value: 'fr-FR' },
								{ label: 'Japanese (ja-JP)', value: 'ja-JP' },
							]"
						/>
						<KtFieldSingleSelect
							formKey="size"
							hideClear
							isOptional
							label="Size"
							:options="[
								{ label: 'Small', value: 'small' },
								{ label: 'Medium (Default)', value: 'medium' },
								{ label: 'Large', value: 'large' },
							]"
						/>
						<KtFieldText formKey="formId" isOptional label="Form ID" />
						<KtFieldSingleSelect
							formKey="validation"
							isOptional
							label="Validation State"
							:options="[
								{ label: 'Empty (Default)', value: 'empty' },
								{ label: 'Success', value: 'success' },
								{ label: 'Warning', value: 'warning' },
								{ label: 'Error', value: 'error' },
							]"
						>
							<div slot="helpText">
								Passed as a validation function:
								<code>() => ({ type: 'error', message: '' })</code>
								or via
								<code>KtForm.validators</code>
							</div>
						</KtFieldSingleSelect>
						<KtFieldToggleGroup
							formKey="booleanFlags"
							isOptional
							label="Boolean Flags"
							:options="[
								{
									isDisabled: !componentDefinition.supports.clear,
									key: 'hideClear',
									label: 'hideClear',
									tooltip: 'Support Varies',
								},
								{ key: 'hideValidation', label: 'hideValidation' },
								{ key: 'isDisabled', label: 'isDisabled' },
								{ key: 'isLoading', label: 'isLoading' },
								{ key: 'isOptional', label: 'isOptional' },
							]"
							type="switch"
						/>
						<KtFieldNumber
							v-if="componentDefinition.supports.tabIndex"
							formKey="tabIndex"
							helpText="Support varies"
							isOptional
							label="tabIndex"
						/>
					</div>
					<div>
						<h4>Texts</h4>
						<KtFieldText formKey="label" isOptional label="label" />
						<KtFieldText
							formKey="helpDescription"
							isOptional
							label="helpDescription"
						/>
						<KtFieldText formKey="dataTest" isOptional label="dataTest" />
						<div class="field-row">
							<KtFieldText
								formKey="helpText"
								:helpText="
									settings.hasHelpTextSlot
										? 'Not supported when using a #helpText slot'
										: null
								"
								:isDisabled="settings.hasHelpTextSlot"
								isOptional
								label="helpText"
							/>
							<KtFieldToggle
								formKey="hasHelpTextSlot"
								isOptional
								label="Use #helpText Slot"
								type="switch"
							/>
						</div>
						<div class="field-row">
							<KtFieldText
								formKey="placeholder"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.placeholder"
								isOptional
								label="placeholder"
							/>
							<KtFieldText
								v-if="isRangeComponent"
								formKey="placeholder2"
								helpText="On range components, placeholder is an array of two strings"
								:isDisabled="!componentDefinition.supports.placeholder"
								isOptional
								label="placeholder2"
							/>
						</div>
						<h4>Decoration</h4>
						<div class="field-row">
							<KtFieldText
								formKey="prefix"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="prefix"
							/>
							<KtFieldText
								formKey="suffix"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="suffix"
							/>
						</div>
						<div class="field-row">
							<KtFieldSingleSelect
								formKey="leftIcon"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="leftIcon"
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
							<KtFieldSingleSelect
								formKey="rightIcon"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="rightIcon"
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
						</div>
						<KtFormControllerObject
							v-if="componentDefinition.additionalProps.length > 0"
							formKey="additionalProps"
						>
							<h4>Additional Props</h4>
							<KtFieldToggle
								v-if="componentDefinition.additionalProps.includes('actions')"
								formKey="hasActions"
								helpText="List of actions that can be triggered from the end of the dropdown"
								isOptional
								label="actions"
								type="switch"
							/>
							<KtFieldSingleSelect
								v-if="
									componentDefinition.additionalProps.includes('autoComplete')
								"
								formKey="autoComplete"
								label="autoComplete"
								:options="[
									{ label: 'current-password', value: 'current-password' },
									{ label: 'new-password', value: 'new-password' },
								]"
							/>
							<KtFieldNumber
								v-if="
									componentDefinition.additionalProps.includes(
										'collapseTagsAfter',
									)
								"
								formKey="collapseTagsAfter"
								isOptional
								label="collapseTagsAfter"
								:minimum="0"
							/>
							<KtFieldSingleSelect
								v-if="
									componentDefinition.additionalProps.includes('toggleType')
								"
								formKey="toggleType"
								isOptional
								label="type"
								:options="[
									{ label: 'checkbox (Default)', value: 'checkbox' },
									{ label: 'switch', value: 'switch' },
								]"
							/>
							<div
								v-if="
									componentDefinition.additionalProps.includes('numberMaximum')
								"
								class="field-row"
							>
								<KtFieldNumber
									formKey="numberMaximum"
									isOptional
									label="maximum"
								/>
								<KtFieldNumber
									formKey="numberMinimum"
									isOptional
									label="minimum"
								/>
							</div>
							<div
								v-if="
									componentDefinition.additionalProps.includes(
										'numberHideMaximum',
									)
								"
								class="field-row"
							>
								<KtFieldToggle
									formKey="numberHideMaximum"
									isOptional
									label="hideMaximum"
									type="switch"
								/>
								<KtFieldNumber formKey="numberStep" isOptional label="step" />
							</div>
							<div
								v-if="
									componentDefinition.additionalProps.includes(
										'numberHideChangeButtons',
									)
								"
								class="field-row"
							>
								<KtFieldToggle
									formKey="numberHideChangeButtons"
									isOptional
									label="hideChangeButtons"
									type="switch"
								/>
								<KtFieldNumber
									formKey="numberDecimalPlaces"
									isOptional
									label="decimalPlaces"
									:minimum="0"
								/>
							</div>
							<KtFieldSingleSelect
								v-if="
									componentDefinition.additionalProps.includes(
										'currencyCurrency',
									)
								"
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
								v-if="
									componentDefinition.additionalProps.includes(
										'isLoadingOptions',
									)
								"
								formKey="isLoadingOptions"
								isOptional
								label="isLoadingOptions"
								type="switch"
							/>
							<KtFieldToggle
								v-if="
									componentDefinition.additionalProps.includes('isUnsorted')
								"
								formKey="isUnsorted"
								isOptional
								label="isUnsorted"
								type="switch"
							/>
							<KtFieldDate
								v-if="
									componentDefinition.additionalProps.includes('maximumDate')
								"
								formKey="maximumDate"
								isOptional
								label="maximumDate"
							/>
							<KtFieldNumber
								v-if="
									componentDefinition.additionalProps.includes(
										'maximumSelectable',
									)
								"
								formKey="maximumSelectable"
								helpText="Limits the amount of choices a user can select at the same time."
								isOptional
								label="maximumSelectable"
							/>
							<KtFieldDate
								v-if="
									componentDefinition.additionalProps.includes('minimumDate')
								"
								formKey="minimumDate"
								isOptional
								label="minimumDate"
							/>
							<KtFieldToggle
								v-if="
									componentDefinition.additionalProps.includes('hasOptionSlot')
								"
								formKey="hasOptionSlot"
								isOptional
								label="option slot"
								type="switch"
							/>
							<KtFieldToggle
								v-if="
									componentDefinition.additionalProps.includes('clearOnSelect')
								"
								formKey="clearOnSelect"
								isOptional
								label="clearOnSelect"
								type="switch"
							/>
							<h4>Additional Slots</h4>
							<KtFieldText
								v-if="
									componentDefinition.additionalProps.includes('defaultSlot')
								"
								formKey="defaultSlot"
								isOptional
								label="Slot for the label in a toggle"
								size="small"
							/>
							<KtFieldText
								v-if="
									componentDefinition.additionalProps.includes('contentSlot')
								"
								formKey="contentSlot"
								isOptional
								label="Slot for the sub-text of a radio/toggle group option"
								size="small"
							/>
							<KtFieldText
								v-if="
									componentDefinition.additionalProps.includes('headerSlot')
								"
								formKey="headerSlot"
								isOptional
								label="Slot for the header of a radio/toggle group option"
								size="small"
							>
								<template #helpText>
									The content in here will be put into the radio/toggle option's
									<code>label</code> block.
								</template>
							</KtFieldText>
							<KtFieldToggle
								v-if="
									componentDefinition.additionalProps.includes(
										'showHeaderSideSlot',
									)
								"
								formKey="showHeaderSideSlot"
								isOptional
								type="switch"
							>
								<template #default>
									Show header-side slot of a radio/toggle group option
								</template>
								<template #helpText>
									The content in here will be put outside the radio/toggle
									option's
									<code>label</code> block. and can therefore contain
									interactive elements like buttons or links
								</template>
							</KtFieldToggle>
						</KtFormControllerObject>
					</div>
				</div>
			</KtForm>
			<KtForm v-if="savedFieldsMap.length > 0" v-model="values">
				<h3>Saved Fields</h3>
				<div
					v-for="(savedField, index) in savedFieldsMap"
					:key="index"
					class="overview"
				>
					<div class="overview__component">
						<component
							:is="savedField.name"
							v-bind="savedField.props"
							:actions="savedField.actions"
							:validator="savedField.validator"
						>
							<div
								v-if="savedField.headerSlot !== null"
								slot="header"
								v-text="savedField.headerSlot"
							/>
							<div v-if="savedField.hasHelpTextSlot" slot="helpText">
								<div>
									Supports
									<abbr title="Hypertext Markup Language">HTML</abbr> via
									<code>&lt;template v-slot:helpText&gt;</code>
								</div>
							</div>
							<div
								v-if="savedField.contentSlot !== null"
								slot="content"
								v-text="savedField.contentSlot"
							/>
							<div slot="default">
								<div>Default Slot</div>
							</div>
						</component>
						<KtButton
							label="Remove"
							type="danger"
							@click="savedFieldsRemove(index)"
						/>
					</div>
					<div class="overview__code">
						<pre v-text="savedField.code" />
					</div>
				</div>
			</KtForm>
		</KtI18nContext>
	</div>
</template>

<script lang="ts">
import {
	Kotti,
	KtFieldCurrency,
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
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
import { TimeConversion } from '@metatypes/units'
import { defineComponent, ref, computed } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import {
	createActions,
	ComponentValue,
	ComponentNames,
	generateComponentCode,
} from '../../utilities'

import ComponentInfo from '~/components/ComponentInfo.vue'

const LOCALSTORAGE_SAVED_COMPONENTS_KEY =
	'kotti-documentation-form-fields-saved-components'

const saveSavedFieldsToLocalStorage = (savedFields: Array<unknown>) => {
	try {
		if (typeof window !== 'undefined' && window.document)
			window.localStorage.setItem(
				LOCALSTORAGE_SAVED_COMPONENTS_KEY,
				JSON.stringify(savedFields),
			)
	} catch (error) {
		// eslint-disable-next-line no-console
		console.warn('could not save to localStorage')
	}
}

const DATE_ADDITIONAL_PROPS = ['maximumDate', 'minimumDate']

const components: Array<{
	additionalProps: Array<string>
	formKey: string
	name: string
	supports: Kotti.Field.Supports
}> = [
	{
		additionalProps: ['currencyCurrency', 'numberMaximum', 'numberMinimum'],
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
			'actions',
			'clearOnSelect',
			'collapseTagsAfter',
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
		additionalProps: ['autoComplete'],
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
		additionalProps: ['actions', 'hasOptionSlot', 'isUnsorted'],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelect',
		supports: KtFieldSingleSelect.meta.supports,
	},
	{
		additionalProps: [
			'actions',
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
		additionalProps: [],
		formKey: 'textValue',
		name: 'KtFieldText',
		supports: KtFieldText.meta.supports,
	},
	{
		additionalProps: [],
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

const INITIAL_VALUES: {
	currencyValue: Kotti.FieldCurrency.Value
	dateRangeValue: Kotti.FieldDateRange.Value
	dateTimeRangeValue: Kotti.FieldDateRange.Value
	dateTimeValue: Kotti.FieldDateTime.Value
	dateValue: Kotti.FieldDate.Value
	multiSelectValue: Kotti.FieldMultiSelect.Value
	numberValue: Kotti.FieldNumber.Value
	singleSelectValue: Kotti.FieldSingleSelect.Value
	textValue: Kotti.FieldText.Value
	toggleGroupValue: Kotti.FieldToggleGroup.Value
	toggleValue: Kotti.FieldToggle.Value
} = {
	currencyValue: null,
	dateRangeValue: [null, null],
	dateTimeRangeValue: [null, null],
	dateTimeValue: null,
	dateValue: null,
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
}

type componentRepresentation = ComponentValue & {
	actions?: Array<Record<string, unknown>>
	code: string
	validator: Kotti.Field.Validation.Function
}

const createValidator =
	(validation: Kotti.Field.Validation.Result['type']) =>
	(): Kotti.Field.Validation.Result =>
		validation === 'empty'
			? { type: 'empty' }
			: {
					text: `Some Validation Text`,
					type: validation,
			  }

const radioGroupOptions: Kotti.FieldRadioGroup.Props['options'] = [
	{ dataTest: 'data-test-key-1', label: 'Key 1', value: 'value1' },
	{
		dataTest: 'data-test-key-2',
		label: 'Key 2',
		value: 'value2',
		tooltip: 'Some tooltip',
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
		value: 'value4',
		tooltip: 'This option has a long label',
	},
]

const singleOrMultiSelectOptions: Kotti.FieldSingleSelect.Props['options'] = [
	{ label: 'Key 2', value: 'value2' },
	{ label: 'Key 1', value: 'value1' },
	{ isDisabled: true, label: 'Key 3', value: 'value3' },
	{ label: 'Key 7', value: 'value7' },
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
		tooltip: 'A tooltip!',
		label: 'Disabled',
	},

	{
		key: 'hasLongLabel',
		tooltip: 'A tooltip!',
		label:
			'Long Label: Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.',
	},
]

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFormFields',
	components: {
		ComponentInfo,
	},
	setup() {
		const values = ref<typeof INITIAL_VALUES>(INITIAL_VALUES)

		const remoteSingleSelectQuery =
			ref<Kotti.FieldSingleSelectRemote.Props['query']>(null)

		const settings = ref<{
			additionalProps: {
				autoComplete: 'current-password' | 'new-password'
				clearOnSelect: Kotti.FieldToggle.Value
				collapseTagsAfter: Kotti.FieldNumber.Value
				contentSlot: ComponentValue['contentSlot']
				currencyCurrency: string
				defaultSlot: ComponentValue['defaultSlot']
				hasActions: boolean
				hasOptionSlot: boolean
				headerSlot: ComponentValue['headerSlot']
				hideChangeButtons: boolean
				isInline: boolean
				isLoadingOptions: boolean
				isUnsorted: boolean
				maximumDate: Kotti.FieldDate.Value
				maximumSelectable: Kotti.FieldNumber.Value
				minimumDate: Kotti.FieldDate.Value
				numberDecimalPlaces: Kotti.FieldNumber.Value
				numberHideChangeButtons: boolean
				numberHideMaximum: boolean
				numberMaximum: Kotti.FieldNumber.Value
				numberMinimum: Kotti.FieldNumber.Value
				numberStep: Kotti.FieldNumber.Value
				showHeaderSideSlot: ComponentValue['showHeaderSideSlot']
				toggleType: 'checkbox' | 'switch'
			}
			booleanFlags: {
				hideClear: Kotti.FieldToggle.Value
				hideValidation: Kotti.FieldToggle.Value
				isDisabled: Kotti.FieldToggle.Value
				isLoading: Kotti.FieldToggle.Value
				isOptional: Kotti.FieldToggle.Value
			}
			component: ComponentNames
			dataTest: Kotti.FieldText.Value
			decimalSeparator: Kotti.DecimalSeparator
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
				autoComplete: 'current-password',
				clearOnSelect: false,
				collapseTagsAfter: null,
				contentSlot: null,
				currencyCurrency: 'USD',
				defaultSlot: 'Default Slot',
				hasActions: false,
				hasOptionSlot: false,
				headerSlot: null,
				hideChangeButtons: false,
				isInline: false,
				isLoadingOptions: false,
				isUnsorted: false,
				maximumDate: null,
				maximumSelectable: null,
				minimumDate: null,
				numberDecimalPlaces: null,
				numberHideChangeButtons: false,
				numberHideMaximum: false,
				numberMaximum: null,
				numberMinimum: null,
				numberStep: null,
				showHeaderSideSlot: false,
				toggleType: 'checkbox',
			},
			booleanFlags: {
				hideClear: false,
				hideValidation: false,
				isDisabled: false,
				isLoading: false,
				isOptional: true,
			},
			component: 'KtFieldText',
			dataTest: null,
			decimalSeparator: Kotti.DecimalSeparator.DOT,
			hasHelpTextSlot: false,
			helpDescription: null,
			helpText: null,
			formId: null,
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
			const { component } = settings.value

			const standardProps = {
				dataTest: settings.value.dataTest,
				formKey: componentDefinition.value.formKey,
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

			if (
				componentDefinition.value.additionalProps.includes('toggleType') &&
				settings.value.additionalProps.toggleType !== 'checkbox' // Exclude Default Value
			)
				Object.assign(additionalProps, {
					type: settings.value.additionalProps.toggleType,
				})

			if (componentDefinition.value.additionalProps.includes('autoComplete'))
				Object.assign(additionalProps, {
					autoComplete: settings.value.additionalProps.autoComplete,
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

			if (
				[
					'KtFieldMultiSelect',
					'KtFieldMultiSelectRemote',
					'KtFieldSingleSelect',
					'KtFieldSingleSelectRemote',
				].includes(component)
			) {
				const options = (
					['KtFieldMultiSelectRemote', 'KtFieldSingleSelectRemote'].includes(
						component,
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
					dataTest: index % 2 === 0 ? `${String(option.value)}` : undefined,
				}))

				Object.assign(additionalProps, {
					options,
				})
			}

			if (
				['KtFieldMultiSelectRemote', 'KtFieldSingleSelectRemote'].includes(
					component,
				)
			) {
				Object.assign(additionalProps, { query: remoteSingleSelectQuery.value })
			}

			if (['KtFieldRadioGroup'].includes(component)) {
				Object.assign(additionalProps, {
					contentSlot: null,
					headerSlot: null,
					options: radioGroupOptions,
					showHeaderSideSlot: false,
				})
			}

			if (['KtFieldToggle'].includes(component))
				Object.assign(additionalProps, {
					defaultSlot: 'Default Slot',
				})

			if (['KtFieldToggleGroup'].includes(component))
				Object.assign(additionalProps, {
					contentSlot: null,
					headerSlot: null,
					options: toggleGroupOptions,
				})

			return { ...standardProps, ...additionalProps }
		})

		const savedFields = ref<ComponentValue[]>(
			(() => {
				try {
					if (typeof window !== 'undefined' && window.document) {
						const value = window.localStorage.getItem(
							LOCALSTORAGE_SAVED_COMPONENTS_KEY,
						)
						if (value) return JSON.parse(value)
					}
				} catch (error) {
					// eslint-disable-next-line no-console
					console.warn('could not read localStorage')
				}
				return []
			})(),
		)

		const componentValue = computed(
			(): ComponentValue => ({
				contentSlot: settings.value.additionalProps.contentSlot,
				defaultSlot: settings.value.additionalProps.defaultSlot,
				hasActions: settings.value.additionalProps.hasActions,
				hasHelpTextSlot: settings.value.hasHelpTextSlot,
				hasOptionSlot: settings.value.additionalProps.hasOptionSlot,
				headerSlot: settings.value.additionalProps.headerSlot,
				name: settings.value.component,
				props: cloneDeep(componentProps.value),
				showHeaderSideSlot: settings.value.additionalProps.showHeaderSideSlot,
				validation: settings.value.validation,
			}),
		)
		return {
			component: computed(
				(): { meta: Kotti.Meta; name: string } =>
					({
						KtFieldCurrency,
						KtFieldDate,
						KtFieldDateRange,
						KtFieldDateTime,
						KtFieldDateTimeRange,
						KtFieldNumber,
						KtFieldMultiSelect,
						KtFieldMultiSelectRemote,
						KtFieldPassword,
						KtFieldRadioGroup,
						KtFieldSingleSelect,
						KtFieldSingleSelectRemote,
						KtFieldText,
						KtFieldTextArea,
						KtFieldToggle,
						KtFieldToggleGroup,
					}[componentValue.value.name as Exclude<ComponentNames, 'KtFilters'>]),
			),
			componentDefinition,
			componentOptions: components.map((component) => ({
				label: component.name,
				value: component.name,
			})),
			componentProps,
			componentRepresentation: computed(
				(): componentRepresentation => ({
					...componentValue.value,
					actions: createActions(componentValue.value.hasActions),
					code: generateComponentCode(componentValue.value),
					validator: createValidator(componentValue.value.validation),
				}),
			),
			decimalSeparatorOptions: Object.entries(Kotti.DecimalSeparator).map(
				([key, value]) => ({
					label: `Kotti.DecimalSeparator.${key}`,
					value,
				}),
			),
			isRangeComponent,
			onSubmit: (values: Record<string, unknown>) =>
				window.alert(`@submit: ${JSON.stringify(values, null, '\t')}`),
			reset: () => {
				values.value = INITIAL_VALUES
			},
			savedFieldsMap: computed(() =>
				savedFields.value.map(
					(component): componentRepresentation => ({
						...component,
						actions: createActions(component.hasActions),
						code: generateComponentCode(component),
						validator: createValidator(component.validation),
					}),
				),
			),
			savedFieldsAdd: () => {
				savedFields.value = [
					...savedFields.value,
					cloneDeep(componentValue.value),
				]
				saveSavedFieldsToLocalStorage(savedFields.value)
			},
			savedFieldsRemove: (toRemove: number) => {
				savedFields.value = savedFields.value.filter(
					(_, index) => index !== toRemove,
				)
				saveSavedFieldsToLocalStorage(savedFields.value)
			},
			settings,
			updateQuery: (
				newQuery: Kotti.FieldSingleSelectRemote.Events.UpdateQuery,
			) => {
				remoteSingleSelectQuery.value = newQuery
				settings.value.additionalProps = {
					...settings.value.additionalProps,
					isLoadingOptions: true,
				}
				setTimeout(() => {
					settings.value.additionalProps = {
						...settings.value.additionalProps,
						isLoadingOptions: false,
					}
				}, TimeConversion.MILLISECONDS_PER_SECOND)
			},
			values,
			yocoIconOptions: Object.values(Yoco.Icon).map((icon) => ({
				label: icon,
				value: icon,
			})),
		}
	},
})
</script>

<style src="../styles/form-fields.scss" lang="scss" scoped />
