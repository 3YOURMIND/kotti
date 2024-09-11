<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-datetime-range"
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
					:enableTimePicker="!isConfirmDisabled"
					:modelValue="cleanedCurrentValue"
					modelType="yyyy-MM-dd HH:mm:ss"
					multi-calendars
					:presetDates="shortcuts"
					range
					teleport
					:ui="{
						calendar: 'date-picker__calendar',
						menu: 'date-picker__menu date-picker--is-datetime date-picker--is-range',
					}"
					@internalModelChange="handleInternalModelChange"
					@rangeStart="onRangeStart"
					@rangeEnd="onRangeEnd"
					@update:modelValue="onUpdateModelValue"
				>
					<template #trigger>
						<div class="kt-field-date-range__input-wrapper">
							<input
								class="kt-field-datetime-range__input"
								autocomplete="off"
								v-bind="inputPropsLeft"
								@blur="saveOnBlurLeft.onBlur"
								@input="saveOnBlurLeft.onInput"
							/>
							<input
								class="kt-field-datetime-range__input"
								autocomplete="off"
								v-bind="inputPropsRight"
								@blur="saveOnBlurRight.onBlur"
								@input="saveOnBlurRight.onInput"
							/>
						</div>
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
						<div class="date-picker__field-time-wrapper">
							<FieldTime
								class="date-picker__field-time"
								v-bind="timePickerPropsTuple[0]"
								:hours="hours[0]"
								:minutes="minutes[0]"
								:seconds="seconds[0]"
								@update:hours="(val) => setHours([val, hours[1]])"
								@update:minutes="(val) => setMinutes([val, minutes[1]])"
								@update:seconds="(val) => setSeconds([val, seconds[1]])"
							/>

							<FieldTime
								class="date-picker__field-time"
								v-bind="timePickerPropsTuple[1]"
								:hours="hours[1]"
								:minutes="minutes[1]"
								:seconds="seconds[1]"
								@update:hours="(val) => setHours([hours[0], val])"
								@update:minutes="(val) => setMinutes([minutes[0], val])"
								@update:seconds="(val) => setSeconds([seconds[0], val])"
							/>
						</div>
					</template>

					<template #action-extra>
						<div class="date-picker__shortcut-list" v-if="shortcuts.length > 0">
							<button
								v-for="(shortcut, index) in shortcuts"
								class="date-picker__shortcut"
								:key="index"
								v-text="shortcut.label"
								@click="onSelectShortcut(shortcut.value)"
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

					<template #clock-icon>
						<div class="date-picker__day-switch">
							<div v-text="timeDisplay[0]" />
							<i class="yoco" v-text="'clock'" />
							<div v-text="timeDisplay[1]" />
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
// import { KT_IS_IN_POPOVER } from '../kotti-popover/constants'
import { makeProps } from '../make-props'

import { KOTTI_FIELD_DATE_SUPPORTS } from './constants'
import { KottiFieldDateTimeRange } from './types'
import dayjs from 'dayjs'
import { useI18nContext, useTranslationNamespace } from '../kotti-i18n/hooks'
// import { isInvalidDate } from './utilities'
import FieldTime from './FieldTime.vue'
import { useSaveOnBlur } from './hooks'

export default defineComponent({
	name: 'KtFieldDateTimeRange',
	components: {
		FieldTime,
		KtButton,
		KtField,
		VueDatePicker,
	},
	props: makeProps(KottiFieldDateTimeRange.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldDateTimeRange.Value>({
			emit,
			isEmpty: ([lhs, rhs]) => lhs === null && rhs === null,
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		const cleanValue = (value: string | null) =>
			value === null ? null : value.replace(/\d\d$/, '00')

		/**
		 */
		const setCleanedValue = ([lhs, rhs]: KottiFieldDateTimeRange.Value) => {
			field.setValue([cleanValue(lhs), cleanValue(rhs)])
		}

		const sortRange = ([
			left,
			right,
		]: KottiFieldDateTimeRange.Value): KottiFieldDateTimeRange.Value => {
			if (left === null || right === null) return [left, right]

			const leftDate = dayjs(left)
			const rightDate = dayjs(right)
			if (leftDate.isBefore(rightDate)) return [left, right]
			return [right, left]
		}

		const saveOnBlurLeft = useSaveOnBlur({
			mode: 'date-time',
			save: (value) =>
				setCleanedValue(sortRange([value, field.currentValue[1]])),
		})
		const saveOnBlurRight = useSaveOnBlur({
			mode: 'date-time',
			save: (value) =>
				setCleanedValue(sortRange([field.currentValue[0], value])),
		})

		const i18NContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldDateShared')

		const datePickerRef = ref<DatePickerInstance | null>(null)
		const inputContainerRef = ref<Element | null>(null)
		const internalRangeValue = ref<[Date | null, Date | null] | null>([
			null,
			null,
		])

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
			isConfirmDisabled: computed(
				() =>
					internalRangeValue.value?.every((value) => value === null) ?? true,
			),
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
			onSelectShortcut: (value: [string, string]) => {
				// datePickerRef.value?.updateInternalModelValue([])
				// datePickerRef.value?.closeMenu?.()
				// datePickerRef.value?.updateInternalModelValue?.(
				// 	value.map((val) => dayjs(val).toDate()),
				// )
				setCleanedValue(value)
			},
			onUpdateModelValue: (value: KottiFieldDateTimeRange.Value) => {
				if (!field.isDisabled && !field.isLoading) setCleanedValue(value)
			},
			saveOnBlurLeft,
			saveOnBlurRight,
			timeDisplay: computed(() => {
				if (internalRangeValue.value.every((value) => value === null))
					return ['', '']

				console.log('timeDisplay', internalRangeValue.value)

				return internalRangeValue.value
					.filter((value) => value !== null)
					.map((value) => dayjs(value).format('YYYY-MM-DD HH:mm'))
			}),
			timePickerPropsTuple: computed(() => {
				const dateRangeStart = dayjs(field.currentValue[0])
				const dateRangeEnd = dayjs(field.currentValue[1])

				return [
					{
						years: dateRangeStart.get('years'),
						months: dateRangeStart.get('months'),
						days: dateRangeStart.get('days'),
					},
					{
						years: dateRangeEnd.get('years'),
						months: dateRangeEnd.get('months'),
						days: dateRangeEnd.get('days'),
					},
				]
			}),
			translations,
		}
	},
})
</script>

<style lang="scss">
@import 'styles';

.dp--tp-wrap {
	max-width: none;
}

.date-picker--is-range.date-picker--is-datetime {
	.date-picker__field-time-wrapper {
		display: flex;
		height: calc(100% - 35px);
	}

	.date-picker__field-time {
		flex-basis: 50%;
	}
}

.date-picker__shortcut-list {
	> .date-picker__shortcut {
		padding: 0.4rem 0;
		font-size: 1em;
		color: var(--link-02);
		text-decoration-line: underline;
		text-decoration-style: solid;
		cursor: pointer;
		background-color: transparent;
		border: 0;

		& + button {
			margin-left: 0.8rem;
		}

		&:hover {
			color: var(--link-03);
		}

		&:active {
			color: var(--link-01);
		}
	}
}
</style>
