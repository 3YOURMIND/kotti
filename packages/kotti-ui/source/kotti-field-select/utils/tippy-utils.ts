import { Props } from 'tippy.js'

type PopperModifier = Exclude<
	Props['popperOptions']['modifiers'],
	undefined
>[number]

/**
 * @see https://github.com/atomiks/tippyjs/issues/731#issuecomment-596460597
 */
export const sameWidth: PopperModifier = {
	enabled: true,
	fn: ({ instance, state }) => {
		const triggerReferenceWidth = `${state.rects.reference.width}px`

		if (state.styles.popper.width !== triggerReferenceWidth) {
			state.styles.popper.width = triggerReferenceWidth
			// force update the popper instance, so it can reposition the dropdown properly
			instance.update()
		}
	},
	name: 'sameWidth',
	phase: 'beforeWrite',
	requires: ['computeStyles'],
}
