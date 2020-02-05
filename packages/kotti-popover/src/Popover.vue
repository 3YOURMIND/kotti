<template>
	<div
		class="kt-popover"
		:class="{ showPopper }"
		v-on-clickaway="handleClickaway"
	>
		<div ref="anchor" @click="handleClick"><slot>Anchor</slot></div>
		<div :class="popperClass" v-if="showPopper" ref="content">
			<slot name="content" :close="handleClickaway">{{ content }}</slot>
		</div>
	</div>
</template>
<script>
import Popper from 'popper.js'
import { mixin as clickaway } from 'vue-clickaway'
export default {
	name: 'KtPopover',
	mixins: [clickaway],
	props: {
		placement: { type: String, default: 'bottom' },
		size: { type: String, default: null },
		content: { type: String, default: '' },
		forceShowPopover: {
			type: Boolean,
			required: false,
			default: null,
		},
		forceDisable: {
			type: Boolean,
			required: false,
			default: false,
		},
	},
	mounted() {
		if (this.forceShowPopover !== null && !this.forceDisable) {
			this.showPopper = this.forceShowPopover
		}
	},
	data() {
		return {
			showPopper: false,
			popper: null,
		}
	},
	ready() {
		if (!this.forceDisable) {
			this.$nextTick(() => {
				if (this.showPopper) {
					this.initPopper()
				}
			})
		}
	},
	watch: {
		showPopper() {
			if (!this.forceDisable && !!this.showPopper) {
				this.$nextTick(() => {
					this.initPopper()
				})
			}
		},
		forceShowPopover(val) {
			console.log(val)
			if (!this.forceDisable && val !== null) {
				this.showPopper = val
			}
		},
	},
	destroyed() {
		this.destroyPopper()
	},
	computed: {
		popperClass() {
			return this.size ? `kt-popper kt-popper--${this.size}` : `kt-popper`
		},
	},
	methods: {
		handleClick() {
			if (!this.forceDisable) {
				this.showPopper = !this.showPopper
			}
		},
		handleClickaway() {
			if (!this.forceDisable) this.showPopper = false
		},
		initPopper() {
			if (!this.forceDisable) {
				this.popper = new Popper(this.$refs.anchor, this.$refs.content, {
					placement: this.placement,
					modifiers: {
						flip: false,
					},
				})
			}
		},
		destroyPopper() {
			if (!this.forceDisable && this.popper) {
				this.popper.destroy()
				this.popper = null
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.kt-popover {
	display: inline-block;
}
</style>
