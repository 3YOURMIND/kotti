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
							:validator="componentRepresentation.validator"
							@blur="onBlur"
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
					<div class="overview__component-value">
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
							formKey="NONE"
							hideClear
							label="Component"
							:options="componentOptions"
							:value="settings.component"
							@input="updateComponent"
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
						<div
							v-if="componentDefinition.additionalProps.includes('emitEvents')"
						>
							<h4>Actions</h4>
							<KtFieldToggle
								formKey="emitBlur"
								helpText="Only works with KtFieldNumber for now"
								isOptional
								label="Blur"
								type="switch"
							/>
						</div>
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
								v-if="componentHasActionsToggle"
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
									:isDisabled="!settings.additionalProps.autoSize"
									isOptional
									label="maxHeight"
								/>
							</div>
							<KtFieldToggle
								v-if="
									componentDefinition.additionalProps.includes('hideDropArea')
								"
								formKey="hideDropArea"
								isOptional
								label="hideDropArea"
								type="switch"
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
							<KtFieldToggleGroup
								v-if="componentDefinition.additionalProps.includes('shortcuts')"
								formKey="shortcuts"
								helpText="Add keepOpen to keep pop-up open on selection (see code sample for details)"
								isOptional
								label="shortcuts"
								:options="getShortcutsOptions(settings.component)"
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
							<KtFieldToggle
								v-if="
									componentDefinition.additionalProps.includes('allowMultiple')
								"
								formKey="allowMultiple"
								helpText="Allows selecting more than one file"
								isOptional
								label="allowMultiple"
								type="switch"
							/>
							<KtFieldToggle
								v-if="
									componentDefinition.additionalProps.includes('allowPhotos')
								"
								formKey="allowPhotos"
								helpText="Allows taking photos with the device's camera. Photos are saved with .png extension."
								isOptional
								label="allowPhotos"
								type="switch"
							/>
							<KtFieldNumber
								v-if="
									componentDefinition.additionalProps.includes(
										'collapseExtensionsAfter',
									)
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
								v-if="
									componentDefinition.additionalProps.includes('extensions')
								"
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
								v-if="
									componentDefinition.additionalProps.includes('externalUrl')
								"
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
								v-if="
									componentDefinition.additionalProps.includes('maxFileSize')
								"
								:decimalPlaces="0"
								formKey="maxFileSize"
								helpText="The maximum file size allowed in bytes (in decimal base)"
								isOptional
								label="maxFileSize"
								:minimum="1"
								:step="1"
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
	KtFieldFileUpload,
	KtFieldFileUploadRemote,
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
import { computed, defineComponent, ref } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import { useRouter } from '../../../hooks/use-router'
import {
	getLast,
	today,
	ISO8601,
	ISO8601_SECONDS,
} from '../../../utilities/date'
import {
	createActions,
	createRemoteUpload,
	ComponentValue,
	ComponentNames,
	generateComponentCode,
	isComponentName,
} from '../../../utilities/pages'

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

