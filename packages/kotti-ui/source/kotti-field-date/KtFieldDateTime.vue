<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-datetime"
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
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
import { DatePicker as ElDate } from 'element-ui'
import { DatePickerOptions, ElDatePicker } from 'element-ui/types/date-picker'
import { defineComponent, ref, Ref, computed, inject } from 'vue'

import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
import { KT_IS_IN_POPOVER } from '../kotti-popover/constants'
import { makeProps } from '../make-props'

import { EL_DATE_TIME_PROPS, KOTTI_FIELD_DATE_SUPPORTS } from './constants'
import { usePicker, ElDateWithInternalAPI } from './hooks'
import { KottiFieldDateTime } from './types'
import { isInvalidDate } from './utilities'

export default defineComponent<KottiFieldDateTime.PropsInternal>({
	name: 'KtFieldDateTime',
	components: { ElDate, KtField },
	props: makeProps(KottiFieldDateTime.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldDateTime.Value>({
			emit,
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
			popperHeight: '550px',
			popperWidth: '400px',
		})

		const pickerOptions: Ref<
			Pick<DatePickerOptions, 'disabledDate' | 'shortcuts'>
		> = computed(() => ({
			disabledDate: (date: Date) => isInvalidDate(props, date),
			shortcuts: props.shortcuts.map(({ label, value, keepOpen }) => ({
				text: label,
				onClick(picker: ElDatePicker) {
					/**
					 * close the picker if it shouldn’t stay open
					 */
					if (keepOpen !== true) picker.$emit('pick', value)

					field.setValue(value)
				},
			})),
		}))

		const isInPopover = inject(KT_IS_IN_POPOVER, false)

		return {
			elDateTimePickerProps: computed(
				(): Partial<ElDate> => ({
					...EL_DATE_TIME_PROPS,
					/**
					 * @see {@link https://github.com/ElemeFE/element/blob/v2.13.1/packages/date-picker/src/picker.vue#L334)}
					 * */
					// @ts-expect-error (exposed through mixin on picker.vue on element-ui's implementation)
					appendToBody: !isInPopover,
					clearable: !field.hideClear,
					disabled: field.isDisabled,
					pickerOptions: pickerOptions.value,
					placeholder: props.placeholder ?? '',
					type: 'datetime',
					value: field.currentValue ?? '',
				}),
			),
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
