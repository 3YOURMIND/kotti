<template>
	<div
		v-on-clickaway="handleClickaway"
		class="kt-popover"
		:class="{ showPopper }"
	>
		<div ref="anchor" @click="handleClick">
			<slot>Anchor</slot>
		</div>
		<div v-if="showPopper" ref="content" :class="popperClass">
			<slot name="content" :close="handleClickaway">
				{{ content }}
			</slot>
		</div>
	</div>
</template>
<script>
import { createPopper } from '@popperjs/core'
import { mixin as clickaway } from 'vue-clickaway'
export default {
	name: 'KtPopover',
	mixins: [clickaway],
	props: {
		placement: { type: String, default: 'bottom' },
		size: { type: String, default: null },
		content: { type: String, default: '' },
		options: { type: Object, default: () => {} },
		forceShowPopover: {
			type: Boolean,
			required: false,
			default: null,
		},
	},
	data() {
		return {
			showPopper: false,
			popper: null,
		}
	},
	computed: {
		popperClass() {
			return this.size ? `kt-popper kt-popper--${this.size}` : `kt-popper`
		},
		forceShowPopoverIsNull() {
			return this.forceShowPopover === null
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
		forceShowPopover(val) {
			if (val !== null) {
				this.showPopper = val
			}
		},
	},
	mounted() {
		if (!this.forceShowPopoverIsNull) {
			this.showPopper = this.forceShowPopover
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
	destroyed() {
		this.destroyPopper()
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
			let propsOptions = {
				placement: this.placement,
				modifiers: [
					{
						name: 'flip',
						enabled: true,
						options: {
							padding: 8,
						},
					},
					{
						name: 'offset',
						options: {
							offset: [0, 8],
						},
					},
					{
						name: 'preventOverflow',
						enabled: true,
						options: {
							padding: 8,
						},
					},
				],
			}
			let options = { ...options, ...propsOptions }
			this.popper = createPopper(this.$refs.anchor, this.$refs.content, options)
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
	&-item {
		padding: $unit-4;
		margin: -$unit-1;
	}
}

// poper.js css
.kt-popper {
	z-index: $zindex-4;
	width: auto;
	padding: 0.8rem;
	background: #fff;
	border-radius: $border-radius;
	box-shadow: $box-shadow;
	&--sm {
		width: 12rem;
	}
	&--md {
		width: 16rem;
	}
	&--lg {
		width: 20rem;
	}
	&--xl {
		width: 24rem;
	}
	&--xxl {
		width: 28rem;
	}
	&--xxxl {
		width: 32rem;
	}
}
</style>
