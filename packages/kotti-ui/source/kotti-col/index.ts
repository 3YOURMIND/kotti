import { h, computed, defineComponent, inject } from 'vue'
import type { PropType } from 'vue'

import { KT_ROW_CONTEXT } from '../kotti-row/constants'
import type { KottiRow } from '../kotti-row/types'
import { attachMeta, makeInstallable } from '../utilities'

import type { KottiCol } from './types'

export const KtCol = attachMeta(
	makeInstallable(
		defineComponent({
			name: 'KtCol',
			props: {
				lg: {
					default: null,
					type: Number as PropType<KottiCol.PropsInternal['lg']>,
				},
				md: {
					default: null,
					type: Number as PropType<KottiCol.PropsInternal['md']>,
				},
				offset: {
					default: null,
					type: Number as PropType<KottiCol.PropsInternal['offset']>,
				},
				pull: {
					default: null,
					type: Number as PropType<KottiCol.PropsInternal['pull']>,
				},
				push: {
					default: null,
					type: Number as PropType<KottiCol.PropsInternal['push']>,
				},
				sm: {
					default: null,
					type: Number as PropType<KottiCol.PropsInternal['sm']>,
				},
				span: {
					default: 24,
					type: Number as PropType<KottiCol.PropsInternal['span']>,
				},
				tag: {
					default: 'div',
					type: String as PropType<KottiCol.PropsInternal['tag']>,
				},
				xl: {
					default: null,
					type: Number as PropType<KottiCol.PropsInternal['xl']>,
				},
				xs: {
					default: null,
					type: Number as PropType<KottiCol.PropsInternal['xs']>,
				},
			},
			setup(props, { slots }) {
				const context = inject<KottiRow.Context | null>(KT_ROW_CONTEXT, null)

				const style = computed(() => {
					if (context === null) return undefined

					const { gap, gutter } = context

					return {
						paddingBottom: `${(gap.value / 2).toString()}px`,
						paddingLeft: `${(gutter.value / 2).toString()}px`,
						paddingRight: `${(gutter.value / 2).toString()}px`,
						paddingTop: `${(gap.value / 2).toString()}px`,
					}
				})

				const classes = computed(() => [
					'kt-col',
					`kt-col-${props.span.toString()}`,
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
						.map(([key, value]) => `kt-col-${key}-${value?.toString() ?? ''}`),
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
		designs: null,
		slots: {
			default: { description: null, scope: null },
		},
		typeScript: {
			namespace: 'Kotti.Col',
			schema: null,
		},
	},
)
