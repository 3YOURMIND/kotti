import { defineComponent, computed, createElement } from '@vue/composition-api'

import { makeInstallable } from '../next/utilities'

const KtRow = defineComponent({
	name: 'KtRow',
	props: {
		align: { default: 'top', type: String },
		gap: Number,
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
