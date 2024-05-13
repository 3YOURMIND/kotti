import type { Props } from 'tippy.js'

type PopperModifier = Exclude<
	Props['popperOptions']['modifiers'],
	undefined
>[number]

/**
 * @see {@link https://github.com/atomiks/tippyjs/issues/731#issuecomment-596460597}
 */
export const sameWidth: PopperModifier = {
	enabled: true,
	fn: ({ instance, state }) => {
		const triggerReferenceWidth = `${state.rects.reference.width.toString()}px`

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- popper style always exists at runtime
		if (state.styles.popper!.width !== triggerReferenceWidth) {
			// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
			state.styles.popper!.width = triggerReferenceWidth
			// force update the popper instance, so it can reposition the dropdown properly
			void instance.update()
		}
	},
	name: 'sameWidth',
	phase: 'beforeWrite',
	requires: ['computeStyles'],
}
