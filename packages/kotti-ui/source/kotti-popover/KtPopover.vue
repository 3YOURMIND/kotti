<template>
	<div class="kt-popover">
		<div ref="triggerRef" tabindex="0">
			<slot :showPopover="showPopover" />
		</div>
		<div ref="contentRef" :class="contentClass">
			<slot :close="close" name="content">
				<IconTextItem
					v-for="(option, index) in options"
					:key="index"
					:dataTest="option.dataTest"
					:icon="option.icon"
					:isActive="option.isActive"
					:isClickable="option.onClick !== undefined"
					:isDisabled="option.isDisabled"
					:label="option.label"
					@click.stop="handleItemClick(option)"
				>
					<!-- eslint-disable-next-line -->
					<template v-if="areOptionsSelectable" slot="option" :option="option">
						<KtFieldToggle
							:dataTest="option.dataTest"
							:formKey="formKey"
							:isDiabled="option.isDiabled"
							:isOptional="option.isOptional"
							:value="option.isSelected"
							@input="(e) => handleItemSelection({ index, option, value: e })"
						>
							<span v-text="option.label" />
						</KtFieldToggle>
					</template>
				</IconTextItem>
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import { useTippy } from '@3yourmind/vue-use-tippy'
import {
	computed,
	defineComponent,
	onMounted,
	ref,
	provide,
	watch,
	inject,
} from '@vue/composition-api'
import { castArray } from 'lodash'
import { roundArrow, Props as TippyProps } from 'tippy.js'

import { TIPPY_LIGHT_BORDER_ARROW_HEIGHT } from '../constants'
import { KT_FORM_CONTEXT } from '../kotti-form'
import { KottiForm } from '../kotti-form/types'
import { makeProps } from '../make-props'

import IconTextItem from './components/IconTextItem.vue'
import { KT_IS_IN_POPOVER } from './constants'
import { KottiPopover } from './types'

const TRIGGER_MAP: Record<KottiPopover.Trigger, TippyProps['trigger']> = {
	[KottiPopover.Trigger.CLICK]: 'click focusin',
	[KottiPopover.Trigger.HOVER]: 'mouseenter focusin',
	[KottiPopover.Trigger.MANUAL]: 'manual',
}

export default defineComponent({
	name: 'KtPopover',
	components: {
		IconTextItem,
	},
	props: makeProps(KottiPopover.propsSchema),
	setup(props: KottiPopover.PropsInternal, { emit }) {
		const triggerRef = ref<HTMLElement | null>(null)
		const contentRef = ref<HTMLElement | null>(null)

		const showPopover = ref(false)

		const formContext = inject<KottiForm.Context | null>(KT_FORM_CONTEXT, null)

		onMounted(() => {
			if (contentRef.value === null)
				throw new Error('KtPopover: Unbound `contentRef` for tippy: null')
		})

		watch(
			triggerRef,
			(newRef) => {
				if (newRef) {
					newRef.addEventListener('focus', () => {
						const childrenArray = Array.from(newRef.children)

						if (childrenArray.length) {
							const focusableChildIndex = childrenArray.findIndex((child) => {
								if (child instanceof HTMLElement) child.focus()

								return document.activeElement === child
							})

							if (focusableChildIndex !== -1) {
								newRef.setAttribute('tabIndex', '-1')
							}
						}
					})
				}
			},
			{ flush: 'post' },
		)

		/**
		 * expose to children that they are inside a popover
		 */
		provide(KT_IS_IN_POPOVER, true)

		const setIsShown = (showTippy: boolean) => {
			const tippys = castArray(tippy.value)

			for (const tippy of tippys) {
				if (showTippy) tippy?.show()
				else tippy?.hide()
			}
		}

		const close = () => setIsShown(false)
		const open = () => setIsShown(true)

		const { tippy } = useTippy(
			triggerRef,
			computed(() => ({
				appendTo: () => document.body,
				arrow: roundArrow,
				content: contentRef.value ?? undefined,
				/**
				 * @see {@link https://atomiks.github.io/tippyjs/v6/all-props/#hideonclick}
				 */
				hideOnClick: false,
				interactive: true,
				maxWidth: 'none',
				offset: [0, TIPPY_LIGHT_BORDER_ARROW_HEIGHT],
				onClickOutside: () => {
					if (props.trigger !== KottiPopover.Trigger.MANUAL) close()
				},
				onHide: () => {
					showPopover.value = false
				},
				onShow: () => {
					if (!props.isDisabled) showPopover.value = true
					else return false
				},
				onUntrigger: () => close(),
				placement: props.placement,
				theme: 'light-border',
				trigger: TRIGGER_MAP[props.trigger],
			})),
		)

		return {
			close,
			contentRef,
			formKey: computed(() => (formContext === null ? null : 'NONE')),
			handleItemClick: (option: KottiPopover.PropsInternal['options'][0]) => {
				if (!option.isDisabled && option.onClick) {
					option.onClick()
					close()
				}
			},
			handleItemSelection: ({
				index,
				option,
				value,
			}: KottiPopover.Events.UpdateIsSelected) => {
				emit('update:isSelected', {
					value,
					index,
					option,
				})
			},
			open,
			contentClass: computed(() => {
				const classes = [
					'kt-popover__content',
					`kt-popover__content--size-${props.size}`,
				]

				if (props.options.length >= 1)
					classes.push(`kt-popover__content--has-options`)

				return classes
			}),
			showPopover,
			triggerRef,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';
@import '../kotti-field/mixins';

.kt-popover {
	display: inline-block;

	> div {
		@include no-outline;
	}

	&__content {
		margin: 3px -1px; // tippy theme applies 5px 9px padding, therefore this equals 8px 8px

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
