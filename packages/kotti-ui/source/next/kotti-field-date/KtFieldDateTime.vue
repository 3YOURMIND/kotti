<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-datetime"
		:getEmptyValue="() => null"
	>
		<div
			ref="inputContainerRef"
			slot="container"
			class="kt-field__input-container"
		>
			<ElDate
				ref="elDateRef"
				v-bind="elDateTimePickerProps"
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
	KOTTI_FIELD_DATE_TIME_PROPS,
	EL_DATE_TIME_PROPS,
	KOTTI_FIELD_DATE_SUPPORTS,
} from './constants'
import { usePicker, ElDateWithInternalAPI } from './hooks'
import { KottiFieldDateTime } from './types'
import { isInvalidDate } from './utilities'

export default defineComponent({
	name: 'KtFieldDateTime',
	components: { ElDate, KtField },
	props: {
		...KOTTI_FIELD_PROPS,
		...KOTTI_FIELD_DATE_TIME_PROPS,
	},
	setup(props: KottiFieldDateTime.Props, { emit }) {
		const field = useField<KottiFieldDateTime.Value>({
			emit,
			isCorrectDataType: (value): value is KottiFieldDateTime.Value =>
				(typeof value === 'string' && DATE_TIME_FORMAT_REGEX.test(value)) ||
				value === null,
			isEmpty: (value) => value === null,
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
			popperWidth: '400px',
		})

		const pickerOptions: Ref<Pick<
			DatePickerOptions,
			'disabledDate' | 'shortcuts'
		>> = computed(() => ({
			disabledDate: (date: Date) => isInvalidDate(props, date),
			shortcuts: props.shortcuts.map(
				({
					label,
					value,
					keepOpen,
				}: KottiFieldDateTime.Props['shortcuts'][0]) => ({
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
			/**
			 * FIXME: Type definition for Partial<ElDate> was removed due to a bug
			 * when generating the types using rollup
			 */
			elDateTimePickerProps: computed(() => ({
				...EL_DATE_TIME_PROPS,
				clearable: !field.hideClear,
				disabled: field.isDisabled,
				pickerOptions: pickerOptions.value,
				placeholder: props.placeholder ?? undefined,
				type: 'datetime',
				value: field.currentValue ?? '',
			})),
			elDateRef,
			field,
			inputContainerRef,
			onChange: (value: KottiFieldDateTime.Value) => field.setValue(value),
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
