import type { Props } from 'tippy.js'

import { POPPER_MAX_WIDTH, POPPER_MIN_WIDTH } from '../constants'

type PopperModifier = Exclude<
	Props['popperOptions']['modifiers'],
	undefined
>[number]

/**
 * @see {@link https://github.com/atomiks/tippyjs/issues/731#issuecomment-596460597}
 */
export const matchInputOrExpand: PopperModifier = {
	enabled: true,
	fn: ({ instance, state }) => {
		const triggerReferenceWidth = state.rects.reference.width

		const popperWidth =
			triggerReferenceWidth < POPPER_MIN_WIDTH
				? 'auto'
				: `${triggerReferenceWidth}px`

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- popper style always exists at runtime
		if (state.styles.popper!.width !== popperWidth) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			state.styles.popper!.width = popperWidth

			if (popperWidth === 'auto') {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				state.styles.popper!.maxWidth = `${POPPER_MAX_WIDTH}px`
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				state.styles.popper!.minWidth = `${POPPER_MIN_WIDTH}px`
			} else {
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				state.styles.popper!.maxWidth = 'initial'
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				state.styles.popper!.minWidth = 'initial'
			}

			// force update the popper instance, so it can reposition the dropdown properly
			void instance.update()
		}
	},
	name: 'atLeastSameWidth',
	phase: 'beforeWrite',
	requires: ['computeStyles'],
}
