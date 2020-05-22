import { onMounted, Ref } from '@vue/composition-api'
import { Select as ElSelect } from 'element-ui'

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
