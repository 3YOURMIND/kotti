<template>
	<KtField
		v-bind="{ field }"
		:class="fieldClasses"
		debounceLabelClick
		:getEmptyValue="isRange ? () => [null, null] : () => null"
		:helpTextSlot="$slots.helpText"
		:isRange="isRange"
	>
		<VueDatePicker
			ref="datePickerRef"
			:actionRow="{
				showPreview: false,
			}"
			:dark="isDarkMode"
			:disabled="isDisabled"
			:enableTimePicker="hasTime && !isConfirmDisabled"
			:maxDate="maximumDate ?? undefined"
			:minDate="minimumDate ?? undefined"
			:modelType="hasTime ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'"
			:modelValue="vueDatePickerModelValue"
			:multiCalendars="isRange"
			:preventMinMaxNavigation="minimumDate !== null && maximumDate !== null"
			:range="isRange"
			:teleport="!isInPopover"
			:ui="vueDatePickerClasses"
			@internalModelChange="onInternalModelChange"
			@rangeEnd="onRangeEnd"
			@rangeStart="onRangeStart"
			@update:modelValue="onUpdateModelValue"
		>
			<template #trigger>
				<div class="kt-field-date__input-wrapper">
					<i class="yoco" v-text="hasTime ? 'calendar_clock' : 'calendar'" />
					<input
						v-bind="inputProps"
						:id="isRange ? `${inputProps.id}-start` : inputProps.id"
						:forceUpdateKey="saveOnBlurLeft.forceUpdateKey"
						:placeholder="placeholderLeft"
						:value="valueLeft"
						@blur="saveOnBlurLeft.onBlur"
						@input="saveOnBlurLeft.onInput"
					/>
					<input
						v-if="isRange"
						v-bind="inputProps"
						:id="`${inputProps.id}-end`"
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
				<div class="kt-field-date-popover__times">
					<FieldTime
						class="kt-field-date-popover__time"
						v-bind="timePickerPropsLeft"
						:hours="Array.isArray(hours) ? hours[0] : hours"
						:minutes="Array.isArray(minutes) ? minutes[0] : minutes"
						:seconds="Array.isArray(seconds) ? seconds[0] : seconds"
						@update:hours="
							(val: number | null) =>
								Array.isArray(hours) ? setHours([val, hours[1]]) : setHours(val)
						"
						@update:minutes="
							(val: number | null) =>
								Array.isArray(minutes)
									? setMinutes([val, minutes[1]])
									: setMinutes(val)
						"
						@update:seconds="
							(val: number | null) =>
								Array.isArray(seconds)
									? setSeconds([val, seconds[1]])
									: setSeconds(val)
						"
					/>
					<FieldTime
						v-if="timePickerPropsRight"
						class="kt-field-date-popover__time"
						v-bind="timePickerPropsRight"
						:hours="hours[1]"
						:minutes="minutes[1]"
						:seconds="seconds[1]"
						@update:hours="(val: number) => setHours([hours[0], val])"
						@update:minutes="(val: number) => setMinutes([minutes[0], val])"
						@update:seconds="(val: number) => setSeconds([seconds[0], val])"
					/>
				</div>
			</template>

			<template #action-extra>
				<div
					v-if="shortcuts.length > 0"
					class="kt-field-date-popover__shortcuts"
				>
					<KtButton
						v-for="(shortcut, index) in shortcuts"
						:key="index"
						class="kt-field-date-popover__shortcut"
						:label="shortcut.label"
						size="small"
						type="text"
						@click="onSelectShortcut(shortcut.value)"
					/>
				</div>
			</template>

			<template #action-buttons>
				<div class="kt-field-date-popover__buttons">
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
				<div class="kt-field-date-popover__day-switch">
					<div v-text="timePreviewLeft" />
					<i class="yoco" v-text="'clock'" />
					<div v-if="isRange" v-text="timePreviewRight" />
				</div>
			</template>

			<template #calendar-icon>
				<i
					class="kt-field-date-popover__date-switch yoco"
					v-text="'calendar'"
				/>
			</template>

			<template #arrow-left>
				<i class="yoco" v-text="'chevron_left'" />
			</template>

			<template #arrow-right>
				<i class="yoco" v-text="'chevron_right'" />
			</template>
		</VueDatePicker>
	</KtField>
</template>

