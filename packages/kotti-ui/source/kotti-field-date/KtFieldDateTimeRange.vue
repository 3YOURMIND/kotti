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
			<div ref="inputContainerRef" class="kt-field__input-container">
				<ElDate
					ref="elDateRef"
					v-bind="elDateTimeRangePickerProps"
					@blur="onBlur"
					@input="onInput"
				/>
			</div>
		</template>
	</KtField>
</template>

<script lang="ts">
import ElDate from 'element-ui/lib/date-picker.js'
import type {
	DatePickerOptions,
	ElDatePicker,
} from 'element-ui/types/date-picker'
import type { Ref } from 'vue'
import { computed, defineComponent, inject, ref } from 'vue'

import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
import { KT_IS_IN_POPOVER } from '../kotti-popover/constants'
import { makeProps } from '../make-props'

import {
	EL_DATE_RANGE_PROPS,
	EL_DATE_TIME_PROPS,
	KOTTI_FIELD_DATE_SUPPORTS,
} from './constants'
import type { ElDateWithInternalAPI } from './hooks'
import { usePicker } from './hooks'
import { KottiFieldDateTimeRange } from './types'
import { isInvalidDate } from './utilities'

export default defineComponent({
	name: 'KtFieldDateTimeRange',
	components: { ElDate, KtField },
	props: makeProps(KottiFieldDateTimeRange.propsSchema),
	emits: ['blur', 'input'],
	setup(props, { emit }) {
		const field = useField<KottiFieldDateTimeRange.Value>({
			emit,
			isEmpty: (dateTimeRangeValue) =>
				dateTimeRangeValue.every((dateTime) => dateTime === null),
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		const elDateRef = ref<ElDateWithInternalAPI | null>(null)

		const inputContainerRef = ref<Element | null>(null)

		usePicker({
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			elDateRef: elDateRef as any,
			field,
			inputContainerRef,
			popperHeight: '550px',
			popperWidth: '700px',
		})

		const pickerOptions: Ref<
			Pick<DatePickerOptions, 'disabledDate' | 'shortcuts'>
		> = computed(() => ({
			disabledDate: (date: Date) => isInvalidDate(props, date),
			shortcuts: props.shortcuts.map(({ keepOpen, label, value }) => ({
				onClick(_picker: ElDatePicker) {
					if (keepOpen !== true) _picker.$emit('pick', value)
					field.setValue(value)
				},
				text: label,
			})),
		}))

		const isInPopover = inject(KT_IS_IN_POPOVER, false)

		return {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			elDateRef: elDateRef as any,
			elDateTimeRangePickerProps: computed(
				(): Partial<ElDatePicker> => ({
					...EL_DATE_TIME_PROPS,
					...EL_DATE_RANGE_PROPS,
					/**
					 * @see {@link https://github.com/ElemeFE/element/blob/v2.13.1/packages/date-picker/src/picker.vue#L334)}
					 * */
					// @ts-expect-error (exposed through mixin on picker.vue on element-ui's implementation)
					appendToBody: !isInPopover,
					clearable: !field.hideClear,
					'data-test': field.inputProps['data-test'],
					disabled: field.isDisabled || field.isLoading,
					endPlaceholder: props.placeholder[1] ?? '',
					id: [`${field.inputProps.id}-start`, `${field.inputProps.id}-end`],
					pickerOptions: pickerOptions.value,
					startPlaceholder: props.placeholder[0] ?? '',
					type: 'datetimerange',
					value: field.currentValue.map((date) => date ?? '') as [
						string,
						string,
					],
				}),
			),
			field,
			inputContainerRef,
			onBlur: () => {
				emit('blur', field.currentValue)
			},
			onInput: (value: KottiFieldDateTimeRange.Value | null) => {
				if (field.isDisabled || field.isLoading) return

				// element-ui emits `null` on clear
				field.setValue(value ?? [null, null])
			},
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
