<template lang="md">
<ComponentInfo v-bind="{ component }" />

<KtTranslationContext :locale="settings.locale">
	<div class="overview">
		<div class="overview__component">
			<h4>Component</h4>
			<KtForm v-model="values">
				<component
					:is="componentRepresenation.name"
					:validator="componentRepresenation.validator"
					v-bind="componentRepresenation.props"
					@update:query="updateQuery"
				>
					<div slot="helpText" v-if="componentRepresenation.hasHelpTextSlot">
						<div>
							Supports <abbr title="Hypertext Markup Language">HTML</abbr> via <code>&lt;template v-slot:helpText&gt;</code>
						</div>
					</div>
					<div slot="default">
						Default Slot
					</div>
				</component>
			</KtForm>
			<div class="overview__component__value">
				<strong>Value</strong>: <span v-text="JSON.stringify(values[componentProps.formKey])"/> <a @click.prevent="reset">reset</a>
			</div>
		</div>
		<div class="overview__code">
			<h4>Code</h4>
			<pre v-text="componentRepresenation.code" />
			<button @click="savedFieldsAdd" type="button">Save to LocalStorage</button>
		</div>
	</div>
	<KtForm v-model="settings">
		<div class="wrapper">
			<div>
				<h4>Settings</h4>
				<KtFieldSingleSelect
					formKey="component"
					hideClear
					label="Component"
					:options="componentOptions"
					size="small"
				/>
				<KtFieldSingleSelect
					formKey="locale"
					hideClear
					helpText="Can be set via KtTranslationContext"
					label="Language"
					leftIcon="global"
					:options="[
						{ label: 'German (de-DE)', value: 'de-DE' },
						{ label: 'English (en-US)', value: 'en-US' },
						{ label: 'Spanish (es-ES)', value: 'es-ES' },
						{ label: 'French (fr-FR)', value: 'fr-FR' },
						{ label: 'Japanese (ja-JP)', value: 'ja-JP' },
					]"
					size="small"
				/>
				<KtFieldSingleSelect
					formKey="size"
					hideClear
					isOptional
					label="Size"
					:options="[
						{ label: 'Small', value: 'small' },
						{ label: 'Medium (Default)', value: 'medium' },
						{ label: 'Large', value: 'large' }
					]"
					size="small"
				/>
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
					size="small"
				>
					<div slot="helpText">
						Passed as a validation function:
						<code>() => ({ type: 'error', message: '' })</code>
						or via
						<code>KtForm.validators</code>
						or via
						<code>validatorKey</code>
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
							tooltip: 'Support Varies'
						},
						{ key: 'hideValidation', label: 'hideValidation' },
						{ key: 'isDisabled', label: 'isDisabled' },
						{ key: 'isLoading', label: 'isLoading' },
						{ key: 'isOptional', label: 'isOptional' },
					]"
					type="switch"
					size="small"
				/>
				<KtFormControllerObject formKey="additionalProps" v-if="componentDefinition.additionalProps.length > 0">
					<h4>Additional Props</h4>
					<KtFieldToggle
						v-if="componentDefinition.additionalProps.includes('actions')"
						formKey="actions"
						isOptional
						helpText="List of actions that can be triggered from the end of the dropdown"
						label="actions"
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
						size="small"
					/>
					<div class="field-row" v-if="componentDefinition.additionalProps.includes('numberMaximum')">
						<KtFieldNumber
							formKey="numberMaximum"
							isOptional
							label="maximum"
							size="small"
						/>
						<KtFieldNumber
							formKey="numberMinimum"
							isOptional
							label="minimum"
							size="small"
						/>
					</div>
					<div class="field-row" v-if="componentDefinition.additionalProps.includes('numberHideMaximum')">
						<KtFieldToggle
							formKey="numberHideMaximum"
							isOptional
							label="hideMaximum"
							size="small"
							type="switch"
						/>
						<KtFieldNumber
							formKey="step"
							isOptional
							label="step"
							size="small"
						/>
					</div>
					<KtFieldToggle
						v-if="componentDefinition.additionalProps.includes('hideChangeButtons')"
						formKey="hideChangeButtons"
						isOptional
						label="hideChangeButtons"
						size="small"
						type="switch"
					/>
					<KtFieldToggle
						v-if="componentDefinition.additionalProps.includes('isInline')"
						formKey="isInline"
						isOptional
						label="isInline"
						size="small"
						type="switch"
					/>
					<KtFieldDate
						v-if="componentDefinition.additionalProps.includes('maximumDate')"
						formKey="maximumDate"
						isOptional
						label="maximumDate"
						size="small"
					/>
					<KtFieldDate
						v-if="componentDefinition.additionalProps.includes('minimumDate')"
						formKey="minimumDate"
						isOptional
						label="minimumDate"
						size="small"
					/>
					<KtFieldNumber
						v-if="componentDefinition.additionalProps.includes('collapseTagsAfter')"
						formKey="collapseTagsAfter"
						isOptional
						label="collapseTagsAfter"
						:minimum="0"
						size="small"
					/>
					<KtFieldSingleSelect
						v-if="componentDefinition.additionalProps.includes('autoComplete')"
						formKey="autoComplete"
						label="autoComplete"
						:options="[
							{ label: 'current-password', value: 'current-password' },
							{ label: 'new-password', value: 'new-password' }
						]"
						size="small"
					/>
				</KtFormControllerObject>
			</div>
			<div>
				<h4>Texts</h4>
				<KtFieldText formKey="label" isOptional label="label" size="small" />
				<KtFieldText formKey="helpDescription" isOptional label="helpDescription" size="small" />
				<div class="field-row">
					<KtFieldText
						formKey="helpText"
						:helpText="settings.hasHelpTextSlot ? 'Not supported when using a #helpText slot' : null"
						:isDisabled="settings.hasHelpTextSlot"
						isOptional
						label="helpText"
						size="small"
					/>
					<KtFieldToggle type="switch" formKey="hasHelpTextSlot" isOptional label="Use #helpText Slot" size="small" />
				</div>
				<KtFieldText formKey="placeholder" isOptional label="placeholder" size="small" helpText="Support Varies" />
				<h4>Decoration</h4>
				<div class="field-row">
					<KtFieldText
						formKey="prefix"
						:isDisabled="!componentDefinition.supports.decoration"
						isOptional
						label="prefix"
						size="small"
						helpText="Support Varies"
					/>
					<KtFieldText
						formKey="suffix"
						:isDisabled="!componentDefinition.supports.decoration"
						isOptional
						label="suffix"
						size="small"
						helpText="Support Varies"
					/>
				</div>
				<div class="field-row">
					<KtFieldSingleSelect
						formKey="leftIcon"
						:isDisabled="!componentDefinition.supports.decoration"
						isOptional
						label="leftIcon"
						:options="yocoIconOptions"
						size="small"
						helpText="Support Varies"
					/>
					<KtFieldSingleSelect
						formKey="rightIcon"
						:isDisabled="!componentDefinition.supports.decoration"
						isOptional
						label="rightIcon"
						:options="yocoIconOptions"
						size="small"
						helpText="Support Varies"
					/>
				</div>
			</div>
		</div>
		<KtForm v-model="values" v-if="savedFieldsMap.length > 0">
			<h3>Saved Fields</h3>
			<div v-for="(savedField, index) in savedFieldsMap" class="overview" :key="index">
				<div class="overview__component">
					<component
						:is="savedField.name"
						:validator="savedField.validator"
						v-bind="savedField.props"
					>
						<div slot="helpText" v-if="savedField.hasHelpTextSlot">
							<div>
								Supports <abbr title="Hypertext Markup Language">HTML</abbr> via <code>&lt;template v-slot:helpText&gt;</code>
							</div>
						</div>
						<div slot="default">
							<div>
								Default Slot
							</div>
						</div>
					</component>
					<button @click="savedFieldsRemove(index)" type="button">Remove</button>
				</div>
				<div class="overview__code">
					<pre v-text="savedField.code" />
				</div>
			</div>
		</KtForm>
	</KtForm>
