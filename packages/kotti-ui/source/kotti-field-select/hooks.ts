import { onMounted, Ref, watchEffect } from '@vue/composition-api'
import { Select as ElSelect } from 'element-ui'

import { KottiField } from '../kotti-field/types'

import { KottiFieldSingleSelect, KottiFieldMultiSelect } from './types'

export type ElSelectWithInternalAPI = ElSelect & {
	inputWidth: number
	setSoftFocus(): void
	visible: boolean
}

type HookParameters<DATA_TYPE extends Values> = {
	elSelectRef: Ref<ElSelectWithInternalAPI | null>
	field: KottiField.Hook.Returns<DATA_TYPE>
	inputSelectors: string[]
	ktFieldRef: Ref<Vue | null>
}

type Values = KottiFieldSingleSelect.Value | KottiFieldMultiSelect.Value

const getComponents = <DATA_TYPE extends Values>({
	elSelectRef,
	ktFieldRef,
}: Pick<HookParameters<DATA_TYPE>, 'elSelectRef' | 'ktFieldRef'>) => {
	const elSelectComponent = elSelectRef.value
	const ktFieldComponent = ktFieldRef.value

	if (elSelectComponent === null) throw new Error('el-select not available')

	if (ktFieldComponent === null) throw new Error('kt-field not available')

	return {
		elSelectComponent: elSelectComponent as ElSelectWithInternalAPI,
		ktFieldComponent: ktFieldComponent as Vue,
	}
}

/**
 * If the field is loading, we want to unfocus in case the popper is open
 * so that when isLoading changes, the popper isn't misplaced
 */
const usePopperMisplacementFix = <DATA_TYPE extends Values>({
	elSelectRef,
	field,
	ktFieldRef,
}: Pick<HookParameters<DATA_TYPE>, 'elSelectRef' | 'field' | 'ktFieldRef'>) => {
	onMounted(() => {
		watchEffect(() => {
			const { elSelectComponent } = getComponents({ elSelectRef, ktFieldRef })
			/**
			 * [select.vue]{@link https://github.com/ElemeFE/element/blob/649670c55a45c7343eb7148565e2d873bc3d52dd/src/utils/vue-popper.js#L72 }
			 * showPopper triggers on change of `visible`, which emits `updatePopper` which recomputes width/placement
			 */
			elSelectComponent.visible
			if (field.isLoading || field.isDisabled) return elSelectComponent.blur()
		})
	})
}

/**
 * ^ `popperComponent` is an internal `element-ui` component that computes the placement
 * of the dropdown based on the input element of `el-select`.
 *
 * [select.vue]{@link ./node_modules/element-ui/packages/select/src/select.vue} adds `ref="reference"`
 * to the input.
 *
 * [vue-popper.js]{@link ./node_modules/element-ui/src/utils/vue-popper.js} uses `parent.$ref.reference`
 * to obtain the `referenceElm`.
 *
 * So, here, we overwrite the internal property `referenceElm` of the component, to place the dropdown
 * in accordance to our input component instead (which is accessed by the `$refs.inputContainerRef`)
 */
const usePopperPlacementFix = <DATA_TYPE extends Values>({
	elSelectRef,
	ktFieldRef,
}: Pick<HookParameters<DATA_TYPE>, 'elSelectRef' | 'ktFieldRef'>) => {
	onMounted(() => {
		const { elSelectComponent, ktFieldComponent } = getComponents({
			elSelectRef,
			ktFieldRef,
		})

		const popperComponent = elSelectComponent.$refs.popper as Vue & {
			referenceElm: Element
		}
		const ktFieldContainerElement = ktFieldComponent.$refs
			.inputContainerRef as Element

		popperComponent.referenceElm = ktFieldContainerElement
	})
}

const usePopperWidthFix = <DATA_TYPE extends Values>({
	elSelectRef,
	ktFieldRef,
}: Pick<HookParameters<DATA_TYPE>, 'elSelectRef' | 'ktFieldRef' | 'field'>) => {
	onMounted(() => {
		watchEffect(() => {
			const { elSelectComponent, ktFieldComponent } = getComponents({
				elSelectRef,
				ktFieldRef,
			})

			// register dependencies
			elSelectComponent.inputWidth
			/**
			 * [select.vue]{@link https://github.com/ElemeFE/element/blob/649670c55a45c7343eb7148565e2d873bc3d52dd/src/utils/vue-popper.js#L72 }
			 * showPopper triggers on change of `visible`, which emits `updatePopper` which recomputes width/placement
			 */
			elSelectComponent.visible

			const ktFieldContainerElement = ktFieldComponent.$refs
				.inputContainerRef as Element
			const newWidth = ktFieldContainerElement.getBoundingClientRect().width

			const popperComponent = elSelectComponent.$refs.popper as Vue
			const popperElement = popperComponent.$el as HTMLElement

			popperElement.style.width = `${newWidth}px`

			elSelectComponent.inputWidth = newWidth
		})
	})
}

/**
 * adds size attribute to avoid overflow of icons
 */
const useSelectInputSizeFix = <DATA_TYPE extends Values>({
	elSelectRef,
	inputSelectors,
	ktFieldRef,
}: Pick<
	HookParameters<DATA_TYPE>,
	'elSelectRef' | 'ktFieldRef' | 'inputSelectors'
>) => {
	onMounted(() => {
		const { ktFieldComponent } = getComponents({ elSelectRef, ktFieldRef })

		const ktFieldContainerElement = ktFieldComponent.$refs
			.inputContainerRef as Element

		inputSelectors.forEach((query) =>
			ktFieldContainerElement.querySelector(query)?.setAttribute('size', '1'),
		)
	})
}

/**
 * @summary HACK: Prevent Google Chrome from autocompleting the search field
 *
 * @description
 * chrome 66+ shows suggestions for saved autofill data,
 * through intelligent detection, recognizing "address" fields, for instance,
 * and suggesting autofills.
 *
 * using `autocomplete="off" on `input` of `type="text"` would not work to disable autofill
 *
 * @see {@link https://gist.github.com/niksumeiko/360164708c3b326bd1c8#gistcomment-2032962} for suggested fixes
 * @see {@link https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#autofill-expectation-mantle} for more information on the autocomplete attribute and accepted values
 * @see {@link https://bugs.chromium.org/p/chromium/issues/detail?id=370363#c7} for more information on the autocomplete tokens for password fields
 */
const useSelectInputTypeFix = <DATA_TYPE extends Values>({
	elSelectRef,
	inputSelectors,
	ktFieldRef,
}: Pick<
	HookParameters<DATA_TYPE>,
	'elSelectRef' | 'inputSelectors' | 'ktFieldRef'
>) => {
	onMounted(() => {
		const { ktFieldComponent } = getComponents({ elSelectRef, ktFieldRef })

		const ktFieldContainerElement = ktFieldComponent.$refs
			.inputContainerRef as Element

		inputSelectors.forEach((query) =>
			ktFieldContainerElement
				.querySelector(query)
				?.setAttribute('type', 'search'),
		)
	})
}

export const useSelectFixes = <DATA_TYPE extends Values>({
	elSelectRef,
	field,
	inputSelectors,
	ktFieldRef,
}: HookParameters<DATA_TYPE>) => {
	usePopperMisplacementFix({ elSelectRef, field, ktFieldRef })
	usePopperPlacementFix({ elSelectRef, ktFieldRef })
	usePopperWidthFix({ elSelectRef, field, ktFieldRef })
	useSelectInputSizeFix({ elSelectRef, inputSelectors, ktFieldRef })
	useSelectInputTypeFix({ elSelectRef, inputSelectors, ktFieldRef })
}
