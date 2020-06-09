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
import { ktFieldProps } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import {
	COMMON_INTERNAL_PROPS,
	DATE_INTERNAL_PROPS,
	DATE_FORMAT_REGEX,
	ktFieldDateSharedProps,
} from './constants'
import { usePicker } from './hooks'
import { KtFieldDate, KtFieldDateShared } from './types'

export default defineComponent({
	name: 'KtFieldDate',
	components: { ElDate, KtField },
	props: {
		...ktFieldProps,
		...ktFieldDateSharedProps,
	},
	setup(props: KtFieldDate.Props, { emit }) {
		const field = useField<KtFieldDate.Value>({
			emit,
			isCorrectDataType: (value): value is KtFieldDate.Value =>
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

		const elDateRef = ref<
			ElDate & {
				blur(): void
				referenceElm: Element
				picker: Vue & {
					width: number
					$el: HTMLElement
				}
				pickerVisible: boolean
				updatePopper(): void
			}
		>(null)

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
				({
					label,
					value,
					keepOpen,
				}: KtFieldDateShared.ShortcutEntry<KtFieldDate.Value>) => ({
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
						...COMMON_INTERNAL_PROPS,
						...DATE_INTERNAL_PROPS,
						pickerOptions: pickerOptions.value,
					} as Partial<ElDate>),
			),
			elDateRef,
			field,
			inputContainerRef,
			onChange: (value: KtFieldDate.Value) => field.setValue(value),
		}
	},
})
</script>
