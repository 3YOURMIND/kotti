import { useTippy } from '@3yourmind/vue-use-tippy'
import { computed, inject, ref } from '@vue/composition-api'
import castArray from 'lodash.castarray'
import { roundArrow } from 'tippy.js'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../../constants'
import { KT_IS_IN_POPOVER } from '../../kotti-popover/constants'
import { sameWidth } from '../utils/tippy-utils'

export const useSelectTippy = () => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const tippyTriggerRef = ref<any | null>(null)
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const tippyContentRef = ref<any | null>(null)

	// track in a ref because the `tippy.state.isShown` doesn’t immediately update
	const isDropdownOpen = ref(false)
	const isDropdownMounted = ref(true)
	const isInPopover = inject(KT_IS_IN_POPOVER, false)

	const { tippy } = useTippy(
		tippyTriggerRef,
		computed(() => ({
			/**
			 * if inside a popover, we want to stay inside the same CSS stacking context
			 * @see {@link https://atomiks.github.io/tippyjs/v6/all-props/#appendto}
			 */
			appendTo: isInPopover ? 'parent' : () => document.body,
			arrow: roundArrow,
			content: tippyContentRef.value,
			// hides the tippy if we click-away from the tippy
			hideOnClick: false,
			interactive: true,
			maxWidth: 'none',
			offset: [0, TIPPY_LIGHT_BORDER_ARROW_HEIGHT],
			onClickOutside: () => {
				setIsDropdownOpen(false)
			},
			onHidden: () => {
				isDropdownMounted.value = false
			},
			onHide: () => {
				isDropdownOpen.value = false
			},
			onShow: () => {
				// More correct here, don't move to `onShown()`
				isDropdownMounted.value = true

				isDropdownOpen.value = true
			},
			placement: 'bottom',
			popperOptions: {
				modifiers: [sameWidth],
			},
			theme: 'light-border',
			trigger: 'click focusin',
		})),
	)

	const setIsDropdownOpen = (showTippy: boolean) => {
		if (!tippy.value) return

		const tippys = castArray(tippy.value)

		for (const tippy of tippys) {
			if (showTippy) tippy.show()
			else tippy.hide()
		}
	}

	return {
		isDropdownMounted,
		isDropdownOpen,
		setIsDropdownOpen,
		tippyContentRef,
		tippyTriggerRef,
	}
}
