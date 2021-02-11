import { h, computed, defineComponent, inject } from '@vue/composition-api'

import { KT_ROW_CONTEXT } from '../kotti-row/constants'
import { Kotti } from '../types'
import { attachMeta, makeInstallable } from '../utilities'

export const KtCol = attachMeta(
	makeInstallable(
		defineComponent({
			name: 'KtCol',
			props: {
				lg: { default: null, type: Number },
				md: { default: null, type: Number },
				offset: { default: null, type: Number },
				pull: { default: null, type: Number },
				push: { default: null, type: Number },
				sm: { default: null, type: Number },
				span: { default: 24, type: Number },
				tag: { default: 'div', type: String },
				xl: { default: null, type: Number },
				xs: { default: null, type: Number },
			},
			setup(props: Kotti.Col.PropsInternal, { slots }) {
				const context = inject<Kotti.Row.Context | null>(KT_ROW_CONTEXT, null)

				const style = computed(() => {
					if (context === null) return undefined

					const { gap, gutter } = context

					return {
						paddingBottom: `${gap.value / 2}px`,
						paddingLeft: `${gutter.value / 2}px`,
						paddingRight: `${gutter.value / 2}px`,
						paddingTop: `${gap.value / 2}px`,
					}
				})

				const classes = computed(() => [
					'kt-col',
					`kt-col-${props.span}`,
					...Object.entries(props)
						.filter(
							([key, value]) =>
								value !== null &&
								[
									'offset',
									'pull',
									'push',
									'xs',
									'sm',
									'md',
									'lg',
									'xl',
								].includes(key),
						)
						.map(([key, value]) => `kt-col-${key}-${value}`),
				])

				return () =>
					h(
						props.tag,
						{
							class: classes.value,
							style: style.value,
						},
						[slots.default?.() ?? null],
					)
			},
		}),
	),
	{
		addedVersion: '0.0.1',
		deprecated: null,
		slots: {
			default: { description: null, scope: null },
		},
		typeScript: null,
	},
)
