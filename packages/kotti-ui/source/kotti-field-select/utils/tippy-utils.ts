import type { Props } from 'tippy.js'

type PopperModifier = Exclude<
	Props['popperOptions']['modifiers'],
	undefined
>[number]

/**
 * @see {@link https://github.com/atomiks/tippyjs/issues/731#issuecomment-596460597}
 */
export const sameWidthOrStyled = (
	styles?: Record<string, unknown>,
): PopperModifier => ({
	enabled: true,
	fn: ({ instance, state }) => {
		const referenceStyles = {
			// make sure to always have width (with the reference element's width as default)
			width: `${state.rects.reference.width}px`,
			...(styles ?? {}),
		}

		// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
		if (state.styles.popper!.width !== referenceStyles.width) {
			for (const [key, value] of Object.entries(referenceStyles)) {
				;(state.styles.popper as Record<string, unknown>)[key] = value
			}

			// force update the popper instance, so it can reposition the dropdown properly
			void instance.update()
		}
	},
	name: 'sameWidthOrStyled',
	phase: 'beforeWrite',
	requires: ['computeStyles'],
})
