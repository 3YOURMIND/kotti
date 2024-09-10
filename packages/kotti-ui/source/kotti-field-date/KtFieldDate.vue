<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-date"
		debounceLabelClick
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<template #container>
			<div ref="inputContainerRef" class="kt-field__input-container">
				<VueDatePicker
					ref="datePickerRef"
					:actionRow="{
						showPreview: false,
					}"
					:enableTimePicker="false"
					:modelValue="field.currentValue"
					modelType="yyyy-MM-dd"
					:presetDates="shortcuts"
					teleport
					:ui="{
						calendar: 'date-picker__calendar',
						menu: 'date-picker__menu',
					}"
					@internalModelChange="handleInternalModelChange"
					@update:modelValue="onUpdateModelValue"
				>
					<template #trigger>
						<input
							class="kt-field-date__input"
							autocomplete="off"
							v-bind="inputProps"
							@blur="onBlur"
							@input="onInput"
						/>
					</template>

					<template #action-buttons>
						<div class="date-picker__action-buttons">
							<KtButton
								:label="translations.cancelButton"
								size="small"
								type="secondary"
								@click="onCloseMenu"
							/>
							<KtButton
								:disabled="isConfirmDisabled"
								:label="translations.confirmButton"
								size="small"
								type="primary"
								@click="onSelectDate"
							/>
						</div>
					</template>
				</VueDatePicker>
			</div>
		</template>
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import type { InputHTMLAttributes } from '@vue/runtime-dom'
import VueDatePicker from '@vuepic/vue-datepicker'
import type { DatePickerInstance } from '@vuepic/vue-datepicker'

import { KtButton } from '../kotti-button'
import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
import { useI18nContext, useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_DATE_SUPPORTS } from './constants'
import { KottiFieldDate } from './types'
import { useSaveOnBlur } from './hooks'
import FieldTime from './FieldTime.vue'

export default defineComponent({
	name: 'KtFieldDate',
	components: {
		FieldTime,
		KtButton,
		KtField,
		VueDatePicker,
	},
	props: makeProps(KottiFieldDate.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldDate.Value>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})
		// const { forceUpdate, forceUpdateKey } = useForceUpdate()

		const i18NContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldDateShared')

		const datePickerRef = ref<DatePickerInstance | null>(null)
		const inputContainerRef = ref<Element | null>(null)

		const vueDatePickerDateValue = ref<Date | null>()

		const { forceUpdateKey, inputString, onInput, onBlur } = useSaveOnBlur({
			mode: 'date',
			save: field.setValue,
		})
		// TODO test within KtPopover
		// const isInPopover = inject(KT_IS_IN_POPOVER, false)

		return {
			datePickerRef,
			field,
			handleInternalModelChange: (date: Date) => {
				vueDatePickerDateValue.value = date
			},
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
					forceUpdateKey: number
				} => {
					return {
						...field.inputProps,
						class: ['kt-field-text__wrapper'],
						forceUpdateKey: forceUpdateKey.value,
						type: 'text',
						size: 1,
						value: inputString.value ?? field.currentValue ?? '',
						placeholder: props.placeholder ?? undefined,
					}
				},
			),
			inputContainerRef,
			isConfirmDisabled: computed(() => vueDatePickerDateValue.value === null),
			locale: computed(() => i18NContext.locale),
			onBlur,
			onCloseMenu: () => {
				datePickerRef.value?.closeMenu?.()
			},
			onInput,
			onSelectDate: (value: string | null) => {
				datePickerRef.value?.selectDate?.(value)
			},
			onUpdateModelValue: (value: KottiFieldDate.Value) => {
				if (!field.isDisabled && !field.isLoading) {
					field.setValue(value)
				}
			},
			translations,
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