</KtTranslationContext>
</template>

<script lang="ts">
import {
	Kotti,
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
	KtFieldMultiSelect,
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
import { defineComponent, ref, computed } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import {
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
		additionalProps: DATE_ADDITIONAL_PROPS,
		formKey: 'dateValue',
		name: 'KtFieldDate',
		supports: { clear: true, decoration: false, tabIndex: false },
	},
	{
		additionalProps: DATE_ADDITIONAL_PROPS,
		formKey: 'dateRangeValue',
		name: 'KtFieldDateRange',
		supports: { clear: true, decoration: false, tabIndex: false },
	},
	{
		additionalProps: DATE_ADDITIONAL_PROPS,
		formKey: 'dateTimeValue',
		name: 'KtFieldDateTime',
		supports: { clear: true, decoration: false, tabIndex: false },
	},
	{
		additionalProps: DATE_ADDITIONAL_PROPS,
		formKey: 'dateTimeRangeValue',
		name: 'KtFieldDateTimeRange',
		supports: { clear: true, decoration: false, tabIndex: false },
	},
	{
		additionalProps: ['collapseTagsAfter', 'actions'],
		formKey: 'multiSelectValue',
		name: 'KtFieldMultiSelect',
		supports: { clear: true, decoration: true, tabIndex: false },
	},
	{
		additionalProps: [
			'hideChangeButtons',
			'numberHideMaximum',
			'numberMaximum',
			'numberMinimum',
			'step',
		],
		formKey: 'numberValue',
		name: 'KtFieldNumber',
		supports: { clear: false, decoration: true, tabIndex: true },
	},
	{
		additionalProps: ['autoComplete'],
		formKey: 'textValue',
		name: 'KtFieldPassword',
		supports: { clear: true, decoration: true, tabIndex: true },
	},
	{
		additionalProps: ['isInline'],
		formKey: 'singleSelectValue',
		name: 'KtFieldRadioGroup',
		supports: { clear: false, decoration: false, tabIndex: true },
	},
	{
		additionalProps: ['actions'],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelect',
		supports: { clear: true, decoration: true, tabIndex: false },
	},
	{
		additionalProps: ['queryValue'],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelectRemote',
		supports: { clear: true, decoration: true, tabIndex: false },
	},
	{
		additionalProps: [],
		formKey: 'textValue',
		name: 'KtFieldText',
		supports: { clear: true, decoration: true, tabIndex: true },
	},
	{
		additionalProps: [],
		formKey: 'textValue',
		name: 'KtFieldTextArea',
		supports: { clear: false, decoration: false, tabIndex: true },
	},
	{
		additionalProps: ['toggleType'],
		formKey: 'toggleValue',
		name: 'KtFieldToggle',
		supports: { clear: false, decoration: false, tabIndex: true },
	},
	{
		additionalProps: ['isInline', 'toggleType'],
		formKey: 'toggleGroupValue',
		name: 'KtFieldToggleGroup',
		supports: { clear: false, decoration: false, tabIndex: true },
	},
]

