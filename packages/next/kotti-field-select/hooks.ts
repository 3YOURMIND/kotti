import { onMounted, Ref, watchEffect } from '@vue/composition-api'
import { Select as ElSelect } from 'element-ui'

import { KottiField } from '../kotti-field/types'

import { KtFieldSelect } from './types'

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

export const usePopperPlacementFix = (
	elSelectRef: Ref<
		| (ElSelect & {
				inputWidth: number
				setSoftFocus(): void
		  })
		| null
	>,
	ktFieldRef: Ref<Vue | null>,
) => {
	onMounted(() => {
		const elSelectComponent = elSelectRef.value
		if (elSelectComponent === null) throw new Error('el-select not available')

		const ktFieldComponent = ktFieldRef.value
		if (ktFieldComponent === null) throw new Error('kt-field not available')

		const popperComponent = elSelectComponent.$refs.popper as Vue & {
			referenceElm: Element
		}
		const ktFieldInputEl = ktFieldComponent.$refs.inputContainerRef as Element

		popperComponent.referenceElm = ktFieldInputEl
	})
}
export const usePopperWidthFix = <
	SELECT_DATA_TYPE extends
		| KtFieldSelect.Single.Value
		| KtFieldSelect.Multiple.Value
>(
	elSelectRef: Ref<
		| (ElSelect & {
				inputWidth: number
				setSoftFocus(): void
		  })
		| null
	>,
	ktFieldRef: Ref<Vue | null>,
	field: KottiField.Hook.Returns<SELECT_DATA_TYPE>,
) => {
	watchEffect(() => {
		/**
		 * If the field is loading, we want to unfocus in case the popper is open
		 * so that when isLoading changes, the popper isn't misplaced
		 */
		const elSelectComponent = elSelectRef.value
		if (elSelectComponent === null) throw new Error('el-select not ready')
		if (field.isLoading) {
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
