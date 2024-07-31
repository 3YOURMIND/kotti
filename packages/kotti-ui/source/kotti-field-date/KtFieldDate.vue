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
					format="yyyy-MM-dd"
					:modelValue="field.currentValue"
					modelType="yyyy-MM-dd"
					:ui="{
						calendar: 'date-picker__calendar',
						calendarCell: 'date-picker__calendar-cell',
					}"
					@update:modelValue="onInput"
				/> -->
				<VueDatePicker
					ref="datePickerRef"
					:actionRow="{
						showPreview: false,
						showCancel: false,
						showSelect: false,
					}"
					format="yyyy-MM-dd HH:mm"
					:locale="locale"
					:maxDate="maximumDate"
					:minDate="minimumDate"
					modelType="yyyy-MM-dd HH:mm"
					:modelValue="field.currentValue"
					:offset="20"
					:presetDates="shortcuts"
					:ui="{
						calendar: 'date-picker__calendar',
						calendarCell: 'date-picker__calendar-cell',
						menu: 'date-picker__menu',
					}"
					utc="preserve"
					@update:modelValue="onInput"
				>
					<!-- :timezone="{ convertModel: false }" -->
					<template #trigger>
						<input class="kt-field-text__wrapper" v-bind="inputProps" />
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
						<!-- TODO: Add I18N to button -->
						<!-- class="date-picker__confirm" -->
						<KtButton
							:label="translations.confirmButton"
							size="small"
							type="primary"
							@click="selectDate"
						/>
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
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
					// forceUpdateKey: number
				} => ({
					...field.inputProps,
					class: ['kt-field-text__wrapper'],
					// forceUpdateKey: forceUpdateKey.value,
					type: 'text',
					size: 1,
					value: field.currentValue ?? '',
					placeholder: props.placeholder ?? undefined,
				}),
			),
			inputContainerRef,
			locale: computed(() => i18NContext.locale),
			onInput: (value: KottiFieldDate.Value) => {
				console.log(value)
				if (!field.isDisabled && !field.isLoading) field.setValue(value)
			},
			selectDate: (value: string | null) => {
				datePickerRef.value?.selectDate?.(value)
			},
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
@import '../kotti-style/_variables.scss';
@import 'styles';

.kt-field-date {
	.date-picker {
		&__calendar {
			.dp__calendar_header_item {
				display: flex;
				align-items: center;
				font-size: 0.6rem;
				color: var(--text-03);
				text-transform: uppercase;
			}
		}

		&__calendar-cell {
			font-size: 0.7rem;
		}

		&__menu {
			// HACK: the default is set to 0.8rem, which assumes a base font-size of 16px.
			// Since we have 20px, we have to adjust the relative size somewhat
			--dp-preview-font-size: 0.64rem;
			--dp-primary-coler: var(--interactive-01);
			--dp-hover-color: var(--interactive-02-hover);
			--dp-hover-text-color: var(--interactive-01);
			font-family: $base-font-family;

			.dp--preset-dates {
				font-size: 0.7rem;
			}

			.dp__instance_calendar {
				position: relative;
			}

			/* .dp__action_row {
				padding: 0;
			} */
		}

		&__confirm {
			position: absolute;
			bottom: 10px;
			right: 10px;
			font-size: 14px;
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
