<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-date"
		debounceLabelClick
		:getEmptyValue="() => null"
		:helpTextSlot="$slots.helpText"
	>
		<template #container>
			<div ref="inputContainerRef" class="kt-field__input-container">
				<!-- v-bind="elDatePickerProps" -->
				<VueDatePicker
					:enableTimePicker="false"
					modelType="yyyy-MM-dd"
					format="yyyy-MM-dd"
					autoApply
					:modelValue="field.currentValue"
					@update:modelValue="onInput"
				>
					...
				</VueDatePicker>
				i
			</div>
		</template>
	</KtField>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'

import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
// import { KT_IS_IN_POPOVER } from '../kotti-popover/constants'
import { makeProps } from '../make-props'

import {
	// EL_DATE_PROPS,
	KOTTI_FIELD_DATE_SUPPORTS,
} from './constants'
// import type { ElDateWithInternalAPI } from './hooks'
// import { usePicker } from './hooks'
import { KottiFieldDate } from './types'

export default defineComponent({
	name: 'KtFieldDate',
	components: {
		// ElDatePicker,
		KtField,
		VueDatePicker,
	},
	props: makeProps(KottiFieldDate.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldDate.Value>({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: KOTTI_FIELD_DATE_SUPPORTS,
		})

		// const elDateRef = ref<ElDateWithInternalAPI | null>(null)
		const inputContainerRef = ref<Element | null>(null)

		// usePicker({
		// 	// eslint-disable-next-line @typescript-eslint/no-explicit-any
		// 	elDateRef: elDateRef as any,
		// 	field,
		// 	inputContainerRef,
		// 	popperHeight: '470px',
		// 	popperWidth: '400px',
		// })

		// const isInPopover = inject(KT_IS_IN_POPOVER, false)

		return {
			// elDatePickerProps: computed(
			// 	(): Partial<DatePickerInstance> => ({
			// 		...EL_DATE_PROPS,
			// 		/**
			// 		 * @see {@link https://github.com/ElemeFE/element/blob/v2.13.1/packages/date-picker/src/picker.vue#L334)}
			// 		 * */
			// 		clearable: !field.hideClear,
			// 		// @ts-expect-error We put data-test despite el-date-picker does not know this prop
			// 		'data-test': field.inputProps['data-test'],
			// 		disabled: field.isDisabled || field.isLoading,
			// 		disabledDate: (date: Date) => isInvalidDate(props, date),
			// 		id: field.inputProps.id,
			// 		modelValue: field.currentValue ?? '',
			// 		placeholder: props.placeholder ?? '',
			// 		popperClass: 'foobar',
			// 		shortcuts: props.shortcuts.map(({ label, value, keepOpen }) => ({
			// 			text: label,
			// 			value: () => new Date(value),
			// 		})),
			// 		teleported: !isInPopover,
			// 		type: 'date',
			// 	}),
			// ),
			// --eslint-disable-next-line @typescript-eslint/no-explicit-any
			// elDateRef: elDateRef as any,
			field,
			inputContainerRef,
			onInput: (value: KottiFieldDate.Value) => {
				if (!field.isDisabled && !field.isLoading) field.setValue(value)
			},
		}
	},
})
</script>

<style lang="scss">
@import 'styles';
</style>
