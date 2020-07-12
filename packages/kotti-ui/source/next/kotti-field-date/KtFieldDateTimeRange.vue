<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-datetime-range"
		:getEmptyValue="() => [null, null]"
	>
		<div
			ref="inputContainerRef"
			slot="container"
			class="kt-field__input-container"
		>
			<ElDate
				ref="elDateRef"
				v-bind="elDateTimeRangePickerProps"
				@input="onChange"
			/>
		</div>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, ref, Ref, computed } from '@vue/composition-api'
import { DatePicker as ElDate } from 'element-ui'
import { DatePickerOptions, ElDatePicker } from 'element-ui/types/date-picker'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import {
	DATE_TIME_FORMAT_REGEX,
	EL_DATE_RANGE_PROPS,
	EL_DATE_TIME_PROPS,
	KOTTI_FIELD_DATE_TIME_RANGE_PROPS,
	KOTTI_FIELD_DATE_SUPPORTS,
} from './constants'
import { usePicker, ElDateWithInternalAPI } from './hooks'
import { KottiFieldDateTimeRange } from './types'
import { isInvalidDate } from './utilities'

export default defineComponent({
	name: 'KtFieldDateTimeRange',
	components: { ElDate, KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_DATE_TIME_RANGE_PROPS,
	},
	setup(props: KottiFieldDateTimeRange.Props, { emit }) {
		const field = useField<KottiFieldDateTimeRange.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldDateTimeRange.Value =>
				Array.isArray(value) &&
				value.length === 2 &&
				value.every(
					(date) =>
						date === null ||
						(typeof date === 'string' && DATE_TIME_FORMAT_REGEX.test(date)),
				),
			isEmpty: (dateTimeRangeValue) =>
				dateTimeRangeValue.every((dateTime) => dateTime === null),
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		const elDateRef = ref<ElDateWithInternalAPI>(null)

		const inputContainerRef = ref<Element>(null)

		usePicker({
			elDateRef,
			field,
			inputContainerRef,
			popperHeight: '550px',
			popperWidth: '700px',
		})

		const pickerOptions: Ref<Pick<
			DatePickerOptions,
			'shortcuts' | 'disabledDate'
		>> = computed(() => ({
			disabledDate: (date: Date) => isInvalidDate(props, date),
			shortcuts: props.shortcuts.map(
				({
					label,
					value,
					keepOpen,
				}: KottiFieldDateTimeRange.Props['shortcuts'][0]) => ({
					text: label,
					onClick(_picker: ElDatePicker) {
						if (keepOpen !== true) _picker.$emit('pick', value)
						field.setValue(value)
					},
				}),
			),
		}))

		return {
			elDateTimeRangePickerProps: computed(
				(): Partial<ElDate> => ({
					...EL_DATE_TIME_PROPS,
					...EL_DATE_RANGE_PROPS,
					clearable: !field.hideClear,
					disabled: field.isDisabled,
					endPlaceholder: props.placeholder?.[1] ?? undefined,
					pickerOptions: pickerOptions.value,
					startPlaceholder: props.placeholder?.[0] ?? undefined,
					type: 'datetimerange',
					value: field.currentValue.map((date) => date ?? ''),
				}),
			),
			elDateRef,
			field,
			inputContainerRef,
			/**
			 * element-ui emits `null` on clear
			 */
			onChange: (value: KottiFieldDateTimeRange.Value | null) =>
				field.setValue(value === null ? [null, null] : value),
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
