<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<div class="overview">
			<div class="overview__component">
				<KtForm v-model="formValue">
					<KtFieldInlineEdit
						v-bind="fieldProps"
						formKey="fieldValue"
						@confirm="onConfirm"
					/>
					<div class="overview__component-value">
						<strong>Value:</strong>
						<span v-text="JSON.stringify(fieldValue)" />
						<a @click="reset">reset</a>
					</div>
				</KtForm>
			</div>
		</div>

		<KtForm v-model="settings" size="small">
			<div class="wrapper">
				<div>
					<h4>Settings</h4>
					<KtFieldSingleSelect
						formKey="validation"
						isOptional
						label="Validation State"
						:options="validationOptions"
					/>
					<KtFieldSingleSelect
						formKey="preventConfirmationOn"
						isOptional
						label="preventConfirmationOn"
						:options="preventConfirmationOptions"
					/>
					<KtFieldSingleSelect
						formKey="textStyle"
						helpText="Only supported with single-line KtFieldInlineEdit"
						hideClear
						:isDisabled="settings.booleanFlags.isMultiline"
						isOptional
						label="Text Styles"
						:options="textStyleOptions"
					/>
					<KtFieldToggleGroup
						formKey="booleanFlags"
						isOptional
						label="Boolean Flags"
						:options="[
							{ key: 'hideValidation', label: 'hideValidation' },
							{ key: 'isDisabled', label: 'isDisabled' },
							{ key: 'isReadonly', label: 'isReadonly' },
							{ key: 'isLoading', label: 'isLoading' },
							{ key: 'isMultiline', label: 'isMultiline' },
							{ key: 'isOptional', label: 'isOptional' },
						]"
						type="switch"
					/>
					<KtFieldText formKey="placeholder" isOptional label="placeholder" />
					<KtFieldNumber formKey="tabIndex" isOptional label="tabIndex" />
					<KtFieldText formKey="dataTest" isOptional label="dataTest" />
				</div>

				<div>
					<h4>Texts</h4>
					<KtFieldText formKey="label" isOptional label="label" />
					<KtFieldText
						formKey="helpDescription"
						isOptional
						label="helpDescription"
					/>
					<KtFieldText formKey="helpText" isOptional label="helpText" />
					<div class="field-row">
						<KtFieldSingleSelect
							formKey="autoComplete"
							helpText="Support Varies"
							isOptional
							isUnsorted
							label="autoComplete"
							:options="autoCompleteOptions"
						/>
						<KtFieldText
							formKey="autoCompleteToken"
							helpText="A space-separated <token-list> that describes the meaning of the autocompletion value. See https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#values"
							:isDisabled="settings.autoComplete !== 'token'"
							isOptional
							label="<token>"
						/>
					</div>
				</div>
			</div>
		</KtForm>
	</div>
</template>

<script lang="ts">
import {
	Kotti,
	KtFieldInlineEdit,
	KtFieldSingleSelect,
	KtForm,
} from '@3yourmind/kotti-ui'
import { defineComponent, ref, computed } from 'vue'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFieldInlineEdit',
	components: {
		ComponentInfo,
		KtFieldInlineEdit,
		KtFieldSingleSelect,
		KtForm,
	},
	setup() {
		const getInitialValue = () => ({ fieldValue: null })

		const settings = ref<{
			autoComplete: Kotti.FieldText.Value
			autoCompleteToken: Kotti.FieldText.Value
			booleanFlags: {
				hideValidation: Kotti.FieldToggle.Value
				isDisabled: Kotti.FieldToggle.Value
				isLoading: Kotti.FieldToggle.Value
				isMultiline: Kotti.FieldToggle.Value
				isOptional: Kotti.FieldToggle.Value
				isReadonly: Kotti.FieldToggle.Value
			}
			dataTest: Kotti.FieldText.Value
			helpDescription: Kotti.FieldText.Value
			helpText: Kotti.FieldText.Value
			label: Kotti.FieldText.Value
			placeholder: Kotti.FieldText.Value
			preventConfirmationOn: Kotti.FieldInlineEdit.ConfirmationValidation | null
			tabIndex: Kotti.FieldNumber.Value
			textStyle: Kotti.FieldInlineEdit.TextStyle | null
			validation: Kotti.Field.Validation.Result['type'] | null
		}>({
			autoComplete: null,
			autoCompleteToken: null,
			booleanFlags: {
				hideValidation: false,
				isDisabled: false,
				isLoading: false,
				isMultiline: false,
				isOptional: false,
				isReadonly: false,
			},
			dataTest: null,
			helpDescription: null,
			helpText: null,
			label: 'Label',
			placeholder: null,
			preventConfirmationOn: Kotti.FieldInlineEdit.ConfirmationValidation.NEVER,
			tabIndex: null,
			textStyle: null,
			validation: 'empty',
		})

		const formValue = ref<{ fieldValue: Kotti.FieldInlineEdit.Value }>(
			getInitialValue(),
		)

		return {
			autoCompleteOptions: computed(() => [
				...Object.values(Kotti.Field.AutoComplete).map((option) => ({
					label: option,
					value: option,
				})),
				{ label: '<token>', value: 'token' },
			]),
			component: KtFieldInlineEdit,
			formValue,
			fieldValue: computed(() => formValue.value.fieldValue),
			fieldProps: computed(() => ({
				autoComplete:
					settings.value.autoComplete === 'token'
						? settings.value.autoCompleteToken
						: settings.value.autoComplete,
				dataTest: settings.value.dataTest,
				helpDescription: settings.value.helpDescription,
				helpText: settings.value.helpText,
				hideValidation: settings.value.booleanFlags.hideValidation,
				isDisabled: settings.value.booleanFlags.isDisabled,
				isLoading: settings.value.booleanFlags.isLoading,
				isMultiline: settings.value.booleanFlags.isMultiline,
				isOptional: settings.value.booleanFlags.isOptional,
				isReadonly: settings.value.booleanFlags.isReadonly,
				label: settings.value.label,
				placeholder: settings.value.placeholder,
				preventConfirmationOn: settings.value.preventConfirmationOn,
				tabIndex: settings.value.tabIndex,
				textStyle: settings.value.textStyle,
				validator: () => ({
					type: settings.value.validation ?? 'empty',
					text: 'Some validation text',
				}),
			})),
			onConfirm: (newVal: Kotti.FieldInlineEdit.Events.Confirm) => {
				// eslint-disable-next-line no-alert
				window.alert(newVal)
			},
			preventConfirmationOptions: ref(
				Object.entries(Kotti.FieldInlineEdit.ConfirmationValidation).map(
					([label, value]) => ({
						label:
							value === Kotti.FieldInlineEdit.ConfirmationValidation.NEVER
								? `${label} (Default)`
								: label,
						value,
					}),
				),
			),
			reset: () => {
				// needed in the edge case of clicking the reset button while being focused on the field
				window.setTimeout(() => {
					formValue.value = getInitialValue()
				}, 0)
			},
			settings,
			textStyleOptions: ref([
				{ label: 'No Styling (DEFAULT)', value: null },
				...Object.entries(Kotti.FieldInlineEdit.TextStyle).map(
					([label, value]) => ({ label, value: value }),
				),
			]),
			validationOptions: ref([
				{ label: 'Empty (Default)', value: 'empty' },
				{ label: 'Success', value: 'success' },
				{ label: 'Warning', value: 'warning' },
				{ label: 'Error', value: 'error' },
			]),
		}
	},
})
</script>

<style src="../../../styles/form-fields.scss" lang="scss" scoped />