<script lang="ts">
import VueDatePicker from '@vuepic/vue-datepicker'
import type { DatePickerInstance } from '@vuepic/vue-datepicker'
import dayjs from 'dayjs'
import type { InputHTMLAttributes, PropType } from 'vue'
import { computed, defineComponent, inject, ref } from 'vue'

import { KtButton } from '../../kotti-button'
import { KtField } from '../../kotti-field'
import { useField } from '../../kotti-field/hooks'
import { useI18nContext, useTranslationNamespace } from '../../kotti-i18n/hooks'
import { KT_IS_IN_POPOVER } from '../../kotti-popover/constants'
import { makeProps } from '../../make-props'
import { isDarkMode } from '../../utilities/color-scheme'
import { KOTTI_FIELD_DATE_SUPPORTS } from '../constants'
import { useSaveOnBlur } from '../hooks'
import type {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTime,
	KottiFieldDateTimeRange,
} from '../types'
import { Shared } from '../types'

import FieldTime from './FieldTime.vue'

type AnyDateValue =
	| KottiFieldDate.ModelValue
	| KottiFieldDateRange.ModelValue
	| KottiFieldDateTime.ModelValue
	| KottiFieldDateTimeRange.ModelValue

type SingleDateValue = KottiFieldDate.ModelValue | KottiFieldDateTime.ModelValue

type RangeDateValue =
	| KottiFieldDateRange.ModelValue
	| KottiFieldDateTimeRange.ModelValue

type InternalRangeValue = [Date | null, Date | null]
type InternalDateValue = Date | null
type InternalValue = InternalDateValue | InternalRangeValue

