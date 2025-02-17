import castArray from 'lodash/castArray.js'
import type { Props as TippyProps } from 'tippy.js'
import type { Ref } from 'vue'
import { computed, inject, ref } from 'vue'

import { useTippy } from '@3yourmind/vue-use-tippy'

import { TIPPY_DISTANCE_OFFSET } from '../../constants'
import type { KottiField } from '../../kotti-field/types'
import { KT_IS_IN_POPOVER } from '../../kotti-popover/constants'
import { sameWidth } from '../utils/tippy-utils'

const TIPPY_CONTENT_WRAPPER_CLASSES = new Set(['tippy-box', 'tippy-content'])

export const isTippyContentWrapper = (element: HTMLElement): boolean =>
	[...element.classList].some((className) =>
		TIPPY_CONTENT_WRAPPER_CLASSES.has(className),
	)

export const useSelectTippy = <T>(
	field: KottiField.Hook.Returns<T>,
	triggerTargets?: Ref<TippyProps['triggerTarget']>,
): {
	isDropdownMounted: Ref<boolean>
	isDropdownOpen: Ref<boolean>
	setIsDropdownOpen: (isDropdownOpen: boolean) => void
	tippyContentRef: Ref<HTMLElement | null>
	tippyRef: Ref<HTMLElement | null>
} => {
	const tippyRef = ref<HTMLElement | null>(null)
	const tippyContentRef = ref<HTMLElement | null>(null)

	// track in a ref because the `tippy.state.isShown` doesn’t immediately update
	const isDropdownOpen = ref(false)
	const isDropdownMounted = ref(true)
	const isInPopover = inject(KT_IS_IN_POPOVER, false)

	const { tippy } = useTippy(
		tippyRef,
		computed(() => ({
			/**
			 * if inside a popover, we want to stay inside the same CSS stacking context
			 * @see {@link https://atomiks.github.io/tippyjs/v6/all-props/#appendto}
			 */
			appendTo: isInPopover ? 'parent' : () => document.body,
			arrow: false,
			content: tippyContentRef.value ?? undefined,
			// hides the tippy if we click-away from the tippy
			hideOnClick: false,
			interactive: true,
			maxWidth: 'none',
			offset: [0, TIPPY_DISTANCE_OFFSET],
			onClickOutside: () => {
				// eslint-disable-next-line @typescript-eslint/no-use-before-define
				setIsDropdownOpen(false)
			},
			onHidden: () => {
				isDropdownMounted.value = false
			},
			onHide: () => {
				isDropdownOpen.value = false
			},
			onShow: () => {
				if (field.isDisabled || field.isLoading) return false

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
			triggerTarget: triggerTargets?.value ?? undefined,
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
		tippyRef,
	}
}
