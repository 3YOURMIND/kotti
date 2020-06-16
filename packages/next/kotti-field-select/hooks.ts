import { onMounted, Ref, watchEffect } from '@vue/composition-api'
import { Select as ElSelect } from 'element-ui'

import { KottiField } from '../kotti-field/types'

import { KottiFieldSingleSelect, KottiFieldMultiSelect } from './types'

export type ElSelectWithInternalAPI =
	| (ElSelect & {
			inputWidth: number
			setSoftFocus(): void
	  })
	| null

type Hook<DATA_TYPE extends Values> = {
	elSelectRef: Ref<ElSelectWithInternalAPI>
	field: KottiField.Hook.Returns<DATA_TYPE>
	inputSelectors: string[]
	/**
	 * FIXME: Should be typeof KtField in theory, but right now this gets resolved wrongly to VueConstructor<Vue>
	 */
	ktFieldRef: Ref<Vue | null>
}

type Values = KottiFieldSingleSelect.Value | KottiFieldMultiSelect.Value

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
}: Pick<Hook<DATA_TYPE>, 'elSelectRef' | 'ktFieldRef'>) => {
	onMounted(() => {
		const elSelectComponent = elSelectRef.value
		if (elSelectComponent === null) throw new Error('el-select not available')

		const ktFieldComponent = ktFieldRef.value
		if (ktFieldComponent === null) throw new Error('kt-field not available')

		const popperComponent = elSelectComponent.$refs.popper as Vue & {
			referenceElm: Element
		}
		const ktFieldContainerElement = ktFieldComponent.$refs
			.inputContainerRef as Element

		popperComponent.referenceElm = ktFieldContainerElement
	})
}

/**
 * adds size attribute to avoid overflow of icons
 */
const useSelectInputFixes = <DATA_TYPE extends Values>({
	inputSelectors,
	ktFieldRef,
}: Pick<Hook<DATA_TYPE>, 'ktFieldRef' | 'inputSelectors'>) => {
	onMounted(() => {
		const ktFieldComponent = ktFieldRef.value
		if (ktFieldComponent === null) throw new Error('kt-field not available')

		const ktFieldContainerElement = ktFieldComponent.$refs
			.inputContainerRef as Element

		inputSelectors.forEach((query) =>
			ktFieldContainerElement.querySelector(query)?.setAttribute('size', '1'),
		)
	})
}

const usePopperWidthFix = <DATA_TYPE extends Values>({
	elSelectRef,
	field,
	ktFieldRef,
}: Pick<Hook<DATA_TYPE>, 'elSelectRef' | 'ktFieldRef' | 'field'>) => {
	watchEffect(() => {
		/**
		 * If the field is loading, we want to unfocus in case the popper is open
		 * so that when isLoading changes, the popper isn't misplaced
		 */
		const elSelectComponent = elSelectRef.value
		if (elSelectComponent === null) throw new Error('el-select not ready')
		if (field.isLoading || field.isDisabled) {
			return elSelectComponent.blur()
		}

		const ktFieldComponent = ktFieldRef.value
		if (ktFieldComponent === null) throw new Error('kt-field not ready')

		// just used to add this as a dependency
		elSelectComponent.inputWidth

		const ktFieldContainerElement = ktFieldComponent.$refs
			.inputContainerRef as Element
		const newWidth = ktFieldContainerElement.getBoundingClientRect().width
		const popperComponent = elSelectComponent.$refs.popper as Vue
		const popperElement = popperComponent.$el as HTMLElement

		popperElement.style.width = `${newWidth}px`
		elSelectComponent.inputWidth = newWidth
	})
}

export const useSelectFixes = <DATA_TYPE extends Values>({
	elSelectRef,
	field,
	inputSelectors,
	ktFieldRef,
}: Hook<DATA_TYPE>) => {
	usePopperPlacementFix({ elSelectRef, ktFieldRef })
	usePopperWidthFix({ elSelectRef, field, ktFieldRef })
	useSelectInputFixes({ ktFieldRef, inputSelectors })
}
