import {
	defineComponent,
	computed,
	createElement,
	provide,
} from '@vue/composition-api'

import { makeInstallable } from '../next/utilities'

import { KT_ROW_CONTEXT } from './constants'
import { KottiRow } from './types'

const KtRow = defineComponent({
	name: 'KtRow',
	props: {
		align: { default: 'top', type: String },
		gap: { default: 0, type: Number },
		gutter: { default: 16, type: Number },
		justify: { default: 'start', type: String },
		tag: { default: 'div', type: String },
		type: String,
	},
	setup(props, { slots }) {
		const style = computed(() =>
			props.gutter
				? {
						marginLeft: `-${props.gutter / 2}px`,
						marginRight: `-${props.gutter / 2}px`,
				  }
				: {},
		)

		provide<KottiRow.Context>(KT_ROW_CONTEXT, {
			gap: computed(() => props.gap),
			gutter: computed(() => props.gutter),
		})

		return () =>
			createElement(
				props.tag,
				{
					class: [
						'kt-row',
						props.justify !== 'start' ? `kt-row--justify-${props.justify}` : '',
						props.align !== 'top' ? `kt-row--align-${props.align}` : '',
					],
					style: style.value,
				},
				[slots.default()],
			)
	},
})

makeInstallable(KtRow)
export { KtRow }
