import { onMounted, Ref, watchEffect } from '@vue/composition-api'
import { DatePicker as ElDate } from 'element-ui'

import { KottiField } from '../kotti-field/types'
import { Yoco } from '../types'

import {
	KottiFieldDate,
	KottiFieldDateRange,
	KottiFieldDateTime,
	KottiFieldDateTimeRange,
} from './types'

type Values =
	| KottiFieldDate.Value
	| KottiFieldDateRange.Value
	| KottiFieldDateTime.Value
	| KottiFieldDateTimeRange.Value

type HookParameters<DATA_TYPE extends Values> = {
	elDateRef: Ref<ElDateWithInternalAPI | null>
	field: KottiField.Hook.Returns<DATA_TYPE>
	inputContainerRef: Ref<Element | null>
	popperWidth: string
	popperHeight?: string
}

export type ElDateWithInternalAPI = ElDate & {
	blur(): void
	picker: Vue & { width: number; $el: HTMLElement }
	pickerVisible: boolean
	referenceElm: Element
}

const getDateComponent = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	const dateComponent = elDateRef.value
	if (dateComponent === null) throw new Error('el-date not available')

	return dateComponent
}

/**
 * `picker` (the popper component) is (un)set with `(un)mountPicker`.
 * dependency tracking is done through `pickerVisible`, an internally computed prop,
 * because the `picker` gets a new reference on each call of `mountPicker()`.
 * so using any property on the picker to trigger the `watchEffect` won’t work
 * NOTE: The order inside the condition matters as pickerVisible needs to be accessed first
 */
const isPickerVisible = (dateComponent: ElDateWithInternalAPI) =>
	dateComponent.pickerVisible

/**
 * placement fix
 * same hack as the one used in the selects but for the datepickers, the popper component.data
 * are merged with the DateComponent’s own data, therefore allowing access to properties on popper component
 * directly through dateComponent
 */
const usePickerPlacementFix = <DATA_TYPE extends Values>({
	elDateRef,
	inputContainerRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef' | 'inputContainerRef'>) => {
	onMounted(() => {
		const dateComponent = getDateComponent({ elDateRef })

		const ktFieldDateInputContainer = inputContainerRef.value
		if (ktFieldDateInputContainer === null)
			throw new Error('kt-field-date__input-container not available')

		dateComponent.referenceElm = ktFieldDateInputContainer
	})
}

const useInputDecoration = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	onMounted(() => {
		const dateComponent = getDateComponent({ elDateRef })

		// replace el-input affix icons with yoco icons
		for (const icon of dateComponent.$el.querySelectorAll('.el-input__icon'))
			icon.classList.add('yoco')

		const prefixIcon = dateComponent.$el.querySelector(
			'.el-input__icon.el-icon-time, .el-input__icon.el-icon-date',
		) as HTMLElement

		prefixIcon.innerText = prefixIcon.classList.contains('el-icon-time')
			? 'clock'
			: 'calendar'

		const suffixIcon = dateComponent.$el.querySelector(
			'.el-input__icon:not(.el-icon-time):not(.el-icon-date)',
		) as HTMLElement

		suffixIcon.innerText = 'close'
	})
}

const useInputSizeFix = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	onMounted(() => {
		const dateComponent = getDateComponent({ elDateRef })

		const elInput = dateComponent.$el.querySelector('.el-input__inner')
		elInput?.setAttribute('size', '1')
	})
}

const usePickerWidthFix = <DATA_TYPE extends Values>({
	elDateRef,
	inputContainerRef,
	popperWidth,
	popperHeight,
}: Pick<
	HookParameters<DATA_TYPE>,
	'elDateRef' | 'inputContainerRef' | 'popperWidth' | 'popperHeight'
>) => {
	watchEffect(() => {
		const dateComponent = getDateComponent({ elDateRef })

		const ktFieldDateInputContainer = inputContainerRef.value
		if (ktFieldDateInputContainer === null)
			throw new Error('kt-field-date__input-container not available')

		if (isPickerVisible(dateComponent)) {
			const newWidth = ktFieldDateInputContainer.getBoundingClientRect().width
			// eslint-disable-next-line no-magic-numbers
			dateComponent.picker.$el.style.width = `${(newWidth * 50) / 100}px`
			dateComponent.picker.$el.style.minWidth = popperWidth
			dateComponent.picker.$el.style.height = popperHeight
		}
	})
}

/**
 * add yoco class to header icons to enable yoco icons
 */
const usePickerNavigationIcons = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	watchEffect(() => {
		const dateComponent = getDateComponent({ elDateRef })

		if (isPickerVisible(dateComponent)) {
			const getIcons = (...icons: Yoco.Icon[]) =>
				icons.map((icon) => `<i class="yoco">${icon}</i>`).join('')

			const pickerHeaderIcons: Array<HTMLElement> = Array.from(
				dateComponent.picker.$el.querySelectorAll('.el-picker-panel__icon-btn'),
			)

			const headerYocoIcons = [
				getIcons('chevron_left', 'chevron_left'),
				getIcons('chevron_left'),
				getIcons('chevron_right', 'chevron_right'),
				getIcons('chevron_right'),
			]

			pickerHeaderIcons.forEach((icon, index) => {
				icon.innerHTML = headerYocoIcons[index]
			})
		}
	})
}

/**
 * If the field is loading, we want to unfocus in case the popper is open
 * so that when isLoading changes, the popper isn't misplaced
 */
const usePickerMisplacementFix = <DATA_TYPE extends Values>({
	elDateRef,
	field,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef' | 'field'>) => {
	watchEffect(() => {
		const dateComponent = getDateComponent({ elDateRef })

		if (field.isLoading || field.isDisabled) return dateComponent.blur()
	})
}

export const usePicker = <DATA_TYPE extends Values>({
	elDateRef,
	field,
	inputContainerRef,
	popperWidth,
	popperHeight,
}: HookParameters<DATA_TYPE>) => {
	useInputSizeFix({ elDateRef })
	useInputDecoration({ elDateRef })
	usePickerMisplacementFix({ elDateRef, field })
	usePickerNavigationIcons({ elDateRef })
	usePickerPlacementFix({ elDateRef, inputContainerRef })
	usePickerWidthFix({
		elDateRef,
		inputContainerRef,
		popperWidth,
		popperHeight: popperHeight ?? '500px',
	})
}
