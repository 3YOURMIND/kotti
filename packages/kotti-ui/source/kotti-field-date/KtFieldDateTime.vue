<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-datetime"
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
						showCancel: false,
						showSelect: false,
					}"
					:enableTimePicker="!isConfirmDisabled"
					format="yyyy-MM-dd HH:mm:ss"
					:locale="locale"
					:maxDate="maximumDate"
					:minDate="minimumDate"
					:modelValue="field.currentValue"
					modelType="yyyy-MM-dd HH:mm:ss"
					:offset="18"
					:presetDates="shortcuts"
					teleport
					:textInput="{
						format: 'yyyy-MM-dd HH:mm:ss',
					}"
					:ui="{
						calendar: 'date-picker__calendar',
						menu: 'date-picker__menu',
					}"
					@internalModelChange="handleInternalModelChange"
					@update:modelValue="onUpdateModelValue"
				>
					<template #trigger>
						<input
							class="kt-field-datetime__input"
							autocomplete="off"
							v-bind="inputProps"
							@blur="onBlur"
							@input="onInput"
						/>
					</template>
					<template
						#time-picker-overlay="{
							hours,
							minutes,
							seconds,
							setHours,
							setMinutes,
							setSeconds,
						}"
					>
						<FieldTime
							v-bind="timePickerProps"
							:hours="hours"
							:minutes="minutes"
							:seconds="seconds"
							@update:hours="setHours"
							@update:minutes="setMinutes"
							@update:seconds="setSeconds"
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

					<template #clock-icon>
						<div class="date-picker__day-switch">
							<i class="yoco" v-text="'clock'" />
							{{ timeDisplay }}
						</div>
					</template>

					<template #calendar-icon>
						<i class="yoco" v-text="'calendar'" />
					</template>

					<template #arrow-left>
						<i class="yoco" v-text="'chevron_left'" />
					</template>

					<template #arrow-right>
						<i class="yoco" v-text="'chevron_right'" />
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
// import { KT_IS_IN_POPOVER } from '../kotti-popover/constants'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_DATE_SUPPORTS } from './constants'
import { KottiFieldDate, KottiFieldDateTime } from './types'
import dayjs from 'dayjs'
import { useSaveOnBlur } from './hooks'
// import { isInvalidDate } from './utilities'
import FieldTime from './FieldTime.vue'

export default defineComponent({
	name: 'KtFieldDateTime',
	components: {
		FieldTime,
		KtButton,
		KtField,
		VueDatePicker,
	},
	props: makeProps(KottiFieldDateTime.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldDate.Value>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})
		const { forceUpdateKey, inputString, onInput, onBlur } = useSaveOnBlur({
			mode: 'date-time',
			save: field.setValue,
		})

		const i18NContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldDateShared')

		const datePickerRef = ref<DatePickerInstance | null>(null)
		const inputContainerRef = ref<Element | null>(null)
		const internalDateValue = ref<Date | null>()

		// TODO (?)
		// const isInPopover = inject(KT_IS_IN_POPOVER, false)
		//

		return {
			datePickerRef,
			field,
			handleInternalModelChange: (date: Date) => {
				internalDateValue.value = date
			},
			inputContainerRef,
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
			isConfirmDisabled: computed(() => internalDateValue.value === null),
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
				if (!field.isDisabled && !field.isLoading) field.setValue(value)
			},
			timeDisplay: computed(() => {
				if (internalDateValue.value === null) return null

				return dayjs(internalDateValue.value).format('HH:mm')
			}),
			timePickerProps: computed(() => {
				const date = dayjs(field.currentValue)

				return {
					years: date.get('years'),
					months: date.get('months'),
					days: date.get('days'),
				}
			}),
			translations,
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
