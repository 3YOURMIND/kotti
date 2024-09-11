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
			<div class="kt-field__input-container">
				<VueDatePicker
					ref="datePickerRef"
					:actionRow="{
						showPreview: false,
					}"
					:enableTimePicker="hasTime && !isConfirmDisabled"
					:modelType="hasTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'"
					:modelValue="cleanedCurrentValue"
					:multiCalendars="isRange"
					:range="isRange"
					teleport
					:ui="{
						calendar: 'date-picker__calendar',
						menu: 'date-picker__menu date-picker--is-datetime date-picker--is-range',
					}"
					@internalModelChange="onInternalModelChange"
					@rangeEnd="onRangeEnd"
					@rangeStart="onRangeStart"
					@update:modelValue="onUpdateModelValue"
				>
					<template #trigger>
						<div class="kt-field-date-range__input-wrapper">
							<input
								v-bind="inputProps"
								autocomplete="off"
								class="kt-field-datetime-range__input"
								:forceUpdateKey="saveOnBlurLeft.forceUpdateKey"
								:placeholder="placeholderLeft"
								:value="valueLeft"
								@blur="saveOnBlurLeft.onBlur"
								@input="saveOnBlurLeft.onInput"
							/>
							<input
								v-if="isRange"
								v-bind="inputProps"
								autocomplete="off"
								class="kt-field-datetime-range__input"
								:forceUpdateKey="saveOnBlurRight.forceUpdateKey"
								:placeholder="placeholderRight"
								:value="valueRight"
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
								v-bind="timePickerPropsLeft"
								:hours="hours[0]"
								:minutes="minutes[0]"
								:seconds="seconds[0]"
								@update:hours="(val) => setHours([val, hours[1]])"
								@update:minutes="(val) => setMinutes([val, minutes[1]])"
								@update:seconds="(val) => setSeconds([val, seconds[1]])"
							/>

							<FieldTime
								v-if="timePickerPropsRight"
								class="date-picker__field-time"
								v-bind="timePickerPropsRight"
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
						<div v-if="shortcuts.length > 0" class="date-picker__shortcut-list">
							<button
								v-for="(shortcut, index) in shortcuts"
								:key="index"
								class="date-picker__shortcut"
								@click="onSelectShortcut(shortcut.value)"
								v-text="shortcut.label"
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
							<div v-text="timePreviewLeft" />
							<i class="yoco" v-text="'clock'" />
							<div v-if="isRange" v-text="timePreviewRight" />
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
import type { InputHTMLAttributes, PropType } from '@vue/runtime-dom'
import VueDatePicker from '@vuepic/vue-datepicker'
import type { DatePickerInstance } from '@vuepic/vue-datepicker'
import dayjs from 'dayjs'

import { KtButton } from '../../kotti-button'
import { KtField } from '../../kotti-field'
import { useField } from '../../kotti-field/hooks'
// import { KT_IS_IN_POPOVER } from '../../kotti-popover/constants'
import { makeProps } from '../../make-props'

import { KOTTI_FIELD_DATE_SUPPORTS } from '../constants'
import type {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTime,
	KottiFieldDateTimeRange,
} from '../types'
import { Shared } from '../types'
import { useI18nContext, useTranslationNamespace } from '../../kotti-i18n/hooks'
import { useSaveOnBlur } from '../hooks'
// import { isInvalidDate } from './utilities'
import FieldTime from './FieldTime.vue'

type AnyDateValue =
	| KottiFieldDate.Value
	| KottiFieldDateRange.Value
	| KottiFieldDateTime.Value
	| KottiFieldDateTimeRange.Value

// type SimpleDateValue = KottiFieldDate.Value | KottiFieldDateRange.Value

// type DateTimeValue = KottiFieldDateTime.Value | KottiFieldDateTimeRange.Value

type SingleDateValue = KottiFieldDate.Value | KottiFieldDateTime.Value

type RangeDateValue = KottiFieldDateRange.Value | KottiFieldDateTimeRange.Value

type InternalRangeValue = [Date | null, Date | null]
type InternalDateValue = Date | null
type InternalValue = InternalDateValue | InternalRangeValue

