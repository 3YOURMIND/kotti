<template>
	<div
		v-on-clickaway="handleClickaway"
		class="kt-popover"
		:class="{ showPopper }"
	>
		<div ref="anchor" @click="handleAnchorClick">
			<slot>Anchor</slot>
		</div>
		<div v-if="showPopper" ref="content" :class="popperClass">
			<slot :close="handleClickaway" name="content">
				<KtPopoverIconTextItem
					v-for="(option, index) in options"
					:key="index"
					:icon="option.icon"
					:isDisabled="option.isDisabled"
					:label="option.label"
					@click="handleItemClick(option)"
				/>
			</slot>
		</div>
	</div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { mixin as clickaway } from 'vue-clickaway'

import { isYocoIcon } from '../validators'

import KtPopoverIconTextItem from './KtPopoverIconTextItem.vue'

const optionIsValid = (option) =>
	typeof option === 'object' &&
	option !== null &&
	(typeof option.icon === 'undefined' || isYocoIcon(option.icon)) &&
	['undefined', 'boolean'].includes(typeof option.isDisabled) &&
	['undefined', 'function'].includes(typeof option.onClick) &&
	['undefined', 'string'].includes(typeof option.label)

export default {
	name: 'KtPopover',
	components: { KtPopoverIconTextItem },
	mixins: [clickaway],
	props: {
		content: { default: '', type: String },
		forceShowPopover: { default: null, type: Boolean },
		options: {
			default: () => [],
			type: Array,
			validator: (options) => options.every(optionIsValid),
		},
		placement: { default: 'bottom', type: String },
		size: { default: null, type: String },
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
		handleItemClick(option) {
			if (!option.isDisabled && option.onClick) option.onClick()
		},
		handleAnchorClick() {
			if (!this.forceShowPopoverIsNull) return
			this.showPopper = !this.showPopper
		},
		handleClickaway() {
			if (!this.forceShowPopoverIsNull) return
			this.showPopper = false
		},
		initPopper() {
			const propsOptions = {
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
							// eslint-disable-next-line no-magic-numbers
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

			this.popper = createPopper(this.$refs.anchor, this.$refs.content, {
				...propsOptions,
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
@import '../kotti-style/_variables.scss';
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
	background: var(--white);
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
