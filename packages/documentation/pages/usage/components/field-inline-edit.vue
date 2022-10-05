<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<div class="element-example white">
			<KtFieldInlineEdit
				v-bind="{
					helpDescription,
					helpText,
					hideValidation,
					isDisabled,
					isEditing,
					isLoading,
					isOptional,
					label,
					mode,
					placeholder,
					tabindex,
					validator,
				}"
				class="mb-16px"
				:value="fieldValue"
				@confirm="handleConfirm"
				@input="setValue"
				@update:isEditing="($event) => (isEditing = $event)"
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
							:options="validationOptions"
						/>
						<!-- <div slot="helpText">
								Passed as a validation function:
								<code>() => ({ type: 'error', message: '' })</code>
								or via
								<code>KtForm.validators</code>
							</div>
						</KtFieldSingleSelect> -->
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
import { Ref, defineComponent, ref, computed } from '@vue/composition-api'

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
		const isEditing = ref(false)
		const fieldValue: Ref<string | null> = ref(null)
		const settings = ref<{
			booleanFlags: {
				hideValidation: Kotti.FieldToggle.Value
				isDisabled: Kotti.FieldToggle.Value
				isLoading: Kotti.FieldToggle.Value
				isOptional: Kotti.FieldToggle.Value
			}
			helpDescription: Kotti.FieldText.Value
			helpText: Kotti.FieldText.Value
			label: Kotti.FieldText.Value
			mode: Kotti.FieldInlineEdit.Shared.Mode
			placeholder: Kotti.FieldText.Value
			tabIndex: Kotti.FieldNumber.Value
			validation: Kotti.Field.Validation.Result['type']
		}>({
			booleanFlags: {
				hideValidation: false,
				isDisabled: false,
				isLoading: false,
				isOptional: true,
			},
			helpDescription: null,
			helpText: null,
			label: 'Label',
			mode: Kotti.FieldInlineEdit.Shared.Mode.REGULAR,
			placeholder: null,
			tabIndex: null,
			validation: 'empty',
		})

		const isRegularMode = (mode: Kotti.FieldInlineEdit.Shared.Mode) =>
			mode === Kotti.FieldInlineEdit.Shared.Mode.REGULAR

		return {
			component: KtFieldInlineEdit,
			fieldValue,
			handleConfirm: (newValue: Kotti.FieldInlineEdit.Value) => newValue,
			helpDescription: computed(() =>
				isRegularMode(settings.value.mode)
					? settings.value.helpDescription
					: null,
			),
			helpText: computed(() =>
				isRegularMode(settings.value.mode) ? settings.value.helpText : null,
			),
			hideValidation: computed(
				() => settings.value.booleanFlags.hideValidation,
			),
			isDisabled: computed(() => settings.value.booleanFlags.isDisabled),
			isEditing,
			isLoading: computed(() => settings.value.booleanFlags.isLoading),
			isOptional: computed(() => settings.value.booleanFlags.isOptional),
			label: computed(() => settings.value.label),
			mode: computed(() => settings.value.mode),
			modeOptions: ref([
				{
					label: 'Regular (Default)',
					value: Kotti.FieldInlineEdit.Shared.Mode.REGULAR,
				},
				{
					label: 'TextLine',
					value: Kotti.FieldInlineEdit.Shared.Mode.TEXT_LINE,
				},
				{ label: 'Header', value: Kotti.FieldInlineEdit.Shared.Mode.HEADER },
				{
					label: 'MultiLine',
					value: Kotti.FieldInlineEdit.Shared.Mode.MULTI_LINE,
				},
			]),
			settings,
			setValue: (newValue: string | null) => {
				fieldValue.value = newValue
			},
			placeholder: computed(() => settings.value.placeholder),
			tabindex: computed(() => settings.value.tabIndex),
			validationOptions: ref([
				{ label: 'Empty (Default)', value: 'empty' },
				{ label: 'Success', value: 'success' },
				{ label: 'Warning', value: 'warning' },
				{ label: 'Error', value: 'error' },
			]),
			validator: computed(() => () => ({
				type: settings.value.validation,
				text: 'Some validation text',
			})),
		}
	},
})
</script>

<style src="../styles/form-fields.scss" lang="scss" scoped />
