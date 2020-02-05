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
	},
	mounted() {
		if (!this.forceShowPopoverIsNull) {
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
		if (this.forceShowPopoverIsNull) {
			this.$nextTick(() => {
				if (this.showPopper) {
					this.initPopper()
				}
			})
		}
	},
	watch: {
		showPopper() {
			if (!!this.showPopper) {
				this.$nextTick(() => {
					this.initPopper()
				})
			}
		},
		forceShowPopover(val) {
			if (val !== null) {
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
		forceShowPopoverIsNull() {
			return this.forceShowPopover === null
		},
	},
	methods: {
		handleClick() {
			if (!this.forceShowPopoverIsNull) return
			this.showPopper = !this.showPopper
		},
		handleClickaway() {
			if (!this.forceShowPopoverIsNull) return
			this.showPopper = false
		},
		initPopper() {
			this.popper = new Popper(this.$refs.anchor, this.$refs.content, {
				placement: this.placement,
				modifiers: {
					flip: false,
				},
			})
		},
		destroyPopper() {
			if (this.forceShowPopoverIsNull && this.popper) {
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