const DATE_ADDITIONAL_PROPS = ['maximumDate', 'minimumDate', 'shortcuts']
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
		additionalProps: [...FILE_UPLOAD_SHARED_PROPS],
		formKey: 'fileUploadValue',
		name: 'KtFieldFileUpload',
		supports: KtFieldFileUpload.meta.supports,
	},
	{
		additionalProps: [...FILE_UPLOAD_SHARED_PROPS, 'actions', 'payload'],
		formKey: 'fileUploadRemoteValue',
		name: 'KtFieldFileUploadRemote',
		supports: KtFieldFileUploadRemote.meta.supports,
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
			'emitEvents',
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
		additionalProps: ['autoSize', 'maxHeight', 'rows'],
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
	fileUploadValue: Kotti.FieldFileUpload.Value
	fileUploadRemoteValue: Kotti.FieldFileUploadRemote.Value
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
	fileUploadValue: [],
	fileUploadRemoteValue: [],
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

const getShortcuts = (
	component: ComponentNames,
): Record<
	string,
	{
		keepOpen?: boolean
		label: string
		value: string | [string, string]
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
		today: {
			keepOpen: true,
			label: 'Today',
			value: isRange ? [todayDate, todayDate] : todayDate,
		},
		lastWeek: {
			label: 'Last Week',
			value: isRange
				? [getLast('week', templateFormat), todayDate]
				: getLast('week', templateFormat),
		},
		lastMonth: {
			label: 'Last Month',
			value: isRange
				? [getLast('month', templateFormat), todayDate]
				: getLast('month', templateFormat),
		},
		lastYear: {
			label: 'Last Year',
			value: isRange
				? [getLast('year', templateFormat), todayDate]
				: getLast('year', templateFormat),
		},
	}
}

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFormFields',
	components: {
		ComponentInfo,
	},
	setup() {
		const values = ref<typeof INITIAL_VALUES>(INITIAL_VALUES)
		const router = useRouter()

		const initialComponentName = (() => {
			const { component } = router.value.currentRoute.query
			return isComponentName(component) ? component : null
		})()

		const remoteSingleSelectQuery =
			ref<Kotti.FieldSingleSelectRemote.Props['query']>(null)

		const settings = ref<{
			additionalProps: {
				allowMultiple: Kotti.FieldToggle.Value
				allowPhotos: Kotti.FieldToggle.Value
				autoComplete: 'current-password' | 'new-password'
				autoSize: Kotti.FieldToggle.Value
				clearOnSelect: Kotti.FieldToggle.Value
				collapseExtensionsAfter: Kotti.FieldNumber.Value
				collapseTagsAfter: Kotti.FieldNumber.Value
				contentSlot: ComponentValue['contentSlot']
				currencyCurrency: string
				defaultSlot: ComponentValue['defaultSlot']
				emitEvents: boolean
				extensions: Kotti.FieldMultiSelect.Value
				externalUrl: Kotti.FieldText.Value
				hasActions: boolean
				hasOptionSlot: boolean
				headerSlot: ComponentValue['headerSlot']
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
				numberDecimalPlaces: Kotti.FieldNumber.Value
				numberHideChangeButtons: boolean
				numberHideMaximum: boolean
				numberMaximum: Kotti.FieldNumber.Value
				numberMinimum: Kotti.FieldNumber.Value
				numberStep: Kotti.FieldNumber.Value
				rows: Kotti.FieldNumber.Value
				shortcuts: Kotti.FieldToggleGroup.Value
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
			emitBlur: boolean
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
				autoComplete: 'current-password',
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
				numberDecimalPlaces: null,
				numberHideChangeButtons: false,
				numberHideMaximum: false,
				numberMaximum: null,
				numberMinimum: null,
				numberStep: null,
				rows: null,
				shortcuts: null,
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
			component: initialComponentName ?? 'KtFieldText',
			dataTest: null,
			decimalSeparator: Kotti.DecimalSeparator.DOT,
			emitBlur: false,
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
			if (componentDefinition.value.additionalProps.includes('autoSize')) {
				Object.assign(additionalProps, {
					autoSize: settings.value.additionalProps.autoSize,
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

			if (componentDefinition.value.additionalProps.includes('shortcuts'))
				Object.assign(additionalProps, {
					shortcuts: Object.entries(
						settings.value.additionalProps.shortcuts ?? {},
					)
						.filter(([_, value]) => value)
						.map(([key]) => {
							const shortcuts = getShortcuts(component)
							const { keepOpen, label, value } =
								shortcuts[key as keyof typeof shortcuts]
							return { keepOpen, label, value }
						}),
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

			if (['KtFieldFileUploadRemote'].includes(component))
				Object.assign(additionalProps, createRemoteUpload(true))
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

			if (hasActions.value)
				Object.assign(additionalProps, { actions: createActions(true) })

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

		const componentHasActionsToggle = computed(() =>
			[
				'KtFieldMultiSelect',
				'KtFieldMultiSelectRemote',
				'KtFieldSingleSelect',
				'KtFieldSingleSelectRemote',
			].includes(settings.value.component),
		)
		const hasActions = computed(
			() =>
				componentHasActionsToggle.value &&
				settings.value.additionalProps.hasActions,
		)

		const componentValue = computed(
			(): ComponentValue => ({
				contentSlot: settings.value.additionalProps.contentSlot,
				defaultSlot: settings.value.additionalProps.defaultSlot,
				hasActions: hasActions.value,
				hasHelpTextSlot: settings.value.hasHelpTextSlot,
				hasRemoteUpload: settings.value.component === 'KtFieldFileUploadRemote',
				hasOptionSlot: settings.value.additionalProps.hasOptionSlot,
				headerSlot: settings.value.additionalProps.headerSlot,
				name: settings.value.component,
				props: cloneDeep(componentProps.value),
				showHeaderSideSlot: settings.value.additionalProps.showHeaderSideSlot,
				validation: settings.value.validation,
			}),
		)
		const componentRepresentation = computed(
			(): componentRepresentation => ({
				...componentValue.value,
				code: generateComponentCode(componentValue.value),
				validator: createValidator(componentValue.value.validation),
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
						KtFieldFileUpload,
						KtFieldFileUploadRemote,
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
					})[
						componentValue.value.name as Exclude<
							ComponentNames,
							'KtFilters' | 'KtValueLabel'
						>
					],
			),
			componentDefinition,
			componentHasActionsToggle,
			componentOptions: components.map((component) => ({
				label: component.name,
				value: component.name,
			})),
			componentProps,
			componentRepresentation,
			decimalSeparatorOptions: Object.entries(Kotti.DecimalSeparator).map(
				([key, value]) => ({
					label: `Kotti.DecimalSeparator.${key}`,
					value,
				}),
			),
			getShortcutsOptions: (
				component: ComponentNames,
			): Kotti.FieldToggleGroup.Props['options'] =>
				Object.entries(getShortcuts(component)).map(([key, value]) => ({
					key,
					label: value.label,
				})),
			isRangeComponent,
			onBlur: (value: number) => {
				if (settings.value.emitBlur) window.alert(`@blur: ${value}`)
			},
			onSubmit: (values: Record<string, unknown>) =>
				window.alert(`@submit: ${JSON.stringify(values, null, '\t')}`),
			reset: () => {
				values.value = INITIAL_VALUES
			},
			savedFieldsMap: computed(() =>
				savedFields.value.map(
					(component): componentRepresentation => ({
						...component,
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
			updateComponent: (component: ComponentNames) => {
				router.value.replace({ query: { component } })
				settings.value = {
					...settings.value,
					component,
				}
			},
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

<style src="../../../styles/form-fields.scss" lang="scss" scoped />
