import type { DatePicker as ElDate } from 'element-ui'
import type { Instance } from 'tippy.js'
import type { Ref } from 'vue'
import { onMounted, type default as Vue, watchEffect } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import type { KottiField } from '../kotti-field/types'

import type {
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
	popperHeight: string
	popperWidth: string
}

export type ElDateWithInternalAPI = ElDate & {
	blur(): void
	haveTrigger: boolean
	picker: Vue & {
		$el: HTMLElement
		leftLabel?: string
		rightLabel?: string
		width: number
	}
	pickerVisible: boolean
	popperJS: Exclude<Instance['popperInstance'], null>
	referenceElm: Element
	showClose: boolean
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
 * so using any property on the picker to trigger the `watchEffect` won’t work.
 *
 * if a field is disabled, clicking on it, will set dateComponent.pickerVisible to true
 * instaneously but won't open the picker (dateComponent.picker will remain null)
 * and `pickerVisible` will reset itself
 * therefore, isPickerVisible() has to guard that picker exists
 *
 * NOTE: The order inside if-condition in any `watchEffect` hook matters
 * so pickerVisible needs to be accessed first
 */
const isPickerVisible = (dateComponent: ElDateWithInternalAPI) =>
	dateComponent.pickerVisible && dateComponent.picker

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
		)

		// DO NOT misuse `append` in a hook that will retriger multiple times in the same lifecycle;
		// make sure the node you're adding is not already there (see other usage here) OR use `innerHTML`
		prefixIcon?.append(
			prefixIcon.classList.contains('el-icon-time')
				? Yoco.Icon.CALENDAR_CLOCK
				: Yoco.Icon.CALENDAR,
		)

		let suffixIcon: Element | null = null

		watchEffect(
			() => {
				const dateComponent = getDateComponent({ elDateRef }) // don't refactor out of hooks

				// if `haveTrigger` is false, the suffixIcon is not rendered; `v-if` condition on the suffixIcon of el-ui dates
				if (dateComponent.haveTrigger) {
					// these are the default classes added to suffixIcon
					// there are more classes added when the clearIcon is hidden/shown
					// selecting with default selectors guarantees we get a suffixIcon even if it's hidden as long
					// as it's rendered. The other hook will handle the show/hide effect, while this should handle the existence of suffixIcon
					suffixIcon = dateComponent.$el.querySelector(
						'.el-input__icon.el-range__close-icon, .el-input__icon:not(.el-icon-date):not(.el-icon-time)',
					)
				}
			},
			{ flush: 'post' },
		)

		watchEffect(
			() => {
				const dateComponent = getDateComponent({ elDateRef })

				/**
				 * true onMouseEnter (when value is not Empty & field is clearable)
				 * false onMouseLeave or when value is Empty or when the field is not clearable
				 */
				const showClear = dateComponent.showClose

				if (suffixIcon) {
					if (!suffixIcon.classList.contains('yoco'))
						suffixIcon.classList.add('yoco')

					if (showClear) {
						if (!suffixIcon.hasChildNodes()) suffixIcon.append('close')
					} else if (suffixIcon.hasChildNodes() && suffixIcon.lastChild)
						suffixIcon.lastChild.remove()
				}
			},
			{ flush: 'post' },
		)
	})
}

/**
 * Allow Inputs to Shrink
 * @see {@link https://stackoverflow.com/a/29990524/2857873}
 */
const useInputSizeFix = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	onMounted(() => {
		const dateComponent = getDateComponent({ elDateRef })

		const elInputs = dateComponent.$el.querySelectorAll(
			'.el-input__inner, .el-range-input',
		)
		Array.from(elInputs).forEach((element) => {
			element.setAttribute('size', '1')
		})
	})
}

const usePickerDimensionsFix = <DATA_TYPE extends Values>({
	elDateRef,
	popperHeight,
	popperWidth,
}: Pick<
	HookParameters<DATA_TYPE>,
	'elDateRef' | 'popperHeight' | 'popperWidth'
>) => {
	onMounted(() => {
		watchEffect(
			() => {
				const dateComponent = getDateComponent({ elDateRef })

				if (isPickerVisible(dateComponent)) {
					dateComponent.picker.$el.style.width = popperWidth
					dateComponent.picker.$el.style.height = popperHeight
					/**
					 * HACK: to force re-compute the boundaries of the popper element (through the `update` prototype function),
					 * thus properly position it.
					 *
					 * When we open the date-picker we trigger `showPicker`
					 * https://github.com/ElemeFE/element/blob/649670c55a45c7343eb7148565e2d873bc3d52dd/packages/date-picker/src/picker.vue#L806
					 * which calls `updatePopper` from the mixin vue-popper, which, in turn, either
					 * creates a new PopperJs instance or updates the already-exisiting instance's props
					 * https://github.com/ElemeFE/element/blob/649670c55a45c7343eb7148565e2d873bc3d52dd/src/utils/vue-popper.js#L120
					 * In the latter case, it calls the prototype-defined function `update` from popper.js
					 * https://github.com/ElemeFE/element/blob/3ceec7aa6a7ab46e61dbafa4c68b77ba09384b40/src/utils/popper.js#L224
					 * to compute the boundaries of the popper, and thus its placement, among other things.
					 *
					 * On the first trigger of `showPopper`, a popperJs instance is created with the height and width defined by element-ui.
					 * After creation, we mutate the popper width and height to fit our kotti styles and needs.
					 * This mutation changes the boundaries of the popper without triggering a position adjustment. So, we force it.
					 */
					void dateComponent.popperJS.update()
				}
			},
			{ flush: 'post' },
		)
	})
}

