<template lang="md">
# Form Fields

<ClientOnly>
	<KtTranslationContext :locale="settings.locale">
		<div class="overview">
			<div class="overview__component">
				<h4>Component</h4>
				<KtForm v-model="values" :isLoading="settings.booleanFlags.isLoading">
					<component :is="settings.component" v-bind="componentProps">Default Slot</component>
				</KtForm>
				<div class="overview__component__value">
					<strong>Value</strong>: <span v-text="JSON.stringify(values[componentProps.formKey])"/> <a @click.prevent="reset">reset</a>
				</div>
			</div>
			<div class="overview__code">
				<h4>Code</h4>
				<pre v-text="code" />
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
							{ disabled: !componentDefinition.supports.decoration, key: 'hideClear', label: 'hideClear' },
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
							formKey="toggleType"
							isOptional
							label="type"
							:options="[
								{ label: 'checkbox (Default)', value: 'checkbox' },
								{ label: 'switch', value: 'switch' },
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
		</KtForm>
	</KtTranslationContext>
</ClientOnly>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from '@vue/composition-api'

import { KOTTI_FIELD_DATE_SUPPORTS } from '../../../packages/next/kotti-field-date/constants'
import {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTimeRange,
	KottiFieldDateTime,
} from '../../../packages/next/kotti-field-date/types'
import { KOTTI_FIELD_RADIO_GROUP_SUPPORTS } from '../../../packages/next/kotti-field-radio-group/constants'
import { KOTTI_FIELD_SELECT_SUPPORTS } from '../../../packages/next/kotti-field-select/constants'
import {
	KottiFieldMultiSelect,
	KottiFieldSingleSelect,
} from '../../../packages/next/kotti-field-select/types'
import { KOTTI_FIELD_TEXT_AREA_SUPPORTS } from '../../../packages/next/kotti-field-text-area/constants'
import { KOTTI_FIELD_TEXT_SUPPORTS } from '../../../packages/next/kotti-field-text/constants'
import { KottiFieldText } from '../../../packages/next/kotti-field-text/types'
import { KOTTI_FIELD_TOGGLE_SUPPORTS } from '../../../packages/next/kotti-field-toggle/constants'
import {
	KottiFieldToggle,
	KottiFieldToggleGroup,
} from '../../../packages/next/kotti-field-toggle/types'
import { KottiField } from '../../../packages/next/kotti-field/types'
import { KottiTranslation } from '../../../packages/next/kotti-translation/types'
import { Yoco } from '../../../packages/next/types'
import yocoString from '../../assets/json/yocoString.json'

const components: Array<{
	additionalProps: Array<string>
	formKey: string
	name: string
	supports: KottiField.Supports
}> = [
	{
		additionalProps: [],
		formKey: 'dateValue',
		name: 'KtFieldDate',
		supports: KOTTI_FIELD_DATE_SUPPORTS,
	},
	{
		additionalProps: [],
		formKey: 'dateRangeValue',
		name: 'KtFieldDateRange',
		supports: KOTTI_FIELD_DATE_SUPPORTS,
	},
	{
		additionalProps: [],
		formKey: 'dateTimeValue',
		name: 'KtFieldDateTime',
		supports: KOTTI_FIELD_DATE_SUPPORTS,
	},
	{
		additionalProps: [],
		formKey: 'dateTimeRangeValue',
		name: 'KtFieldDateTimeRange',
		supports: KOTTI_FIELD_DATE_SUPPORTS,
	},
	{
		additionalProps: [],
		formKey: 'multiSelectValue',
		name: 'KtFieldMultiSelect',
		supports: KOTTI_FIELD_SELECT_SUPPORTS,
	},
	{
		additionalProps: [],
		formKey: 'singleSelectValue',
		name: 'KtFieldRadioGroup',
		supports: KOTTI_FIELD_RADIO_GROUP_SUPPORTS,
	},
	{
		additionalProps: [],
		formKey: 'singleSelectValue',
		name: 'KtFieldSingleSelect',
		supports: KOTTI_FIELD_SELECT_SUPPORTS,
	},
	{
		additionalProps: [],
		formKey: 'textValue',
		name: 'KtFieldText',
		supports: KOTTI_FIELD_TEXT_SUPPORTS,
	},
	{
		additionalProps: [],
		formKey: 'textValue',
		name: 'KtFieldTextArea',
		supports: KOTTI_FIELD_TEXT_AREA_SUPPORTS,
	},
	{
		additionalProps: ['toggleType'],
		formKey: 'toggleValue',
		name: 'KtFieldToggle',
		supports: KOTTI_FIELD_TOGGLE_SUPPORTS,
	},
	{
		additionalProps: ['toggleType'],
		formKey: 'toggleGroupValue',
		name: 'KtFieldToggleGroup',
		supports: KOTTI_FIELD_TOGGLE_SUPPORTS,
	},
]

