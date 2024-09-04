<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-date-range"
		debounceLabelClick
		:getEmptyValue="() => [null, null]"
		:helpTextSlot="$slots.helpText"
		isRange
	>
		<template #container>
			<div ref="inputContainerRef" class="kt-field__input-container">
				<VueDatePicker
					ref="datePickerRef"
					:actionRow="{
						showPreview: false,
					}"
					:enableTimePicker="false"
					:modelValue="cleanedCurrentValue"
					modelType="yyyy-MM-dd"
					multi-calendars
					:presetDates="shortcuts"
					:range="{ partialRange: false }"
					:ui="{
						calendar: 'date-picker__calendar',
						menu: 'date-picker__menu',
					}"
					@rangeStart="onRangeStart"
					@rangeEnd="onRangeEnd"
					@update:modelValue="onUpdateModelValue"
				>
					<template #trigger>
						<input
							class="kt-field-text__wrapper"
							v-bind="inputProps"
							@blur="onBlur"
							@focus="onFocus"
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
// import { KT_IS_IN_POPOVER } from '../kotti-popover/constants'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_DATE_SUPPORTS } from './constants'
import { KottiFieldDateRange } from './types'
import dayjs from 'dayjs'
import { useI18nContext, useTranslationNamespace } from '../kotti-i18n/hooks'
// import { isInvalidDate } from './utilities'
import FieldTime from './FieldTime.vue'

export default defineComponent({
	name: 'KtFieldDateRange',
	components: {
		FieldTime,
		KtButton,
		KtField,
		VueDatePicker,
	},
	props: makeProps(KottiFieldDateRange.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldDateRange.Value>({
			emit,
			isEmpty: ([lhs, rhs]) => lhs === null && rhs === null,
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		const i18NContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldDateShared')

		// const elDateRef = ref<ElDateWithInternalAPI | null>(null)
		const datePickerRef = ref<DatePickerInstance | null>(null)
		const inputContainerRef = ref<Element | null>(null)
		const internalRangeValue = ref<[Date | null, Date | null]>([null, null])

		const isEditing = ref(false)
		const cleanedCurrentValue = computed(() => [
			field.currentValue[0] ?? '',
			field.currentValue[1] ?? '',
		])

		// TODO (?)
		// const isInPopover = inject(KT_IS_IN_POPOVER, false)

		return {
			cleanedCurrentValue,
			datePickerRef,
			field,
			handleInternalModelChange: (date: [Date | null, Date | null]) => {
				console.log('handleInternalModelChange', date)
				internalRangeValue.value = date
			},
			handleClickOutside: () => {},
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
					// forceUpdateKey: number
				} => {
					const value = (() => {
						if (isEditing.value) return JSON.stringify(internalRangeValue.value)

						if (internalRangeValue.value)
							return JSON.stringify(internalRangeValue.value)

						return ''
					})()

					return {
						...field.inputProps,
						class: ['kt-field-text__wrapper'],
						// forceUpdateKey: forceUpdateKey.value,
						type: 'text',
						size: 1,
						value,
						placeholder: props.placeholder ?? undefined,
					}
				},
			),
			inputContainerRef,
			isConfirmDisabled: computed(() => internalRangeValue.value === null),
			locale: computed(() => i18NContext.locale),
			onUpdateModelValue: (value: KottiFieldDateRange.Value) => {
				console.log('onUpdateModelValue', value)
				if (!field.isDisabled && !field.isLoading) field.setValue(value)
			},
			onRangeEnd: (value: Date) => {
				const rangeStart = internalRangeValue.value[0]
				if (rangeStart === null) {
					throw new Error(
						'Range end was triggered without a matching range start',
					)
				}
				if (value <= rangeStart) {
					internalRangeValue.value = [value, rangeStart]
				} else {
					internalRangeValue.value = [rangeStart, value]
				}
			},
			onRangeStart: (value: Date) => {
				internalRangeValue.value = [value, null]
			},
			onSelectDate: (value: string | null) => {
				datePickerRef.value?.selectDate?.(value)
			},
			translations,
			onCloseMenu: () => {
				datePickerRef.value?.closeMenu?.()
			},
			onInput: (event: InputEvent) => {
				// const inputString = (event.target as HTMLInputElement).value as string
				// const date = dayjs(inputString)
				// field.setValue(inputString)
				// if (!date.isValid()) return
				// datePickerRef.value.updateInternalModelValue(date.toDate())
			},
			onBlur: () => {
				isEditing.value = false
				// if (internalDateValue.value === null) {
				// 	field.setValue([null, null])
				// 	return
				// }
				// const date = dayjs(internalDateValue.value)
				// if (!date.isValid()) return
				// const result = date.format('YYYY-MM-DD HH:mm')
				// field.setValue(result)
			},
			onFocus: () => {
				isEditing.value = true
			},
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