export default defineComponent({
	name: 'KtFieldDateTimeRange',
	components: {
		FieldTime,
		KtButton,
		KtField,
		VueDatePicker,
	},
	props: {
		...makeProps(Shared.propsSchema),
		hasTime: { default: false, type: Boolean },
		isRange: { default: false, type: Boolean },
		placeholder: {
			required: true,
			type: [String, Array, null] as PropType<
				string | null | [string | null, string | null]
			>,
		},
		shortcuts: { required: true, type: Array },
		// eslint-disable-next-line vue/no-unused-properties
		value: {
			required: true,
			type: [String, Array, null] as PropType<AnyDateValue>,
		},
	},
	setup(props, { emit }) {
		const field = useField<AnyDateValue>({
			emit,
			isEmpty: (value) =>
				props.isRange
					? (value as RangeDateValue).every((v) => v === null)
					: (value as SingleDateValue) === null,
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		/**
		 */
		const setCleanedValue = (value: AnyDateValue) => {
			const cleanValue = (value: string | null) =>
				value === null ? null : value.replace(/\d\d$/, '00')
			const sortRange = ([left, right]: RangeDateValue): RangeDateValue => {
				if (left === null || right === null) return [left, right]

				const leftDate = dayjs(left)
				const rightDate = dayjs(right)
				if (leftDate.isBefore(rightDate)) return [left, right]
				return [right, left]
			}

			if (props.isRange) {
				const [lhs, rhs] = value as RangeDateValue
				field.setValue(
					sortRange(
						props.hasTime ? [cleanValue(lhs), cleanValue(rhs)] : [lhs, rhs],
					),
				)
				return
			}

			const date = value as SingleDateValue
			field.setValue(props.hasTime ? cleanValue(date) : date)
		}

		const blurMode = computed(() => (props.isRange ? 'date-time' : 'date'))
		const formatString = computed(() =>
			props.hasTime ? 'YYYY-MM-DD HH:mm' : 'YYYY-MM-DD',
		)

		const saveOnBlurLeft = useSaveOnBlur({
			mode: blurMode.value,
			save: setCleanedValue,
		})
		const saveOnBlurRight = useSaveOnBlur({
			mode: blurMode.value,
			save: setCleanedValue,
		})

		const i18NContext = useI18nContext()
		const translations = useTranslationNamespace('KtFieldDateShared')

		const datePickerRef = ref<DatePickerInstance | null>(null)
		// const inputContainerRef = ref<Element | null>(null)

		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const internalValue = ref<InternalValue>(
			props.isRange ? [null, null] : null,
		)

		const getTimePreview = (datetime: InternalDateValue) =>
			datetime === null ? '' : dayjs(datetime).format(formatString.value)

		// TODO (?)
		// const isInPopover = inject(KT_IS_IN_POPOVER, false)

		return {
			cleanedCurrentValue: computed(() => {
				if (props.isRange) {
					const [lhs, rhs] = field.currentValue as RangeDateValue
					return [lhs ?? '', rhs ?? '']
				}
				return (field.currentValue as SingleDateValue) ?? ''
			}),
			datePickerRef,
			field,
			onInternalModelChange: (value: InternalValue) => {
				internalValue.value = value
			},
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
				} => {
					return {
						...field.inputProps,
						class: ['kt-field-text__wrapper'],
						type: 'text',
						size: 1,
					}
				},
			),
			isConfirmDisabled: computed(() => field.isEmpty),
			locale: computed(() => i18NContext.locale),
			onCloseMenu: () => {
				datePickerRef.value?.closeMenu?.()
			},
			onRangeEnd: (value: Date) => {
				const rangeStart = (internalValue.value as InternalRangeValue)[0]
				if (rangeStart === null) {
					throw new Error(
						'Range end was triggered without a matching range start',
					)
				}
				internalValue.value =
					value <= rangeStart ? [value, rangeStart] : [rangeStart, value]
			},
			onRangeStart: (value: Date) => {
				internalValue.value = [value, null]
			},
			onSelectDate: (value: AnyDateValue) => {
				datePickerRef.value?.selectDate?.(value)
			},
			onSelectShortcut: (value: AnyDateValue) => {
				setCleanedValue(value)
			},
			onUpdateModelValue: (value: AnyDateValue) => {
				if (!field.isDisabled && !field.isLoading) setCleanedValue(value)
			},
			placeholderLeft: computed(() =>
				props.isRange
					? (props.placeholder as [string | null, string | null])[0] ??
						undefined
					: props.placeholder ?? undefined,
			),
			placeholderRight: computed(() =>
				props.isRange
					? (props.placeholder as [string | null, string | null])[1] ??
						undefined
					: undefined,
			),
			saveOnBlurLeft,
			saveOnBlurRight,
			timePreviewLeft: computed(() =>
				props.isRange
					? getTimePreview((internalValue.value as InternalRangeValue)[0])
					: getTimePreview(internalValue.value as InternalDateValue),
			),
			timePreviewRight: computed(() =>
				props.isRange
					? getTimePreview((internalValue.value as InternalRangeValue)[1])
					: '',
			),
			timePickerPropsLeft: computed(() => {
				const dateRangeStart = props.isRange
					? dayjs((field.currentValue as RangeDateValue)[0])
					: dayjs(field.currentValue as SingleDateValue)

				return {
					years: dateRangeStart.get('years'),
					months: dateRangeStart.get('months'),
					days: dateRangeStart.get('days'),
				}
			}),
			timePickerPropsRight: computed(() => {
				if (!props.isRange) return null
				const dateRangeEnd = dayjs((field.currentValue as RangeDateValue)[1])

				return {
					years: dateRangeEnd.get('years'),
					months: dateRangeEnd.get('months'),
					days: dateRangeEnd.get('days'),
				}
			}),
			translations,
			valueLeft: computed(
				() =>
					saveOnBlurLeft.inputString.value ??
					(props.isRange
						? (field.currentValue as RangeDateValue)[0]
						: (field.currentValue as SingleDateValue)) ??
					'',
			),
			valueRight: computed(
				() =>
					saveOnBlurLeft.inputString.value ??
					(props.isRange ? (field.currentValue as RangeDateValue)[1] : '') ??
					'',
			),
		}
	},
})
</script>

<style lang="scss">
@import '@vuepic/vue-datepicker/dist/main.css';
@import '../../kotti-field/mixins.scss';
@import '../../kotti-style/_variables.scss';

// INPUT STYLES OF ALL DATE-PICKERS
.kt-field-date,
.kt-field-date-range,
.kt-field-datetime,
.kt-field-datetime-range {
	/* .kt-field__input-container {
		width: 100%;
		margin: 0;

		&:not(:last-child) {
			margin-bottom: 0.4rem;
		}
	} */

	&__input-wrapper {
		display: flex;
		align-items: center;
		gap: var(--unit-4);
	}

	&__input {
		display: flex;
		width: 100%;
		padding: 0;
		margin: 0;
		line-height: 1.6;
		border: 0;
	}
}

/*
// POPPER STYLE OF ALL DATE-PICKERS
$icon-size: 1.3rem;
$month-font-size: 1.2rem;
$td-diameter: 1.5rem;
$year-font-size: 1rem; */

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
			justify-content: space-evenly;
			width: 100%;
			gap: 20px;
			> div {
				flex-basis: 33%;
			}
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
