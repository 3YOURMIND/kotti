export const KtRow = {
	name: 'KtRow',
	componentName: 'KtRow',
	props: {
		tag: {
			type: String,
			default: 'div',
		},
		gutter: {
			type: Number,
			default: 16,
		},
		type: String,
		justify: {
			type: String,
			default: 'start',
		},
		align: {
			type: String,
			default: 'top',
		},
		gap: Number,
	},
	computed: {
		style() {
			const result = {}

			if (this.gutter) {
				result.marginLeft = `-${this.gutter / 2}px`
				result.marginRight = result.marginLeft
			}

			return result
		},
	},
	render(h) {
		return h(
			this.tag,
			{
				class: [
					'kt-row',
					this.justify !== 'start' ? `kt-row--justify-${this.justify}` : '',
					this.align !== 'top' ? `kt-row--align-${this.align}` : '',
				],
				style: this.style,
			},
			this.$slots.default,
		)
	},
}
