<template>
	<div class="kt-popover" v-on-clickaway="handleClickaway">
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
	},
	data() {
		return {
			showPopper: false,
			popper: null,
		}
	},
	ready() {
		this.$nextTick(() => {
			if (this.showPopper) {
				this.initPopper()
			}
		})
	},
	watch: {
		showPopper(val, oldVal) {
			if (!!this.showPopper) {
				this.$nextTick(() => {
					this.initPopper()
				})
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
			this.showPopper = !this.showPopper
		},
		handleClickaway(e) {
			/**
			 * Early return, if anchor is not descending from the clicked element.
			 * This can occur if a popover contains a dropdown. This dropdown
			 * also makes use of Popper.js with vue/clickaway. Since Popper adds the
			 * dropdown list to the body of the dom, this check is
			 * warranted. Otherwise the closing of the Popover is triggerd by
			 * the select input event.
			 * */
			if (!e.target.contains(this.$refs.anchor)) return
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
			if (this.popper) {
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
