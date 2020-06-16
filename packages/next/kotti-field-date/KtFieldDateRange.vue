<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-daterange"
		:getEmptyValue="() => [null, null]"
		isComponent="div"
	>
		<div
			ref="inputContainerRef"
			slot="container"
			class="kt-field__input-container"
		>
			<ElDate
				ref="elDateRef"
				v-bind="elDateRangePickerProps"
				:disabled="field.isDisabled"
				type="daterange"
				:value="field.currentValue"
				@input="onChange"
			/>
		</div>
	</KtField>
</template>

<script lang="ts">
import './styles.scss'
import { defineComponent, ref, Ref, computed } from '@vue/composition-api'
import { DatePicker as ElDate } from 'element-ui'
import { DatePickerOptions, ElDatePicker } from 'element-ui/types/date-picker'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import {
	DATE_FORMAT_REGEX,
	KOTTI_FIELD_DATE_RANGE_PROPS,
	EL_DATE_PROPS,
	EL_DATE_RANGE_PROPS,
} from './constants'
import { usePicker, ElDateComponent } from './hooks'
import { KottiFieldDateRange } from './types'
import { isInvalidDate } from './utils'

export default defineComponent({
	name: 'KtFieldDateRange',
	components: { ElDate, KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_DATE_RANGE_PROPS,
	},
	setup(props: KottiFieldDateRange.Props, { emit }) {
		const field = useField<KottiFieldDateRange.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldDateRange.Value =>
				Array.isArray(value) &&
				value.every(
					(date) =>
						date === null ||
						(typeof date === 'string' && DATE_FORMAT_REGEX.test(date)),
				),

			isEmpty: (dateRangeValue) => dateRangeValue.every((date) => date === ''),
			props,
			supports: {
				clear: false,
				decoration: false,
				placeholder: false,
				tabIndex: false,
			},
		})

		const elDateRef = ref<ElDateComponent>(null)

		const inputContainerRef = ref<Element>(null)

		usePicker(elDateRef, inputContainerRef, field, '700px')

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
				}: KottiFieldDateRange.Props['shortcuts'][0]) => ({
					text: label,
					onClick(_picker: ElDatePicker) {
						// const newValue = (() => {
						// 	if (typeof value === 'string') {
						// 		if (!dayjs(value).isValid()) return field.currentValue

						// 		const [start, end] = field.currentValue
						// 		if (start !== null && dayjs(start).isBefore(value))
						// 			return [start, value]
						// 		if (end !== null && dayjs(end).isAfter(value))
						// 			return [value, end]

						// 		return [value, end]
						// 	}
						// })()
						// if (keepOpen !== true) _picker.$emit('pick', newValue)
						// field.setValue(newValue)
						if (keepOpen !== true) _picker.$emit('pick', value)
						field.setValue(value)
					},
				}),
			),
		}))

		return {
			elDateRangePickerProps: computed(
				() =>
					({
						...EL_DATE_PROPS,
						...EL_DATE_RANGE_PROPS,
						pickerOptions: pickerOptions.value,
						//TODO add start/end placeholder logic
					} as Partial<ElDate>),
			),
			elDateRef,
			field,
			inputContainerRef,
			onChange: (value: KottiFieldDateRange.Value) => field.setValue(value),
		}
	},
})
</script>
