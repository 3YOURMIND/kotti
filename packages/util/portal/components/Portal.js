import Vue from 'vue'

import config, { isBrowser } from '../config'

import TargetContainer from './TargetContainer'

const append = (targetEl, el) => {
	if (targetEl.append) {
		targetEl.append(el)
	} else if (targetEl.appendChild) {
		targetEl.appendChild(el)
	}
}

export default Vue.extend({
	name: 'VueSimplePortal',
	props: {
		disabled: {
			type: Boolean,
		},
		prepend: {
			type: Boolean,
		},
		selector: {
			type: String,
			default: function _default() {
				return '#'.concat(config.selector)
			},
		},
		tag: {
			type: String,
			default: 'DIV',
		},
	},
	watch: {
		disabled: {
			immediate: true,
			handler: function handler(disabled) {
				disabled ? this.unmount() : this.$nextTick(this.mount)
			},
		},
	},
	created() {
		if (!this.getTargetEl()) {
			this.insertTargetEl()
		}
	},
	updated() {
		// eslint-disable-next-line @typescript-eslint/no-this-alias
		const _this = this

		// We only update the target container component
		// if the scoped slot function is a fresh one
		// The new slot syntax (since Vue 2.6) can cache unchanged slot functions
		// and we want to respect that here.
		// FIXME: Removing the function() in favor of arrow functions will most likely fix the need for the _this alias
		this.$nextTick(function() {
			if (!_this.disabled && _this.slotFn !== _this.$scopedSlots.default) {
				_this.container.updatedNodes = _this.$scopedSlots.default
			}

			_this.slotFn = _this.$scopedSlots.default
		})
	},
	beforeDestroy() {
		this.unmount()
	},
	methods: {
		// This returns the element into which the content should be mounted.
		getTargetEl() {
			if (!isBrowser) return
			return document.querySelector(this.selector)
		},
		insertTargetEl() {
			if (!isBrowser) return
			const parent = document.querySelector('body')
			const child = document.createElement(this.tag)
			child.id = this.selector.substring(1)
			append(parent, child)
		},
		mount() {
			if (!isBrowser) return
			const targetEl = this.getTargetEl()
			const el = document.createElement('DIV')

			if (this.prepend && targetEl.firstChild) {
				targetEl.insertBefore(el, targetEl.firstChild)
			} else {
				append(targetEl, el)
			}

			this.container = new TargetContainer({
				el: el,
				parent: this,
				propsData: {
					tag: this.tag,
					nodes: this.$scopedSlots.default,
				},
			})
		},
		unmount() {
			if (this.container) {
				this.container.$destroy()
				delete this.container
			}
		},
	},
	render(h) {
		if (this.disabled) {
			const nodes = this.$scopedSlots && this.$scopedSlots.default()
			if (!nodes) return h()
			return nodes.length < 2 && !nodes[0].text ? nodes : h(this.tag, nodes)
		}

		return h()
	},
})
