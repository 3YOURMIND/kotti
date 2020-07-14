export default {
	name: 'KtCol',

	props: {
		span: {
			type: Number,
			default: 24,
		},
		tag: {
			type: String,
			default: 'div',
		},
		offset: Number,
		pull: Number,
		push: Number,
		xs: [Number, Object],
		sm: [Number, Object],
		md: [Number, Object],
		lg: [Number, Object],
		xl: [Number, Object],
	},

	computed: {
		space() {
			let parent = this.$parent
			while (parent && parent.$options.componentName !== 'KtRow') {
				parent = parent.$parent
			}
			return {
				gutter: parent ? parent.gutter : 0,
				gap: parent ? parent.gap : 0,
			}
		},
	},
	render(h) {
		const classList = []
		const style = {}

		if (this.space.gutter) {
			style.paddingLeft = this.space.gutter / 2 + 'px'
			style.paddingRight = style.paddingLeft
		}
		if (this.space.gap) {
			style.paddingTop = this.space.gap / 2 + 'px'
			style.paddingBottom = style.paddingTop
		}

		;['span', 'offset', 'pull', 'push'].forEach((prop) => {
			if (this[prop] || this[prop] === 0) {
				classList.push(
					prop !== 'span'
						? `kt-col-${prop}-${this[prop]}`
						: `kt-col-${this[prop]}`,
				)
			}
		})
		;['xs', 'sm', 'md', 'lg', 'xl'].forEach((size) => {
			if (typeof this[size] === 'number') {
				classList.push(`kt-col-${size}-${this[size]}`)
			} else if (typeof this[size] === 'object') {
				const props = this[size]
				Object.keys(props).forEach((prop) => {
					classList.push(
						prop !== 'span'
							? `kt-col-${size}-${prop}-${props[prop]}`
							: `kt-col-${size}-${props[prop]}`,
					)
				})
			}
		})

		return h(
			this.tag,
			{
				class: ['kt-col', classList],
				style,
			},
			this.$slots.default,
		)
	},
}
