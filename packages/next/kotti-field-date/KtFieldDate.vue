<template>
	<KtField
		v-bind="{ field }"
		class="kt-field-date"
		:getEmptyValue="() => null"
		isComponent="div"
	>
		<!-- :disabledDate="() => field.isDisabled" -->
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
// import 'element-ui/lib/theme-chalk/index.css'
import { defineComponent, ref } from '@vue/composition-api'
import { DatePicker as ElDate } from 'element-ui'

import { KtField } from '../kotti-field'
import { ktFieldProps } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'

import {
	COMMON_INTERNAL_PROPS,
	DATE_INTERNAL_PROPS,
	DATE_FORMAT_REGEX,
} from './constants'
import { usePicker } from './hooks'
import { KtFieldDate } from './types'

export default defineComponent({
	name: 'KtFieldDate',
	components: { ElDate, KtField },
	props: {
		...ktFieldProps,
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

		return {
			elDatePickerProps: {
				...COMMON_INTERNAL_PROPS,
				...DATE_INTERNAL_PROPS,
			} as Partial<ElDate>,
			elDateRef,
			field,
			inputContainerRef,
			onChange: (value: KtFieldDate.Value) => field.setValue(value),
		}
	},
})
</script>
