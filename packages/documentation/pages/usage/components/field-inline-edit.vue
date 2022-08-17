<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<div class="element-example white">
			<KtFieldInlineEdit
				v-bind="settings"
				class="mb-16px"
				:isEditing="isEditing"
				:mode="settings.mode"
				:value="fieldValue"
				@input="setValue"
				@setIsEditing="setIsEditing"
			/>
			<KtForm v-model="settings" size="small">
				<div class="wrapper">
					<div>
						<h4>Settings</h4>
						<KtFieldSingleSelect
							formKey="mode"
							hideClear
							label="Mode"
							:options="modeOptions"
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
							</div>
						</KtFieldSingleSelect>
						<KtFieldToggleGroup
							formKey="booleanFlags"
							isOptional
							label="Boolean Flags"
							:options="[
								{ key: 'hideValidation', label: 'hideValidation' },
								{ key: 'isDisabled', label: 'isDisabled' },
								{ key: 'isLoading', label: 'isLoading' },
								{ key: 'isOptional', label: 'isOptional' },
							]"
							type="switch"
						/>
						<KtFieldText formKey="placeholder" isOptional label="placeholder" />
						<KtFieldNumber formKey="tabIndex" isOptional label="tabIndex" />
					</div>
					<div v-if="settings.mode === 'regular'">
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
	KtForm,
	KtFieldSingleSelect,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { Ref, defineComponent, ref } from '@vue/composition-api'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFieldInlineEdit',
	components: {
		ComponentInfo,
		KtFieldInlineEdit,
		KtForm,
		KtFieldSingleSelect,
	},
	setup() {
		const fieldValue: Ref<string | null> = ref(null)
		const isEditing: Ref<boolean> = ref(false)
		const settings = ref<{
			booleanFlags: {
				hideValidation: Kotti.FieldToggle.Value
				isDisabled: Kotti.FieldToggle.Value
				isLoading: Kotti.FieldToggle.Value
				isOptional: Kotti.FieldToggle.Value
			}
			hasHelpTextSlot: boolean
			helpDescription: Kotti.FieldText.Value
			helpText: Kotti.FieldText.Value
			label: Kotti.FieldText.Value
			mode: Kotti.FieldInlineEdit.Shared.Mode
			placeholder: Kotti.FieldText.Value
			rightIcon: Yoco.Icon | null
			tabIndex: Kotti.FieldNumber.Value
			validation: Kotti.Field.Validation.Result['type']
		}>({
			booleanFlags: {
				hideValidation: false,
				isDisabled: false,
				isLoading: false,
				isOptional: true,
			},
			hasHelpTextSlot: false,
			helpDescription: null,
			helpText: null,
			label: 'Label',
			mode: Kotti.FieldInlineEdit.Shared.Mode.REGULAR,
			placeholder: null,
			rightIcon: null,
			tabIndex: null,
			validation: 'empty',
		})

		return {
			component: KtFieldInlineEdit,
			fieldValue,
			isEditing,
			modeOptions: ref([
				{ label: 'Regular (Default)', value: 'regular' },
				{ label: 'Text line', value: 'text-line' },
				{ label: 'Header', value: 'header' },
				{ label: 'Multi line', value: 'multi-line' },
			]),
			setIsEditing: (value: boolean) => (isEditing.value = value),
			settings,
			setValue: (newValue: string | null) => {
				fieldValue.value = newValue
			},
		}
	},
})
</script>

<style src="../styles/form-fields.scss" lang="scss" scoped />
