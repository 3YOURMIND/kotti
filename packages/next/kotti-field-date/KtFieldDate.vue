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
import { DatePicker as ElDate } from 'element-ui'
import { DatePickerOptions, ElDatePicker } from 'element-ui/types/date-picker'

import { KtField } from '../kotti-field'
import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import {
	DATE_FORMAT_REGEX,
	KOTTI_FIELD_DATE_PROPS,
	EL_DATE_PROPS,
} from './constants'
import { usePicker, ElDateWithInternalAPI } from './hooks'
import { KottiFieldDate } from './types'
import { isInvalidDate } from './utils'

export default defineComponent({
	name: 'KtFieldDate',
	components: { ElDate, KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_DATE_PROPS,
	},
	setup(props: KottiFieldDate.Props, { emit }) {
		const field = useField<KottiFieldDate.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldDate.Value =>
				(typeof value === 'string' && DATE_FORMAT_REGEX.test(value)) ||
				value === null,
			isEmpty: (value) => value === null,
			props,
			supports: {
				clear: false, // rely on el-ui
				decoration: false,
				placeholder: true,
				tabIndex: false,
			},
		})

		const elDateRef = ref<ElDateWithInternalAPI>(null)
		const inputContainerRef = ref<Element>(null)

		usePicker({ elDateRef, field, inputContainerRef, popperWidth: '400px' })

		const pickerOptions: Ref<Pick<
			DatePickerOptions,
			'disabledDate' | 'shortcuts'
		>> = computed(() => ({
			disabledDate: (date: Date) => isInvalidDate(props, date),
			shortcuts: props.shortcuts.map(
				({ label, value, keepOpen }: KottiFieldDate.Props['shortcuts'][0]) => ({
					text: label,
					onClick(picker: ElDatePicker) {
						/**
						 * close the picker if it shouldn’t stay open
						 */
						if (keepOpen !== true) picker.$emit('pick', value)

						field.setValue(value)
					},
				}),
			),
		}))

		return {
			elDatePickerProps: computed(
				() =>
					({
						...EL_DATE_PROPS,
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