const INITIAL_VALUES: {
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

type ComponentRepresenation = ComponentValue & {
	code: string
	validator: Kotti.Field.Validation.Function
}

const createValidator = (
	validation: Kotti.Field.Validation.Result['type'],
) => (): Kotti.Field.Validation.Result =>
	validation === 'empty'
		? { type: 'empty' }
		: {
				text: `Some Validation Text`,
				type: validation,
		  }

const radioGroupOptions: Kotti.FieldRadioGroup.Props['options'] = [
	{ label: 'Key 1', value: 'value1' },
	{ label: 'Key 2', value: 'value2', tooltip: 'Some tooltip' },
	{
		isDisabled: true,
		label: 'Key 3',
		tooltip: 'This option is disabled',
		value: 'value3',
	},
	{ label: 'Key 4', value: 'value4' },
]

const singleOrMultiSelectOptions: Kotti.FieldSingleSelect.Props['options'] = [
	{ label: 'Key 1', value: 'value1' },
	{ label: 'Key 2', value: 'value2' },
	{ isDisabled: true, label: 'Key 3', value: 'value3' },
	{ label: 'Key 4', value: 'value4' },
]

const toggleGroupOptions: Kotti.FieldToggleGroup.Props['options'] = [
	{ key: 'initiallyFalse', label: 'Initially False' },
	{
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
]

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFormFields',
	components: {
		ComponentInfo,
	},
	setup() {
		const values = ref<typeof INITIAL_VALUES>(INITIAL_VALUES)

		const settings = ref<{
			additionalProps: {
				actions: Kotti.FieldToggle.Value
				autoComplete: 'current-password' | 'new-password'
				collapseTagsAfter: Kotti.FieldNumber.Value
				hideChangeButtons: boolean
				isInline: boolean
				maximumDate: Kotti.FieldDate.Value
				minimumDate: Kotti.FieldDate.Value
				numberHideMaximum: boolean
				numberMaximum: Kotti.FieldNumber.Value
				numberMinimum: Kotti.FieldNumber.Value
				queryValue: Kotti.FieldSingleSelectRemote.Props['queryValue']
				step: Kotti.FieldNumber.Value
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
			hasHelpTextSlot: boolean
			helpDescription: Kotti.FieldText.Value
			helpText: Kotti.FieldText.Value
			label: Kotti.FieldText.Value
			leftIcon: Yoco.Icon | null
			locale: Kotti.Translation.SupportedLanguages
			placeholder: Kotti.FieldText.Value
			prefix: Kotti.FieldText.Value
			rightIcon: Yoco.Icon | null
			size: 'small' | 'medium' | 'large'
			suffix: Kotti.FieldText.Value
			validation: Kotti.Field.Validation.Result['type']
		}>({
			additionalProps: {
				actions: false,
				autoComplete: 'current-password',
				collapseTagsAfter: null,
				hideChangeButtons: false,
				isInline: false,
				maximumDate: null,
				minimumDate: null,
				numberHideMaximum: false,
				numberMaximum: null,
				numberMinimum: null,
				queryValue: null,
				step: null,
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
			hasHelpTextSlot: false,
			helpDescription: null,
			helpText: null,
			label: 'Label',
			leftIcon: null,
			locale: 'en-US',
			placeholder: null,
			prefix: null,
			rightIcon: null,
			size: 'medium',
			suffix: null,
			validation: 'empty',
		})

		const componentDefinition = computed(() => {
			const result = components.find(
				({ name }) => name === settings.value.component,
			)

			if (!result) throw new Error('Invalid Component Name')

			return result
		})

		// eslint-disable-next-line sonarjs/cognitive-complexity
		const componentProps = computed(() => {
			const { component } = settings.value

			const standardProps = {
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

			if (componentDefinition.value.additionalProps.includes('step'))
				Object.assign(additionalProps, {
					step: settings.value.additionalProps.step,
				})

			if (componentDefinition.value.additionalProps.includes('isInline'))
				Object.assign(additionalProps, {
					isInline: settings.value.additionalProps.isInline,
				})

			if (componentDefinition.value.additionalProps.includes('maximumDate'))
				Object.assign(additionalProps, {
					maximumDate: settings.value.additionalProps.maximumDate,
				})

			if (componentDefinition.value.additionalProps.includes('minimumDate'))
				Object.assign(additionalProps, {
					minimumDate: settings.value.additionalProps.minimumDate,
				})

			if (componentDefinition.value.additionalProps.includes('queryValue'))
				Object.assign(additionalProps, {
					queryValue: settings.value.additionalProps.queryValue,
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

			if (
				componentDefinition.value.additionalProps.includes('hideChangeButtons')
			)
				Object.assign(additionalProps, {
					hideChangeButtons: settings.value.additionalProps.hideChangeButtons,
				})

			if (
				[
					'KtFieldMultiSelect',
					'KtFieldSingleSelect',
					'KtFieldSingleSelectRemote',
				].includes(component)
			) {
				Object.assign(additionalProps, {
					options: singleOrMultiSelectOptions,
				})

				if (settings.value.additionalProps.actions)
					Object.assign(additionalProps, {
						actions: [
							{
								label: 'Create Item',
								onClick: () => alert('actions[0].onClick called'),
							},
						],
					})
			}

			if (['KtFieldRadioGroup'].includes(component))
				Object.assign(additionalProps, {
					options: radioGroupOptions,
				})

			if (['KtFieldToggleGroup'].includes(component))
				Object.assign(additionalProps, {
					options: toggleGroupOptions,
				})

			if (
				[
					'KtFieldDate',
					'KtFieldDateTime',
					'KtFieldMultiSelect',
					'KtFieldSingleSelect',
					'KtFieldSingleSelectRemote',
					'KtFieldText',
					'KtFieldTextArea',
				].includes(component)
			)
				Object.assign(additionalProps, {
					placeholder: settings.value.placeholder,
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
				hasHelpTextSlot: settings.value.hasHelpTextSlot,
				name: settings.value.component,
				props: cloneDeep(componentProps.value),
				validation: settings.value.validation,
			}),
		)
		return {
			component: computed(
				(): { meta: Kotti.Meta; name: string } =>
					({
						KtFieldDate,
						KtFieldDateRange,
						KtFieldDateTime,
						KtFieldDateTimeRange,
						KtFieldNumber,
						KtFieldMultiSelect,
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
			componentRepresenation: computed(
				(): ComponentRepresenation => ({
					...componentValue.value,
					code: generateComponentCode(componentValue.value),
					validator: createValidator(componentValue.value.validation),
				}),
			),
			reset: () => {
				values.value = INITIAL_VALUES
			},
			savedFieldsMap: computed(() =>
				savedFields.value.map(
					(component): ComponentRepresenation => ({
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
