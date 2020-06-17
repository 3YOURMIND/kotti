<template>
	<div
		v-on-clickaway="handleClickaway"
		class="kt-popover"
		:class="{ showPopper }"
	>
		<div ref="anchor" @click="handleClick"><slot>Anchor</slot></div>
		<div v-if="showPopper" ref="content" :class="popperClass">
			<slot :close="handleClickaway" name="content">{{ content }}</slot>
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
		disabled: { type: Boolean, default: false },
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
	computed: {
		popperClass() {
			return {
				'kt-popper': true,
				[`kt-popper kt-popper--${this.size}`]: this.size,
			}
		},
	},
	watch: {
		showPopper() {
			if (this.showPopper) {
				this.$nextTick(() => {
					this.initPopper()
				})
			}
		},
	},
	destroyed() {
		this.destroyPopper()
	},
	methods: {
		handleClick() {
			if (this.disabled) return null
			this.showPopper = !this.showPopper
		},
		handleClickaway() {
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
