<template>
	<div class="kt-popover" v-on-clickaway="handleClickaway">
		<div ref="anchor" @click="handleClick"><slot>Anchor</slot></div>
		<div :class="popperClass" v-if="showPopper" ref="content">
			<slot name="content">{{ content }}</slot>
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
		size: { type: String, default: 'sm' },
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
			return `kt-popper kt-popper--${this.size}`
		},
	},
	methods: {
		handleClick() {
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
