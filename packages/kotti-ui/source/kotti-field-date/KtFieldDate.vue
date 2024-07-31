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
				<!-- <VueDatePicker
					autoApply
					:enableTimePicker="false"
					:modelValue="field.currentValue"
					modelType="yyyy-MM-dd"
					:ui="{
						calendar: 'date-picker__calendar',
						calendarCell: 'date-picker__calendar-cell',
					}"
					@update:modelValue="onInput"
				>
					<template #trigger>
						<input class="kt-field-text__wrapper" v-bind="inputProps" />
					</template>
				</VueDatePicker> -->
				<VueDatePicker
					ref="datePickerRef"
					:actionRow="{
						showPreview: false,
						showCancel: false,
						showSelect: false,
					}"
					:config="{
						onClickOutside: handleClickOutside,
					}"
					:enableTimePicker="!isConfirmDisabled"
					format="yyyy-MM-dd HH:mm"
					:locale="locale"
					:maxDate="maximumDate"
					:minDate="minimumDate"
					:modelValue="field.currentValue"
					modelType="yyyy-MM-dd HH:mm"
					:offset="18"
					:presetDates="shortcuts"
					teleport
					:textInput="{
						format: 'yyyy-MM-dd HH:mm',
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
							class="kt-field-text__wrapper"
							v-bind="inputProps"
							@blur="onBlur"
							@focus="onFocus"
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
import dayjs from 'dayjs'
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

import {
	// EL_DATE_PROPS,
	KOTTI_FIELD_DATE_SUPPORTS,
} from './constants'
// import type { ElDateWithInternalAPI } from './hooks'
// import { usePicker } from './hooks'
import { KottiFieldDate } from './types'
import FieldTime from './FieldTime.vue'

export default defineComponent({
	name: 'KtFieldDate',
	components: {
		// ElDatePicker,
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

		const i18NContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldDateShared')

		// const elDateRef = ref<ElDateWithInternalAPI | null>(null)
		const datePickerRef = ref<DatePickerInstance | null>(null)
		const inputContainerRef = ref<Element | null>(null)
		const internalDateValue = ref<Date | null>()

		const isEditing = ref(false)

		// usePicker({
		// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// 	elDateRef: elDateRef as any,
		// 	field,
		// 	inputContainerRef,
		// 	popperHeight: '470px',
		// 	popperWidth: '400px',
		// })

		// const isInPopover = inject(KT_IS_IN_POPOVER, false)

		return {
			// elDatePickerProps: computed(
			// 	(): Partial<DatePickerInstance> => ({
			// 		...EL_DATE_PROPS,
			// 		/**
			// 		 * @see {@link https://github.com/ElemeFE/element/blob/v2.13.1/packages/date-picker/src/picker.vue#L334)}
			// 		 * */
			// 		clearable: !field.hideClear,
			// 		// @ts-expect-error We put data-test despite el-date-picker does not know this prop
			// 		'data-test': field.inputProps['data-test'],
			// 		disabled: field.isDisabled || field.isLoading,
			// 		disabledDate: (date: Date) => isInvalidDate(props, date),
			// 		id: field.inputProps.id,
			// 		modelValue: field.currentValue ?? '',
			// 		placeholder: props.placeholder ?? '',
			// 		popperClass: 'foobar',
			// 		shortcuts: props.shortcuts.map(({ label, value, keepOpen }) => ({
			// 			text: label,
			// 			value: () => new Date(value),
			// 		})),
			// 		teleported: !isInPopover,
			// 		type: 'date',
			// 	}),
			// ),
			// --eslint-disable-next-line @typescript-eslint/no-explicit-any
			// elDateRef: elDateRef as any,
			datePickerRef,
			field,
			handleInternalModelChange: (date: Date) => {
				internalDateValue.value = date
			},
			handleClickOutside: () => {},
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
					// forceUpdateKey: number
				} => {
					const value = (() => {
						if (isEditing.value) return field.currentValue ?? ''

						if (internalDateValue.value)
							return dayjs(internalDateValue.value).format('YYYY-MM-DD HH:mm')

						return ''
					})()

					console.log({ value })

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
			isConfirmDisabled: computed(() => internalDateValue.value === null),
			locale: computed(() => i18NContext.locale),
			onUpdateModelValue: (value: KottiFieldDate.Value) => {
				if (!field.isDisabled && !field.isLoading) field.setValue(value)
			},
			onSelectDate: (value: string | null) => {
				datePickerRef.value?.selectDate?.(value)
			},
			timeDisplay: computed(() => {
				if (internalDateValue.value == null) return null

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
			onCloseMenu: () => {
				datePickerRef.value?.closeMenu?.()
			},
			onInput: (event: InputEvent) => {
				const inputString = (event.target as HTMLInputElement).value as string
				const date = dayjs(inputString)

				if (!date.isValid()) return

				datePickerRef.value?.updateInternalModelValue?.(date.toDate())

				// const result = date.format('YYYY-MM-DD HH:mm')
				// if (
				// 	/^\d\d\d\d-([2-9]|\d\d)-([4-9]|\d\d)( ([3-9]|\d\d):([6-9]|\d\d))?$/.test(
				// 		inputString,
				// 	)
				// ) {
				// 	field.setValue(result)
				// 	return
				// }

				// if (date.isValid()) {
				// 	// datePickerRef.value?.updateInternalModelValue?.(date.toDate())
				// 	field.setValue(result)
				// }
			},
			onBlur: () => {
				isEditing.value = false

				if (internalDateValue.value === null) {
					field.setValue(null)
					return
				}

				const date = dayjs(internalDateValue.value)
				if (!date.isValid()) return

				const result = date.format('YYYY-MM-DD HH:mm')
				field.setValue(result)
			},
			onFocus: () => {
				isEditing.value = true
			},
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';
@import 'styles';

.dp__outer_menu_wrap {
	.date-picker {
		&__action-buttons {
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
		}

		&__calendar {
			.dp__calendar_header_item {
				display: flex;
				align-items: center;
				font-size: 0.6rem;
				color: var(--text-03);
				text-transform: uppercase;
			}
		}

		&__day-switch {
			display: flex;
			align-items: center;
			gap: 20px;
		}

		&__menu {
			// HACK: the default is set to 0.8rem, which assumes a base font-size of 16px.
			// Since we have 20px, we have to adjust the relative size somewhat
			--dp-preview-font-size: 0.64rem;
			--dp-primary-coler: var(--interactive-01);
			--dp-hover-color: var(--interactive-02-hover);
			--dp-hover-text-color: var(--interactive-01);

			display: grid;
			grid-template-areas:
				'left-side-bar calendar'
				'left-side-bar actions';

			font-family: $base-font-family;
			font-size: 0.7rem;

			.dp {
				&__action_buttons {
					flex-grow: 1;
				}

				&__action-row {
					grid-area: actions;
				}

				&__instance_calendar {
					grid-area: calendar;
					position: relative;
				}

				&__menu_content_wrapper {
					display: contents;
				}

				&--preset-dates {
					grid-area: left-side-bar;
				}
			}

			.yoco {
				font-size: 1.2rem;
			}
		}
	}
}

.kt-field-text__wrapper {
	display: flex;
	width: 100%;
	padding: 0;
	margin: 0;
	line-height: 1.6;
	border: 0;
}
</style>
