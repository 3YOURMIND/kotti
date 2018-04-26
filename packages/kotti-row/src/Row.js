export default {
	name: 'KtRow',

	componentName: 'KtRow',

	props: {
		tag: {
			type: String,
			default: 'div',
		},
		gutter: Number,
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
			const ret = {};

			if (this.gutter) {
				ret.marginLeft = `-${this.gutter / 2}px`;
				ret.marginRight = ret.marginLeft;
			}

			if (this.gap) {
				ret.marginTop = `-${this.gap / 2}px`;
				ret.marginBottom = ret.marginBottom;
			}

			return ret;
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
			this.$slots.default
		);
	},
};
