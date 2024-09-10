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
					teleport
					:timezone="{ convertModel: false, timezone: 'UTC' }"
					:ui="{
						calendar: 'date-picker__calendar',
						menu: 'date-picker__menu',
					}"
					@rangeStart="onRangeStart"
					@rangeEnd="onRangeEnd"
					@update:modelValue="onUpdateModelValue"
				>
					<template #trigger>
						<div class="kt-field-date-range__input-wrapper">
							<input
								class="kt-field-date-range__input"
								autocomplete="off"
								v-bind="inputPropsLeft"
								@blur="saveOnBlurLeft.onBlur"
								@input="saveOnBlurLeft.onInput"
							/>
							<input
								class="kt-field-date-range__input"
								autocomplete="off"
								v-bind="inputPropsRight"
								@blur="saveOnBlurRight.onBlur"
								@input="saveOnBlurRight.onInput"
							/>
						</div>
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
import { useSaveOnBlur } from './hooks'

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

		const sortRange = ([
			left,
			right,
		]: KottiFieldDateRange.Value): KottiFieldDateRange.Value => {
			if (left === null || right === null) return [left, right]

			const leftDate = dayjs(left)
			const rightDate = dayjs(right)
			if (leftDate.isBefore(rightDate)) return [left, right]
			return [right, left]
		}

		const saveOnBlurLeft = useSaveOnBlur({
			mode: 'date',
			save: (value) =>
				field.setValue(sortRange([value, field.currentValue[1]])),
		})
		const saveOnBlurRight = useSaveOnBlur({
			mode: 'date',
			save: (value) =>
				field.setValue(sortRange([field.currentValue[0], value])),
		})

		const i18NContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldDateShared')

		const datePickerRef = ref<DatePickerInstance | null>(null)
		const inputContainerRef = ref<Element | null>(null)
		const internalRangeValue = ref<[Date | null, Date | null]>([null, null])

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
				internalRangeValue.value = date
			},
			inputContainerRef,
			inputPropsLeft: computed(
				(): InputHTMLAttributes & {
					class: string[]
					// forceUpdateKey: number
				} => {
					return {
						...field.inputProps,
						class: ['kt-field-text__wrapper'],
						forceUpdateKey: saveOnBlurLeft.forceUpdateKey.value,
						type: 'text',
						size: 1,
						value:
							saveOnBlurLeft.inputString.value ?? field.currentValue[0] ?? '',
						placeholder: props.placeholder[0] ?? undefined,
					}
				},
			),
			inputPropsRight: computed(
				(): InputHTMLAttributes & {
					class: string[]
					// forceUpdateKey: number
				} => {
					return {
						...field.inputProps,
						class: ['kt-field-text__wrapper'],
						forceUpdateKey: saveOnBlurRight.forceUpdateKey.value,
						type: 'text',
						size: 1,
						value:
							saveOnBlurRight.inputString.value ?? field.currentValue[1] ?? '',
						placeholder: props.placeholder[1] ?? undefined,
					}
				},
			),
			isConfirmDisabled: computed(() => internalRangeValue.value === null),
			locale: computed(() => i18NContext.locale),
			onCloseMenu: () => {
				datePickerRef.value?.closeMenu?.()
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
			onUpdateModelValue: (value: KottiFieldDateRange.Value) => {
				if (!field.isDisabled && !field.isLoading) field.setValue(value)
			},
			saveOnBlurLeft,
			saveOnBlurRight,
			translations,
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