export default defineComponent({
	name: 'KtFormFieldsDocumentation',
	setup() {
		const values: Ref<{
			dateRangeValue: KottiFieldDateRange.Value
			dateTimeRangeValue: KottiFieldDateTimeRange.Value
			dateTimeValue: KottiFieldDateTime.Value
			dateValue: KottiFieldDate.Value
			multiSelectValue: KottiFieldMultiSelect.Value
			singleSelectValue: KottiFieldSingleSelect.Value
			textValue: KottiFieldText.Value
			toggleGroupValue: KottiFieldToggleGroup.Value
			toggleValue: KottiFieldToggle.Value
		}> = ref({
			dateRangeValue: [null, null],
			dateTimeRangeValue: [null, null],
			dateTimeValue: null,
			dateValue: null,
			multiSelectValue: [],
			singleSelectValue: null,
			textValue: null,
			toggleGroupValue: {
				initiallyFalse: false,
				initiallyNull: null,
				initiallyTrue: true,
			},
			toggleValue: null,
		})

		const settings: Ref<{
			additionalProps: {
				toggleType: 'checkbox' | 'switch'
			}
			booleanFlags: {
				hideClear: KottiFieldToggle.Value
				isDisabled: KottiFieldToggle.Value
				isLoading: KottiFieldToggle.Value
				isOptional: KottiFieldToggle.Value
			}
			component: string
			helpDescription: KottiFieldText.Value
			helpText: KottiFieldText.Value
			label: KottiFieldText.Value
			leftIcon: Yoco.Icon | null
			locale: KottiTranslation.SupportedLanguages
			placeholder: KottiFieldText.Value
			prefix: KottiFieldText.Value
			rightIcon: Yoco.Icon | null
			size: 'small' | 'medium' | 'large'
			suffix: KottiFieldText.Value
			validation: KottiField.Validation.Result['type']
		}> = ref({
			additionalProps: {
				toggleType: 'checkbox',
			},
			booleanFlags: {
				hideClear: false,
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

		const componentProps = computed(() => {
			const { component } = settings.value

			const standardProps = {
				formKey: componentDefinition.value.formKey,
				helpDescription: settings.value.helpDescription,
				helpText: settings.value.helpText,
				isDisabled: settings.value.booleanFlags.isDisabled,
				isOptional: settings.value.booleanFlags.isOptional,
				label: settings.value.label,
				size: settings.value.size,
				validator: (): KottiField.Validation.Result =>
					settings.value.validation === null
						? { type: null }
						: {
								text: `Some Validation Text`,
								type: settings.value.validation,
						  },
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

		return {
			code: computed(() =>
				[
					`<${settings.value.component}`,
					...Object.entries(componentProps.value)
						.sort(([a], [b]) => a.localeCompare(b))
						.filter(([key]) => !['validator'].includes(key))
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
					...(settings.value.validation === null
						? []
						: [
								`\t:validator="(value) => ({ text: 'Some Validation Text', type: "${settings.value.validation}" })"`,
						  ]),
					'/>',
				].join('\n'),
			),
			componentDefinition,
			componentOptions: components.map((component) => ({
				label: component.name,
				value: component.name,
			})),
			componentProps,
			reset: () => {
				const { formKey } = componentProps.value

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const value = (values.value as any)[formKey]

				values.value = {
					...values.value,
					[formKey]: Array.isArray(value) ? [] : null,
				}
			},
			settings,
			values,
			yocoIconOptions: (yocoString.data as Yoco.Icon[]).map((icon) => ({
				label: icon,
				value: icon,
			})),
		}
	},
})
</script>

<style lang="scss">
@import '../../../packages/kotti-style/_variables.scss';

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

	> * {
		flex: 1;
		padding: 1.5em;
		margin: 0 !important;
	}

	> *:not(:last-child) {
		border-right: 1px solid var(--ui-02);
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
