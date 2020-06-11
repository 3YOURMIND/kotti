<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-date"
		:getEmptyValue="() => null"
		isComponent="div"
	>
		<div
			ref="inputContainerRef"
			slot="container"
			class="kt-field__input-container"
		>
			<ElDate
				ref="elDateRef"
				v-bind="elDatePickerProps"
				:disabled="field.isDisabled"
				:placeholder="field.placeholder"
				type="date"
				:value="field.currentValue"
				@input="onChange"
			/>
		</div>
	</KtField>
</template>

<script lang="ts">
import './styles.scss'
import { defineComponent, ref, Ref, computed } from '@vue/composition-api'
import dayjs from 'dayjs'
import { DatePicker as ElDate } from 'element-ui'
import { DatePickerOptions, ElDatePicker } from 'element-ui/types/date-picker'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import {
	DATE_INTERNAL_PROPS,
	DATE_FORMAT_REGEX,
	KOTTI_FIELD_DATE_SHARED_PROPS,
	KOTTI_FIELD_DATE_PROPS,
} from './constants'
import { usePicker, ElDateComponent } from './hooks'
import { KottiFieldDate } from './types'

export default defineComponent({
	name: 'KtFieldDate',
	components: { ElDate, KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_DATE_PROPS,
		...KOTTI_FIELD_DATE_SHARED_PROPS,
	},
	setup(props: KottiFieldDate.Props, { emit }) {
		const field = useField<KottiFieldDate.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldDate.Value =>
				(typeof value === 'string' && DATE_FORMAT_REGEX.test(value)) ||
				value === null,
			isEmpty: (value) => value === '',
			props,
			supports: {
				clear: false, // rely on el-ui
				decoration: false,
				placeholder: true,
				tabIndex: false,
			},
		})

		const elDateRef = ref<ElDateComponent>(null)

		const inputContainerRef = ref<Element>(null)

		usePicker(elDateRef, inputContainerRef, field)

		const pickerOptions: Ref<Pick<
			DatePickerOptions,
			'shortcuts' | 'disabledDate'
		>> = computed(() => ({
			disabledDate: (date: Date) => {
				const { maximumDate, minimumDate } = props

				if (maximumDate !== null && dayjs(date).isAfter(maximumDate, 'day'))
					return true

				if (minimumDate !== null && dayjs(date).isBefore(minimumDate, 'day'))
					return true

				return false
			},
			shortcuts: props.shortcuts.map(
				({ label, value, keepOpen }: KottiFieldDate.Props['shortcuts'][0]) => ({
					text: label,
					onClick(_picker: ElDatePicker) {
						if (keepOpen !== true) _picker.$emit('pick', value)
						field.setValue(value)
					},
				}),
			),
		}))

		return {
			elDatePickerProps: computed(
				() =>
					({
						...DATE_INTERNAL_PROPS,
						pickerOptions: pickerOptions.value,
					} as Partial<ElDate>),
			),
			elDateRef,
			field,
			inputContainerRef,
			onChange: (value: KottiFieldDate.Value) => field.setValue(value),
		}
	},
})
</script>
