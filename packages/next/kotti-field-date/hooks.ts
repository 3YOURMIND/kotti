import { onMounted, Ref, watchEffect } from '@vue/composition-api'
import { DatePicker as ElDate } from 'element-ui'

import { KottiField } from '../kotti-field/types'

import {
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
} from './types'

export const usePicker = <
	DATE_PICKER_DATA_TYPE extends
		| KtFieldDate.Value
		| KtFieldDateRange.Value
		| KtFieldDateTime.Value
		| KtFieldDateTimeRange.Value
>(
	elDateRef: Ref<
		| (ElDate & {
				blur(): void
				referenceElm: Element
				picker: Vue & {
					width: number
					$el: HTMLElement
				}
				pickerVisible: boolean
				updatePopper(): void
		  })
		| null
	>,
	inputContainerRef: Ref<Element | null>,
	field: KottiField.Hook.Returns<DATE_PICKER_DATA_TYPE>,
) => {
	onMounted(() => {
		const elDateComponent = elDateRef.value
		if (elDateComponent === null) throw new Error('el-date not available')

		const ktFieldDateInputContainer = inputContainerRef.value
		if (ktFieldDateInputContainer === null)
			throw new Error('kt-field-date__input-container not available')

		// placement fix
		// same hack as the one used in the selects but for the datepickers, the popper component.data
		// are merged with the DateComponent's own data, therefore allowing access to properties on popper component
		// directly through elDateComponent

		elDateComponent.referenceElm = ktFieldDateInputContainer
	})
	watchEffect(() => {
		/**
		 * If the field is loading, we want to unfocus in case the popper is open
		 * so that when isLoading changes, the popper isn't misplaced
		 */
		const elDateComponent = elDateRef.value
		if (elDateComponent === null) throw new Error('el-date not available')

		if (field.isLoading || field.isDisabled) {
			return elDateComponent.blur()
		}
		const ktFieldDateInputContainer = inputContainerRef.value
		if (ktFieldDateInputContainer === null)
			throw new Error('kt-field-date__input-container not available')

		// `picker` (the popper component) is (un)set with `(un)mountPicker`.
		// depedency tracking is done through `pickerVisible`; an internally computed prop,
		// because the `picker` gets a new reference on each call of `mountPicker()`.
		// so using any property on the picker to trigger the `watchEffect` won't work
		elDateComponent.pickerVisible
		if (elDateComponent.picker && elDateComponent.pickerVisible) {
			const newWidth = ktFieldDateInputContainer.getBoundingClientRect().width
			// elDateComponent.picker.width = newWidth
			elDateComponent.picker.$el.style.minWidth = `${(newWidth * 70) / 100}px`

			// add yoco class to header icons to enable yoco icons
			const pickerHeaderIcons: Array<HTMLElement> = [].slice.call(
				elDateComponent.picker.$el.querySelectorAll(
					'.el-picker-panel__icon-btn',
				),
			)
			const headerYocoIcons = [
				'<i class="yoco">chevron_left</i><i class="yoco">chevron_left</i>',
				'<i class="yoco">chevron_left</i>',
				'<i class="yoco">chevron_right</i><i class="yoco">chevron_right</i>',
				'<i class="yoco">chevron_right</i>',
			]
			pickerHeaderIcons.forEach((icon, index) => {
				icon.innerHTML = headerYocoIcons[index]
			})

			elDateComponent.updatePopper()
		}
	})
}
