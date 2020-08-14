import { createElement, computed, defineComponent } from '@vue/composition-api'

import { makeInstallable } from '../next/utilities'

export const KtCol = makeInstallable(
	defineComponent({
		name: 'KtCol',
		props: {
			lg: { default: null, type: [Number, Object] },
			md: { default: null, type: [Number, Object] },
			offset: { default: null, type: Number },
			pull: { default: null, type: Number },
			push: { default: null, type: Number },
			sm: { default: null, type: [Number, Object] },
			span: { default: 24, type: Number },
			tag: { default: 'div', type: String },
			xl: { default: null, type: [Number, Object] },
			xs: { default: null, type: [Number, Object] },
		},
		setup(props, { parent, slots }) {
			const space = computed(() => {
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				let parentPointer: any = parent

				while (
					parentPointer &&
					parentPointer.$options.componentName !== 'KtRow'
				)
					parentPointer = parentPointer.$parent

				return {
					gap: parentPointer?.gap ?? 0,
					gutter: parentPointer?.gutter ?? 0,
				}
			})

			const style = computed(() => {
				const result: Record<string, string> = {}

				const { gap, gutter } = space.value

				if (gap) result.paddingTop = result.paddingBottom = `${gap / 2}px`
				if (gutter) result.paddingLeft = result.paddingRight = `${gutter / 2}px`

				return result
			})

			const classes = computed(() => {
				const classList = ['kt-col']

				;(['span', 'offset', 'pull', 'push'] as Array<
					keyof typeof props
				>).forEach((key) => {
					const value = props[key]

					if (value !== null)
						classList.push(
							key === 'span'
								? `kt-col-${value}`
								: `kt-col-${String(key)}-${value}`,
						)
				})
				;(['span', 'offset', 'pull', 'push'] as Array<
					keyof typeof props
				>).forEach((key) => {
					const value = props[key]

					if (typeof value === 'number')
						classList.push(`kt-col-${String(key)}-${value}`)
					else if (typeof value === 'object')
						Object.keys(value).forEach((prop) =>
							classList.push(`kt-col-${String(key)}-${prop}-${value}`),
						)
				})

				return classList
			})

			return () =>
				createElement(
					props.tag,
					{
						class: classes,
						style,
					},
					[slots.default()],
				)
		},
	}),
)