export default defineComponent({
	name: 'GenericDateField',
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
		modelValue: {
			required: true,
			type: [String, Array, null] as PropType<AnyDateValue>,
		},
		placeholder: {
			required: true,
			type: [String, Array, null] as PropType<
				[string | null, string | null] | string | null
			>,
		},
		shortcuts: {
			required: true,
			type: Array as PropType<
				Array<{ label: string; value: [string, string] | string }>
			>,
		},
	},
	emits: ['update:modelValue'],
	setup(props, { emit }) {
		const isInPopover = inject(KT_IS_IN_POPOVER, false)

		const field = useField<AnyDateValue>({
			emit,
			isEmpty: (value) =>
				props.isRange
					? (value as RangeDateValue).every((v) => v === null)
					: (value as SingleDateValue) === null,
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		const setCleanedValue = (value: AnyDateValue) => {
			const cleanValue = (v: string | null) =>
				v === null ? null : v.replace(/\d\d$/, '00')

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

		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const internalValue = ref<InternalValue>(
			props.isRange ? [null, null] : null,
		)

		const getTimePreview = (datetime: InternalDateValue) =>
			datetime === null ? '' : dayjs(datetime).format(formatString.value)

		return {
			datePickerRef,
			field,
			fieldClasses: computed(() => {
				const classes = ['kt-field-date']

				if (props.isRange) classes.push('kt-field-date--is-range')
				if (props.hasTime) classes.push('kt-field-date--has-time')

				return classes
			}),
			inputProps: computed(
				(): InputHTMLAttributes & {
					class: string[]
				} => {
					return {
						...field.inputProps,
						autocomplete: 'off',
						class: ['kt-field-date__input'],
						size: 1,
						type: 'text',
					}
				},
			),
			isConfirmDisabled: computed(() =>
				props.isRange
					? (internalValue.value as InternalRangeValue).every((v) => v === null)
					: (internalValue.value as InternalDateValue) === null,
			),
			isDarkMode,
			isInPopover,
			locale: computed(() => i18NContext.locale),
			onCloseMenu: () => {
				datePickerRef.value?.closeMenu?.()
			},
			onInternalModelChange: (value: InternalValue) => {
				// HACK: VueDatePicker can in some cases emit a single null for ranges.
				// In order to not mess with our logic we cast this to an array
				internalValue.value =
					props.isRange && value === null ? [null, null] : value
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
				datePickerRef.value?.closeMenu?.()
			},
			onUpdateModelValue: (value: AnyDateValue) => {
				if (!field.isDisabled && !field.isLoading) setCleanedValue(value)
			},
			placeholderLeft: computed(() =>
				props.isRange
					? ((props.placeholder as [string | null, string | null])[0] ??
						undefined)
					: (props.placeholder ?? undefined),
			),
			placeholderRight: computed(() =>
				props.isRange
					? ((props.placeholder as [string | null, string | null])[1] ??
						undefined)
					: undefined,
			),
			saveOnBlurLeft,
			saveOnBlurRight,
			timePickerPropsLeft: computed(() => {
				const dateRangeStart = props.isRange
					? dayjs((field.currentValue as RangeDateValue)[0])
					: dayjs(field.currentValue as SingleDateValue)

				return {
					days: dateRangeStart.get('days'),
					months: dateRangeStart.get('months'),
					years: dateRangeStart.get('years'),
				}
			}),
			timePickerPropsRight: computed(() => {
				if (!props.isRange) return null
				const dateRangeEnd = dayjs((field.currentValue as RangeDateValue)[1])

				return {
					days: dateRangeEnd.get('days'),
					months: dateRangeEnd.get('months'),
					years: dateRangeEnd.get('years'),
				}
			}),
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
			vueDatePickerClasses: computed(() => ({
				calendar: 'kt-field-date-popover__calendar',
				menu: (() => {
					const classes = ['kt-field-date-popover']

					if (props.isRange) classes.push('kt-field-date-popover--is-range')
					if (props.hasTime) classes.push('kt-field-date-popover--has-time')

					return classes.join(' ')
				})(),
			})),
			vueDatePickerModelValue: computed(() => {
				if (props.isRange) {
					const [lhs, rhs] = field.currentValue as RangeDateValue
					return [lhs ?? '', rhs ?? '']
				}
				return (field.currentValue as SingleDateValue) ?? ''
			}),
		}
	},
})
</script>

<style lang="scss">
@import '@vuepic/vue-datepicker/dist/main.css';
@import '../../kotti-field/mixins';
@import '../../kotti-style/_variables';

.kt-field-date {
	&__input {
		display: flex;
		width: 100%;
		padding: 0;
		margin: 0;
		line-height: 1.6;
		border: 0;
	}

	&__input-wrapper {
		display: flex;
		gap: var(--unit-4);
		align-items: center;

		.yoco {
			display: flex;
			align-items: center;
			min-width: 1.1em;
			font-size: 1.1em;
			color: var(--icon-02);
		}
	}
}

.kt-field-date-popover {
	// HACK: the default is set to 0.8rem, which assumes a base font-size of 16px.
	// Since we have 20px, we have to adjust the relative size somewhat
	--dp-preview-font-size: 0.64rem;
	--dp-primary-color: var(--interactive-01);
	--dp-hover-color: var(--interactive-02-hover);
	--dp-hover-text-color: var(--interactive-01);

	padding: var(--unit-3);
	font-size: 0.7rem;

	/* stylelint-disable selector-class-pattern */
	.dp__instance_calendar .dp__flex_display {
		// gap between calendars
		gap: var(--unit-4);
	}

	.dp__menu_inner {
		padding: 0;
	}

	/* stylelint-enable selector-class-pattern */

	/**
	 * wrapper for the open timepicker button
	 */
	.dp--tp-wrap {
		max-width: none;
	}

	.yoco {
		font-size: 1.2rem;
	}

	&__buttons {
		display: flex;
		gap: 10px;
		align-items: center;
		justify-content: flex-end;
		width: 100%;
	}

	/* stylelint-disable selector-class-pattern */
	&__calendar .dp__calendar_header_item {
		display: flex;
		align-items: center;
		font-size: 0.6rem;
		color: var(--text-03);
		text-transform: uppercase;
	}
	/* stylelint-enable selector-class-pattern */

	&__day-switch {
		display: flex;
		flex-direction: row-reverse;
		gap: 20px;
		align-items: center;
		justify-content: space-evenly;
	}

	&__date-switch,
	&__day-switch {
		font-weight: 500;
		color: var(--interactive-01);

		&:hover {
			color: var(--interactive-01-hover);
		}
	}

	&__shortcut {
		padding: 0 var(--unit-1) !important;

		&:hover {
			color: var(--link-03);
		}

		&:active {
			color: var(--link-01);
		}
	}

	&__shortcuts {
		display: flex;
		flex-wrap: wrap;
		gap: var(--unit-1);
		margin: var(--unit-3) 0;
	}

	&__time {
		width: 100%;
		padding: 0 !important;
	}

	&--has-time &__times {
		display: flex;
		gap: var(--unit-4);
		justify-content: stretch;
		height: calc(100% - 35px);
	}

	&--is-range.kt-field-date-popover--has-time &__day-switch {
		flex-direction: row;
		width: 100%;

		> div {
			flex-basis: 33%;
		}
	}
}
</style>
