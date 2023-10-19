<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<div class="element-example white">
			<KtForm v-model="formValue">
				<KtFieldInlineEdit
					v-bind="fieldProps"
					class="mb-16px"
					formKey="fieldValue"
					@confirm="onConfirm"
				/>
				<div class="overview__component__value mb-8px">
					<strong>Value:</strong>
					<span v-text="JSON.stringify(fieldValue)" />
					<a @click="reset">reset</a>
				</div>
			</KtForm>
			<KtForm v-model="settings" size="small">
				<div class="wrapper">
					<div>
						<h4>Settings</h4>
						<KtFieldSingleSelect
							formKey="validation"
							hideClear
							isOptional
							label="Validation State"
							:options="validationOptions"
						/>
						<KtFieldSingleSelect
							formKey="preventConfirmationOn"
							hideClear
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
						<div class="field-row">
							<KtFieldText formKey="helpText" isOptional label="helpText" />
						</div>
					</div>
				</div>
			</KtForm>
		</div>
	</div>
</template>

<script lang="ts">
import {
	Kotti,
	KtFieldInlineEdit,
	KtFieldSingleSelect,
	KtForm,
} from '@3yourmind/kotti-ui'
import { KottiFieldInlineEdit } from '@3yourmind/kotti-ui/dist/esm/kotti-field-inline-edit/types'
import { defineComponent, ref, computed } from '@vue/composition-api'

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
			preventConfirmationOn: Kotti.FieldInlineEdit.ConfirmationValidation
			tabIndex: Kotti.FieldNumber.Value
			textStyle: Kotti.FieldInlineEdit.TextStyle | null
			validation: Kotti.Field.Validation.Result['type']
		}>({
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
			preventConfirmationOn: KottiFieldInlineEdit.ConfirmationValidation.ERROR,
			tabIndex: null,
			textStyle: null,
			validation: 'empty',
		})

		const formValue = ref<{ fieldValue: KottiFieldInlineEdit.Value }>(
			getInitialValue(),
		)

		return {
			component: KtFieldInlineEdit,
			formValue,
			fieldValue: computed(() => formValue.value.fieldValue),
			fieldProps: computed(() => ({
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
				preventConfirmationOn:
					settings.value.preventConfirmationOn ??
					Kotti.FieldInlineEdit.ConfirmationValidation.NEVER,
				tabIndex: settings.value.tabIndex,
				textStyle: settings.value.textStyle,
				validator: () => ({
					type: settings.value.validation ?? 'empty',
					text: 'Some validation text',
				}),
			})),
			onConfirm: (newVal: Kotti.FieldInlineEdit.Events.Confirm) => {
				window.alert(newVal)
			},
			preventConfirmationOptions: ref(
				Object.entries(Kotti.FieldInlineEdit.ConfirmationValidation).map(
					([label, value]) => ({
						label:
							label === Kotti.FieldInlineEdit.ConfirmationValidation.NEVER
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
				...Object.entries(KottiFieldInlineEdit.TextStyle).map(
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

<style src="../styles/form-fields.scss" lang="scss" scoped />
