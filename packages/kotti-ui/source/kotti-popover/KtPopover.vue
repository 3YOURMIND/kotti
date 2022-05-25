<template>
	<div class="kt-popover">
		<div ref="triggerRef">
			<slot />
		</div>
		<div ref="contentRef" :class="contentClass">
			<slot :close="close" name="content">
				<IconTextItem
					v-for="(option, index) in options"
					:key="index"
					:dataTest="option.dataTest"
					:icon="option.icon"
					:isClickable="option.onClick !== undefined"
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
import { useTippy } from '@3yourmind/vue-use-tippy'
import { computed, defineComponent, Ref, ref } from '@vue/composition-api'
import { Instance, roundArrow, Props as TippyProps } from 'tippy.js'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../constants'
import { makeProps } from '../make-props'

import IconTextItem from './components/IconTextItem.vue'
import { KottiPopover } from './types'

const TRIGGER_MAP: Record<KottiPopover.Trigger, TippyProps['trigger']> = {
	[KottiPopover.Trigger.CLICK]: 'click',
	[KottiPopover.Trigger.HOVER]: 'mouseenter focusin',
	[KottiPopover.Trigger.MANUAL]: 'manual',
}

export default defineComponent<KottiPopover.PropsInternal>({
	name: 'KtPopover',
	components: {
		IconTextItem,
	},
	props: makeProps(KottiPopover.propsSchema),
	setup(props) {
		const triggerRef = ref<HTMLElement | null>(null)
		const contentRef = ref<HTMLElement | null>(null)

		const hideOnClick = computed((): TippyProps['hideOnClick'] => {
			switch (props.clickBehavior) {
				/** default behavior */
				case null:
					return props.trigger === KottiPopover.Trigger.HOVER
						? false
						: props.trigger === KottiPopover.Trigger.CLICK
						? 'toggle'
						: true
				case KottiPopover.ClickBehavior.HIDE_ON_CLICK_AWAY:
					return true
				case KottiPopover.ClickBehavior.HIDE_ON_TOGGLE:
					return 'toggle'
				case KottiPopover.ClickBehavior.IGNORE:
					return false
			}
		})

		const tippy = useTippy(
			triggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: contentRef.value,
				interactive: true,
				maxWidth: 'none',
				offset: [0, TIPPY_LIGHT_BORDER_ARROW_HEIGHT],
				placement: props.placement,
				theme: 'light-border',
				trigger: TRIGGER_MAP[props.trigger],
				/**
				 * @see {@link https://atomiks.github.io/tippyjs/v6/all-props/#hideonclick}
				 */
				hideOnClick: hideOnClick.value,
			})),
		).tippy as Ref<Instance>

		const close = () => tippy.value.hide()

		return {
			close,
			contentRef,
			handleItemClick: (option: KottiPopover.PropsInternal['options'][0]) => {
				if (!option.isDisabled && option.onClick) {
					option.onClick()
					close()
				}
			},
			open: () => tippy.value.show(),
			contentClass: computed(() => {
				const classes = [
					'kt-popover__content',
					`kt-popover__content--size-${props.size}`,
				]

				if (props.options.length >= 1)
					classes.push(`kt-popover__content--has-options`)

				return classes
			}),
			triggerRef,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-popover {
	display: inline-block;

	&__content {
		margin: 3px -1px; // tippy theme applies 5px 9px padding, therefore this equals 8px 8px

		&--has-options {
			min-width: 200px;
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
}
</style>