const usePickerInnerInputsFix = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	onMounted(() => {
		watchEffect(
			() => {
				const dateComponent = getDateComponent({ elDateRef })
				if (isPickerVisible(dateComponent)) {
					const dateTimePickerInputWrapper =
						'.el-date-picker__editor-wrap  > .el-input--small'
					const dateTimeRangeInputWrapper =
						'.el-date-range-picker__time-picker-wrap > .el-input--small'
					const pickerInputWrappers: Array<Element> = Array.from(
						dateComponent.picker.$el.querySelectorAll(
							[dateTimePickerInputWrapper, dateTimeRangeInputWrapper].join(
								', ',
							),
						),
					)
					// divs around input fields inside the picker of KtFieldDateTime, KtFieldDateTimeRange
					pickerInputWrappers.forEach((input) => {
						input.classList.add(
							'kt-field__wrapper',
							'kt-field__wrapper--is-small',
							'kt-field__wrapper--is-validation-empty',
						)
					})

					const innerInputs: Array<Element> = Array.from(
						dateComponent.picker.$el.querySelectorAll('.el-input__inner'),
					)

					innerInputs.forEach((input) => {
						input.classList.add('kt-field__input-container')
						input.setAttribute('size', '1')
					})
				}
			},
			{ flush: 'post' },
		)
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
	onMounted(() => {
		watchEffect(
			() => {
				const dateComponent = getDateComponent({ elDateRef })

				if (field.isLoading || field.isDisabled) {
					dateComponent.blur()
					return
				}
			},
			{ flush: 'post' },
		)
	})
}

/**
 * add yoco class to header icons to enable yoco icons
 */
const usePickerNavigationIcons = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	onMounted(() => {
		watchEffect(
			() => {
				const dateComponent = getDateComponent({ elDateRef })

				if (isPickerVisible(dateComponent)) {
					const insertYocoIcon = (icon: Yoco.Icon) =>
						`<i class="yoco">${icon}</i>`

					const pickerHeaderIcons: Array<HTMLElement> = Array.from(
						dateComponent.picker.$el.querySelectorAll(
							'.el-picker-panel__icon-btn',
						),
					)

					const headerYocoIcons = [
						insertYocoIcon(Yoco.Icon.CHEVRON_LEFT_DOUBLE),
						insertYocoIcon(Yoco.Icon.CHEVRON_LEFT),
						insertYocoIcon(Yoco.Icon.CHEVRON_RIGHT_DOUBLE),
						insertYocoIcon(Yoco.Icon.CHEVRON_RIGHT),
					]

					pickerHeaderIcons.forEach((icon, index) => {
						icon.innerHTML = headerYocoIcons[index] as string
					})
				}
			},
			{ flush: 'post' },
		)
	})
}

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

const useRangePickerHeaderFix = <DATA_TYPE extends Values>({
	elDateRef,
}: Pick<HookParameters<DATA_TYPE>, 'elDateRef'>) => {
	onMounted(() => {
		watchEffect(
			() => {
				const dateComponent = getDateComponent({ elDateRef })
				if (isPickerVisible(dateComponent)) {
					// change when any of the navigation buttons in the range-pickers are clicked
					/**
					 * @example
					 * [
					 * 	['2024', 'May'],
					 * 	['2024', 'June'],
					 * ]
					 */
					const dates = [
						dateComponent.picker.leftLabel?.split(/\s+/) ?? ['', ''],
						dateComponent.picker.rightLabel?.split(/\s+/) ?? ['', ''],
					]

					const headers = dateComponent.picker.$el.querySelectorAll(
						'.el-date-range-picker__header',
					)

					headers.forEach((header, index) => {
						const fullDate = header.querySelector('div')
						if (fullDate) {
							fullDate.innerHTML = dates[index]?.[0] as string // leftMonth or rightMonth
							if (header.lastChild?.nodeType === window.Node.TEXT_NODE) {
								// we add a text node each call with the new year value, thus need to remove the old first
								header.lastChild.remove()
							}
							header.append(dates[index]?.[1] as string)
						}
					})
				}
			},
			{ flush: 'post' },
		)
	})
}

export const usePicker = <DATA_TYPE extends Values>({
	elDateRef,
	field,
	inputContainerRef,
	popperHeight,
	popperWidth,
}: HookParameters<DATA_TYPE>): void => {
	useInputDecoration({ elDateRef })
	useInputSizeFix({ elDateRef })
	usePickerDimensionsFix({
		elDateRef,
		popperHeight,
		popperWidth,
	})
	usePickerInnerInputsFix({ elDateRef })
	usePickerMisplacementFix({ elDateRef, field })
	usePickerNavigationIcons({ elDateRef })
	usePickerPlacementFix({ elDateRef, inputContainerRef })
	useRangePickerHeaderFix({ elDateRef })
}
