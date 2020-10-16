<template>
	<KtField v-bind="{ field }" class="kt-field-date" :getEmptyValue="() => null">
		<div
			ref="inputContainerRef"
			slot="container"
			class="kt-field__input-container"
		>
			<ElDate ref="elDateRef" v-bind="elDatePickerProps" @input="onChange" />
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
	DATE_FORMAT_REGEX,
	KOTTI_FIELD_DATE_PROPS,
	EL_DATE_PROPS,
	KOTTI_FIELD_DATE_SUPPORTS,
} from './constants'
import { usePicker, ElDateWithInternalAPI } from './hooks'
import { KottiFieldDate } from './types'
import { isInvalidDate } from './utilities'

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
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		const elDateRef = ref<ElDateWithInternalAPI | null>(null)
		const inputContainerRef = ref<Element | null>(null)

		usePicker({
			elDateRef,
			field,
			inputContainerRef,
			popperHeight: '470px',
			popperWidth: '400px',
		})

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
				(): Partial<ElDate> => ({
					...EL_DATE_PROPS,
					clearable: !field.hideClear,
					disabled: field.isDisabled,
					pickerOptions: pickerOptions.value,
					placeholder: props.placeholder ?? '',
					type: 'date',
					value: field.currentValue ?? '',
				}),
			),
			elDateRef,
			field,
			inputContainerRef,
			onChange: (value: KottiFieldDate.Value) => field.setValue(value),
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
