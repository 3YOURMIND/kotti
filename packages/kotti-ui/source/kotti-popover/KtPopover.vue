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
				<IconTextItem
					v-for="(option, index) in options"
					:key="index"
					:dataTest="option.dataTest"
					:icon="option.icon"
					:isDisabled="option.isDisabled"
					:isSelected="option.isSelected"
					:label="option.label"
					@click.stop="handleItemClick(option)"
				/>
			</slot>
		</div>
	</div>
</template>

<script>
import { createPopper } from '@popperjs/core'
import { mixin as clickaway } from 'vue-clickaway'

import { makeProps } from '../make-props'

import IconTextItem from './components/IconTextItem.vue'
import { KottiPopover } from './types'

export default {
	name: 'KtPopover',
	components: { IconTextItem },
	mixins: [clickaway],
	props: makeProps(KottiPopover.propsSchema),
	data() {
		return {
			showPopper: false,
			popper: null,
		}
	},
	computed: {
		popperClass() {
			const classes = ['kt-popper', `kt-popper--size-${this.size}`]

			if (this.options.length >= 1) classes.push(`kt-popper--has-options`)

			return classes
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
			if (option.isDisabled) return

			if (option.onClick) option.onClick()

			if (!this.forceShowPopover) this.showPopper = false
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
		padding: var(--unit-4);
		margin: calc(-1 * var(--unit-1));
	}
}

// popper.js css
.kt-popper {
	z-index: $zindex-4;
	padding: 0.8rem;
	background: var(--white);
	border-radius: var(--border-radius);
	box-shadow: $box-shadow;

	&--has-options {
		min-width: 200px;
		padding: 0.4rem;
	}

	&--size {
		&-auto {
			width: auto;
		}

		&-sm {
			width: 12rem;
		}

		&-md {
			width: 16rem;
		}

		&-lg {
			width: 20rem;
		}

		&-xl {
			width: 24rem;
		}
	}
}
</style>
