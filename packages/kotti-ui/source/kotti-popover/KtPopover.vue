<template>
	<div
		v-on-clickaway="handleClickaway"
		class="kt-popover"
		:class="{ showPopper }"
	>
		<div ref="anchorRef" @click="handleAnchorClick">
			<slot>Anchor</slot>
		</div>
		<div v-if="showPopper" ref="contentRef" :class="popperClass">
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

<script lang="ts">
import { createPopper } from '@popperjs/core'
import {
	computed,
	defineComponent,
	onMounted,
	onUnmounted,
	ref,
	watch,
} from '@vue/composition-api'
import { mixin as clickaway } from 'vue-clickaway'

import { makeProps } from '../make-props'

import IconTextItem from './components/IconTextItem.vue'
import { KottiPopover } from './types'

const optionIsValid = (option) =>
	typeof option === 'object' &&
	option !== null &&
	(typeof option.icon === 'undefined' || isYocoIcon(option.icon)) &&
	['undefined', 'boolean'].includes(typeof option.isDisabled) &&
	(option.isDisabled || typeof option.onClick === 'function') &&
	['undefined', 'string'].includes(typeof option.label) &&
	['undefined', 'string'].includes(typeof option.dataTest)

export default defineComponent({
	name: 'KtPopover',
	components: { IconTextItem },
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
		size: { default: 'auto', type: String },
	},
	setup(props) {
		const showPopper = ref(false)
		const popper = ref(null)

		const anchorRef = ref<HTMLElement | null>(null)
		const contentRef = ref<HTMLElement | null>(null)

		const forceShowPopoverIsNull = computed(
			() => props.forceShowPopover === null,
		)

		const initPopper = () => {
			const propsOptions = {
				placement: props.placement,
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

			popper.value = createPopper(anchorRef.value, contentRef.value, {
				...propsOptions,
			})
		}

		watch(showPopper, (value) => {
			if (value) initPopper()
		})

		watch(
			() => props.forceShowPopover,
			(value) => {
				if (value !== null) {
					showPopper.value = value
				}
			},
		)

		onMounted(() => {
			if (!forceShowPopoverIsNull.value) {
				showPopper.value = props.forceShowPopover
			}
		})

		onUnmounted(() => {
			if (forceShowPopoverIsNull.value && popper.value) {
				popper.value.destroy()
				popper.value = null
			}
		})

		return {
			anchorRef,
			contentRef,
			handleAnchorClick: () => {
				if (!forceShowPopoverIsNull.value) return
				showPopper.value = !showPopper.value
			},
			handleClickaway: () => {
				if (!forceShowPopoverIsNull.value) return
				showPopper.value = false
			},
			handleItemClick: (option) => {
				if (!option.isDisabled && option.onClick) option.onClick()
			},
			popperClass: computed(() => {
				const classes = ['kt-popper', `kt-popper--size-${props.size}`]

				if (props.options.length >= 1) classes.push(`kt-popper--has-options`)

				return classes
			}),
			showPopper,
		}
	},
})
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
