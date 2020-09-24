<template lang="md">
<ComponentInfo title="Form Fields" :meta="meta" />

<KtTranslationContext :locale="settings.locale">
	<div class="overview">
		<div class="overview__component">
			<h4>Component</h4>
			<KtForm v-model="values">
				<component
					:is="componentRepresenation.name"
					:validator="componentRepresenation.validator"
					v-bind="componentRepresenation.props"
				>
					Default Slot
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
					helpText="Passed as a validation function or via KtForm.validators & validatorKey"
					:options="[
						{ label: 'None (Default)', value: null },
						{ label: 'Success', value: 'success' },
						{ label: 'Warning', value: 'warning' },
						{ label: 'Error', value: 'error' },
					]"
					size="small"
				/>
				<KtFieldToggleGroup
					formKey="booleanFlags"
					isOptional
					helpText="hideClear Support Varies"
					label="Boolean Flags"
					:options="[
						{ disabled: !componentDefinition.supports.clear, key: 'hideClear', label: 'hideClear' },
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
				<KtFieldText formKey="helpText" isOptional label="helpText" size="small" />
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
					>Default Slot</component>
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
import { Kotti } from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, ref, computed } from '@vue/composition-api'
import cloneDeep from 'lodash/cloneDeep'

import ComponentInfo from '../../components/ComponentInfo.vue'

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
		additionalProps: ['collapseTagsAfter'],
		formKey: 'multiSelectValue',
		name: 'KtFieldMultiSelect',
		supports: { clear: true, decoration: true, tabIndex: false },
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
		additionalProps: [],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelect',
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

type ComponentValue = {
	name: string
	props: object
	validation: Kotti.Field.Validation.Result['type']
}

type ComponentRepresenation = ComponentValue & {
	code: string
	validator: Kotti.Field.Validation.Function
}

const createValidator = (
	validation: Kotti.Field.Validation.Result['type'],
) => (): Kotti.Field.Validation.Result =>
	validation === null
		? { type: null }
		: {
				text: `Some Validation Text`,
				type: validation,
		  }

const generateCode = (component: ComponentValue) =>
	[
		`<${component.name}`,
		...Object.entries(component.props)
			.sort(([a], [b]) => a.localeCompare(b))
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			.filter(([_, value]) => value !== null && value !== false)
			.filter(([key, value]) => !(key === 'size' && value === 'medium'))
			.map(([key, value]) => {
				switch (typeof value) {
					case 'boolean':
						return key
					case 'string':
						return `${key}="${value}"`
					default:
						return `:${key}="${JSON.stringify(value).replace(/"/g, "'")}"`
				}
			})
			.map((prop) => `\t${prop}`),
		...(component.validation === null
			? []
			: [
					`\t:validator="(value) => ({ text: 'Some Validation Text', type: "${component.validation}" })"`,
			  ]),
		'/>',
	].join('\n')

export default defineComponent({
	name: 'KtFormFieldsDocumentation',
	components: {
		ComponentInfo,
	},
	setup() {
		const values = ref<typeof INITIAL_VALUES>(INITIAL_VALUES)

		const settings = ref<{
			additionalProps: {
				autoComplete: 'current-password' | 'new-password'
				collapseTagsAfter: Kotti.FieldNumber.Value
				hideChangeButtons: boolean
				isInline: boolean
				maximumDate: Kotti.FieldDate.Value
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
			component: string
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
				autoComplete: 'current-password',
				collapseTagsAfter: null,
				hideChangeButtons: false,
				isInline: false,
				maximumDate: null,
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
			validation: null,
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

			if (
				componentDefinition.value.additionalProps.includes('collapseTagsAfter')
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
					'KtFieldRadioGroup',
					'KtFieldSingleSelect',
				].includes(component)
			)
				Object.assign(additionalProps, {
					options: [
						{ label: 'Key 1', value: 'value1' },
						{ label: 'Key 2', value: 'value2' },
						{ label: 'Key 3', value: 'value3' },
					],
				})

			if (['KtFieldToggleGroup'].includes(component))
				Object.assign(additionalProps, {
					options: [
						{ key: 'initiallyFalse', label: 'Initially False' },
						{ key: 'initiallyNull', label: 'Initially Null' },
						{ key: 'initiallyTrue', label: 'Initially True' },
					],
				})

			if (
				[
					'KtFieldDate',
					'KtFieldDateTime',
					'KtFieldMultiSelect',
					'KtFieldSingleSelect',
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
				name: settings.value.component,
				props: cloneDeep(componentProps.value),
				validation: settings.value.validation,
			}),
		)

		const meta: Kotti.Meta = {
			addedVersion: '2.0.0',
			deprecated: null,
			typeScript: {
				namespace: 'Kotti.Field*',
			},
		}

		return {
			componentDefinition,
			componentOptions: components.map((component) => ({
				label: component.name,
				value: component.name,
			})),
			componentProps,
			componentRepresenation: computed(
				(): ComponentRepresenation => ({
					...componentValue.value,
					code: generateCode(componentValue.value),
					validator: createValidator(componentValue.value.validation),
				}),
			),
			meta,
			reset: () => {
				values.value = INITIAL_VALUES
			},
			savedFieldsMap: computed(() =>
				savedFields.value.map(
					(component): ComponentRepresenation => ({
						...component,
						code: generateCode(component),
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

<style lang="scss">
@import '@3yourmind/kotti-ui/source/kotti-style/_variables.scss';

li {
	list-style: none;
}

h3 {
	border-bottom: 0;
}

.wrapper {
	display: flex;
	flex-direction: row;
	margin: 0;
	margin-bottom: 1.5em;
	background-color: var(--ui-01);
	border: 1px solid var(--ui-02);
	border-radius: $border-radius;

	@media (max-width: #{$size-lg - 1px}) {
		flex-direction: column;

		> *:not(:first-child) {
			border-top: 1px solid var(--ui-02);
		}
	}

	@media (min-width: $size-lg) {
		flex-direction: row;

		> *:not(:last-child) {
			border-right: 1px solid var(--ui-02);
		}
	}

	> * {
		flex: 1;
		padding: 1.5em;
		margin: 0 !important;
	}
}

.field-row {
	display: flex;

	> * {
		flex: 1;
	}

	> *:not(:first-child) {
		margin-left: 10px;
	}
}

.overview {
	display: flex;
	margin-bottom: 20px;

	@media (max-width: #{$size-lg - 1px}) {
		flex-direction: column;

		> *:not(:first-child) {
			margin-top: 5px;
		}
	}

	@media (min-width: $size-lg) {
		flex-direction: row;
	}

	> * {
		flex: 1;
		flex-basis: 0;
	}

	&__component {
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		&__value {
			span {
				font-family: monospace;
			}
		}

		> * {
			margin-right: 20px;
		}
	}

	&__code > pre {
		max-width: 400px;
		height: 150px;
		margin: 0;
		overflow: scroll;
	}
}
</style>
