import {
	defineComponent,
	computed,
	createElement,
	provide,
} from '@vue/composition-api'

import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

import { KT_ROW_CONTEXT } from './constants'

export const KtRow = attachMeta(
	makeInstallable(
		defineComponent({
			name: 'KtRow',
			props: {
				align: { default: Kotti.Row.Align.TOP, type: String },
				gap: { default: 0, type: Number },
				gutter: { default: 16, type: Number },
				justify: { default: Kotti.Row.Justify.START, type: String },
				tag: { default: 'div', type: String },
				type: String,
			},
			setup(props: Kotti.Row.PropsInternal, { slots }) {
				const style = computed(() =>
					props.gutter
						? {
								marginLeft: `-${props.gutter / 2}px`,
								marginRight: `-${props.gutter / 2}px`,
						  }
						: {},
				)

				provide<Kotti.Row.Context>(KT_ROW_CONTEXT, {
					gap: computed(() => props.gap),
					gutter: computed(() => props.gutter),
				})

				return () =>
					createElement(
						props.tag,
						{
							class: [
								'kt-row',
								props.justify !== 'start'
									? `kt-row--justify-${props.justify}`
									: '',
								props.align !== 'top' ? `kt-row--align-${props.align}` : '',
							],
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
		typeScript: {
			namespace: 'Kotti.Row',
		},
	},
)
