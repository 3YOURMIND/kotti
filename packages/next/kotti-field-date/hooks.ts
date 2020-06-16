import { onMounted, Ref, watchEffect } from '@vue/composition-api'
import { DatePicker as ElDate } from 'element-ui'

import { KottiField } from '../kotti-field/types'

import {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTime,
	KottiFieldDateTimeRange,
} from './types'

export type ElDateComponent = ElDate & {
	blur(): void
	referenceElm: Element
	picker: Vue & {
		width: number
		$el: HTMLElement
	}
	pickerVisible: boolean
	updatePopper(): void
}

export const usePicker = <
	DATE_PICKER_DATA_TYPE extends
		| KottiFieldDate.Value
		| KottiFieldDateRange.Value
		| KottiFieldDateTime.Value
		| KottiFieldDateTimeRange.Value
>(
	elDateRef: Ref<ElDateComponent | null>,
	inputContainerRef: Ref<Element | null>,
	field: KottiField.Hook.Returns<DATE_PICKER_DATA_TYPE>,
	popperWidth: string,
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

		// replace el-input affix icons with yoco icons
		const elInput = elDateComponent.$el.querySelector('.el-input__inner')
		elInput?.setAttribute('size', '1')

		const elInputIcons: Array<HTMLElement> = Array.from(
			elDateComponent.$el.querySelectorAll('.el-input__icon'),
		)

		elInputIcons.forEach((icon) => icon.classList.add('yoco'))

		const prefixIcon = elDateComponent.$el.querySelectorAll(
			'.el-input__icon.el-icon-time, .el-input__icon.el-icon-date',
		)

		const prefixIconArray: Array<HTMLElement> = [].slice.call(prefixIcon)

		prefixIconArray[0].classList.contains('el-icon-time')
			? (prefixIconArray[0].innerText = 'clock')
			: (prefixIconArray[0].innerText = 'calendar')

		const suffixIcon: Array<HTMLElement> = Array.from(
			elDateComponent.$el.querySelectorAll(
				'.el-input__icon:not(.el-icon-time):not(.el-icon-date)',
			),
		)
		suffixIcon[0].innerText = 'close'
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

			/* eslint-disable no-magic-numbers */
			elDateComponent.picker.$el.style.width = `${(newWidth * 50) / 100}px`
			elDateComponent.picker.$el.style.minWidth = popperWidth
			elDateComponent.picker.$el.style.height = '500px'
			/* eslint-enable no-magic-numbers */

			// add yoco class to header icons to enable yoco icons
			const pickerHeaderIcons: Array<HTMLElement> = Array.from(
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
