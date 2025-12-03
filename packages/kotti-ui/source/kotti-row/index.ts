import type { PropType } from 'vue'
import { computed, defineComponent, h, provide } from 'vue'

import { attachMeta, makeInstallable } from '../utilities'

import { KT_ROW_CONTEXT } from './constants'
import { KottiRow } from './types'

export const KtRow = attachMeta(
	makeInstallable(
		defineComponent({
			name: 'KtRow',
			props: {
				align: {
					default: KottiRow.Align.TOP,
					type: String as PropType<KottiRow.Align>,
				},
				gap: { default: 0, type: Number },
				gutter: { default: 16, type: Number },
				justify: {
					default: KottiRow.Justify.START,
					type: String as PropType<KottiRow.Justify>,
				},
				tag: { default: 'div', type: String },
			},
			setup(props, { slots }) {
				const style = computed(() =>
					props.gutter
						? {
								marginLeft: `-${String(props.gutter / 2)}px`,
								marginRight: `-${String(props.gutter / 2)}px`,
							}
						: {},
				)

				provide<KottiRow.Context>(KT_ROW_CONTEXT, {
					gap: computed(() => props.gap),
					gutter: computed(() => props.gutter),
				})

				return () =>
					h(
						props.tag,
						{
							class: [
								'kt-row',
								props.justify !== KottiRow.Justify.START
									? `kt-row--justify-${props.justify}`
									: '',
								props.align !== KottiRow.Align.TOP
									? `kt-row--align-${props.align}`
									: '',
							],
							style: style.value,
						},
						slots.default?.(),
					)
			},
		}),
	),
	{
		addedVersion: '0.0.1',
		deprecated: null,
		designs: null,
		slots: {
			default: { description: 'Should contain KtCols', scope: null },
		},
		typeScript: {
			namespace: 'Kotti.Row',
			schema: null,
		},
	},
)
