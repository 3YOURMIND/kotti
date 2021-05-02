<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<KtI18nContext :locale="settings.locale">
			<div class="overview">
				<div class="overview__component">
					<h4>Component</h4>
					<KtForm v-model="values">
						<component
							:is="componentRepresenation.name"
							v-bind="componentRepresenation.props"
							:validator="componentRepresenation.validator"
							@update:query="updateQuery"
						>
							<div
								v-if="componentRepresenation.hasHelpTextSlot"
								slot="helpText"
							>
								<div>
									Supports
									<abbr title="Hypertext Markup Language">HTML</abbr> via
									<code>&lt;template v-slot:helpText&gt;</code>
								</div>
							</div>
							<div slot="default">Default Slot</div>
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
					<pre v-text="componentRepresenation.code" />
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
									tooltip: 'Support Varies',
								},
								{ key: 'hideValidation', label: 'hideValidation' },
								{ key: 'isDisabled', label: 'isDisabled' },
								{ key: 'isLoading', label: 'isLoading' },
								{ key: 'isOptional', label: 'isOptional' },
							]"
							type="switch"
						/>
						<KtFormControllerObject
							v-if="componentDefinition.additionalProps.length > 0"
							formKey="additionalProps"
						>
							<h4>Additional Props</h4>
							<KtFieldToggle
								v-if="componentDefinition.additionalProps.includes('actions')"
								formKey="actions"
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
								<KtFieldNumber formKey="step" isOptional label="step" />
							</div>
							<KtFieldToggle
								v-if="
									componentDefinition.additionalProps.includes(
										'hideChangeButtons',
									)
								"
								formKey="hideChangeButtons"
								isOptional
								label="hideChangeButtons"
								type="switch"
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
						</KtFormControllerObject>
					</div>
					<div>
						<h4>Texts</h4>
						<KtFieldText formKey="label" isOptional label="label" />
						<KtFieldText
							formKey="helpDescription"
							isOptional
							label="helpDescription"
						/>
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
							/>
							<KtFieldSingleSelect
								formKey="rightIcon"
								helpText="Support Varies"
								:isDisabled="!componentDefinition.supports.decoration"
								isOptional
								label="rightIcon"
								:options="yocoIconOptions"
							/>
						</div>
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
							:validator="savedField.validator"
						>
							<div v-if="savedField.hasHelpTextSlot" slot="helpText">
								<div>
									Supports
									<abbr title="Hypertext Markup Language">HTML</abbr> via
									<code>&lt;template v-slot:helpText&gt;</code>
								</div>
							</div>
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
		additionalProps: ['actions', 'collapseTagsAfter', 'maximumSelectable'],
		formKey: 'multiSelectValue',
		name: 'KtFieldMultiSelect',
		supports: KtFieldMultiSelect.meta.supports,
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
		supports: KtFieldNumber.meta.supports,
	},
	{
		additionalProps: ['autoComplete'],
		formKey: 'textValue',
		name: 'KtFieldPassword',
		supports: KtFieldPassword.meta.supports,
	},
	{
		additionalProps: ['isInline'],
		formKey: 'singleSelectValue',
		name: 'KtFieldRadioGroup',
		supports: KtFieldRadioGroup.meta.supports,
	},
	{
		additionalProps: ['actions'],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelect',
		supports: KtFieldSingleSelect.meta.supports,
	},
	{
		additionalProps: ['isLoadingOptions', 'query'],
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
		additionalProps: ['toggleType'],
		formKey: 'toggleValue',
		name: 'KtFieldToggle',
		supports: KtFieldToggle.meta.supports,
	},
	{
		additionalProps: ['isInline', 'toggleType'],
		formKey: 'toggleGroupValue',
		name: 'KtFieldToggleGroup',
		supports: KtFieldToggleGroup.meta.supports,
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

		const remoteSingleSelectQuery =
			ref<Kotti.FieldSingleSelectRemote.Props['query']>(null)

		const settings = ref<{
			additionalProps: {
				actions: Kotti.FieldToggle.Value
				autoComplete: 'current-password' | 'new-password'
				collapseTagsAfter: Kotti.FieldNumber.Value
				hideChangeButtons: boolean
				isInline: boolean
				isLoadingOptions: boolean
				maximumDate: Kotti.FieldDate.Value
				maximumSelectable: Kotti.FieldNumber.Value
				minimumDate: Kotti.FieldDate.Value
				numberHideMaximum: boolean
				numberMaximum: Kotti.FieldNumber.Value
				numberMinimum: Kotti.FieldNumber.Value
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
			locale: Kotti.I18n.SupportedLanguages
			placeholder: Kotti.FieldText.Value
			placeholder2: Kotti.FieldText.Value
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
				isLoadingOptions: false,
				maximumDate: null,
				maximumSelectable: null,
				minimumDate: null,
				numberHideMaximum: false,
				numberMaximum: null,
				numberMinimum: null,
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
			placeholder2: null,
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

		const isRangeComponent = computed(() =>
			settings.value.component.includes('Range'),
		)

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

			if (componentDefinition.value.supports.placeholder)
				if (isRangeComponent.value)
					Object.assign(additionalProps, {
						placeholder:
							settings.value.placeholder !== null ||
							settings.value.placeholder2 !== null
								? [settings.value.placeholder, settings.value.placeholder2]
								: null, // not passed
					})
				else
					Object.assign(additionalProps, {
						placeholder: settings.value.placeholder,
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

			if (
				componentDefinition.value.additionalProps.includes('step') &&
				settings.value.additionalProps.step !== null
			)
				Object.assign(additionalProps, {
					step: settings.value.additionalProps.step,
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

			if (componentDefinition.value.additionalProps.includes('maximumDate'))
				Object.assign(additionalProps, {
					maximumDate: settings.value.additionalProps.maximumDate,
				})

			if (
				componentDefinition.value.additionalProps.includes('maximumSelectable')
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
				const options =
					component === 'KtFieldSingleSelectRemote'
						? singleOrMultiSelectOptions.filter((option) =>
								option.label
									.toLowerCase()
									.includes(
										(remoteSingleSelectQuery.value ?? '').toLowerCase(),
									),
						  )
						: singleOrMultiSelectOptions

				Object.assign(additionalProps, {
					options,
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

			if (['KtFieldSingleSelectRemote'].includes(component)) {
				Object.assign(additionalProps, { query: remoteSingleSelectQuery.value })
			}

			if (['KtFieldRadioGroup'].includes(component))
				Object.assign(additionalProps, {
					options: radioGroupOptions,
				})

			if (['KtFieldToggleGroup'].includes(component))
				Object.assign(additionalProps, {
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
					}[
						componentValue.value.name as Exclude<
							ComponentNames,
							'KtFilters' | 'KtLabelValue'
						>
					]),
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
			isRangeComponent,
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
			updateQuery: (
				newQuery: Kotti.FieldSingleSelectRemote.Events.UpdateQuery,
			) => {
				remoteSingleSelectQuery.value = newQuery
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
