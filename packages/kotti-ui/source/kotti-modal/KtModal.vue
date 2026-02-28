<template>
	<div>
		<div ref="targetRef" />
		<div ref="contentRef" class="kt-modal__mask" @click.self="closeModal">
			<slot name="container">
				<div :class="modalClass">
					<div
						v-if="hasSlot('header') || title || showCloseButton"
						:class="{
							'kt-modal__header': true,
							'kt-modal__header--has-content': hasSlot('header') || title,
						}"
					>
						<div v-if="hasSlot('header')">
							<slot name="header" />
						</div>
						<h2
							v-else-if="title"
							class="kt-modal__header-title"
							v-text="title"
						/>
						<KtButton
							v-if="showCloseButton"
							class="kt-modal__header-close-btn"
							data-test="kt-modal-header-close-btn"
							:icon="Yoco.Icon.CLOSE"
							size="small"
							type="text"
							@click="$emit('close')"
						/>
					</div>
					<ScrollableContainer
						v-if="hasSlot('body')"
						:class="{
							'kt-modal__body--has-padding-bottom': !hasSlot('footer'),
							'kt-modal__body--has-padding-top':
								!hasSlot('header') && !title && !showCloseButton,
						}"
					>
						<slot name="body" />
					</ScrollableContainer>
					<div v-if="hasSlot('footer')" class="kt-modal__footer">
						<slot name="footer" />
					</div>
				</div>
			</slot>
		</div>
	</div>
</template>

<script lang="ts">
import type { Instance, Props as TippyProps } from 'tippy.js'
import { computed, defineComponent, ref, watch } from 'vue'

import { useTippy } from '@3yourmind/vue-use-tippy'
import { Yoco } from '@3yourmind/yoco'

import { KtButton } from '../kotti-button'
import { makeProps } from '../make-props'
import ScrollableContainer from '../shared-components/ScrollableContainer.vue'

import { KottiModal } from './types'

export default defineComponent({
	name: 'KtModal',
	components: {
		KtButton,
		ScrollableContainer,
	},
	props: makeProps(KottiModal.propsSchema),
	emits: ['close'],
	setup(props, { emit, slots }) {
		const contentRef = ref<HTMLElement | null>(null)
		const targetRef = ref<HTMLElement | null>(null)
		const tippyInstanceRef = ref<Instance | null>(null)

		useTippy(
			targetRef,
			computed<Partial<TippyProps>>(() => ({
				appendTo: () => document.body,
				hideOnClick: false,
				interactive: true,
				/**
				 * The `onCreate` function of `tippyjs` gets executed after the `KtModal`
				 * component renders.
				 *
				 * `props.isOpen` therefore has an initial value, assigned in the watcher
				 * that would not have an effect, unless we manually update it in `onCreate`
				 *
				 * It can alternatively be passed as a prop to tippy (`showOnCreate`)
				 * @see {@link https://atomiks.github.io/tippyjs/v6/all-props/#showoncreate}
				 */
				offset: [0, 0],
				onCreate(instance) {
					tippyInstanceRef.value = instance

					if (props.isOpen) tippyInstanceRef.value.show()
				},
				popperOptions: {
					modifiers: [
						{
							name: 'computeStyles',
							options: {
								adaptive: false,
								gpuAcceleration: false,
							},
						},
					],
				},
				render() {
					const popper = document.createElement('div')

					if (contentRef.value === null)
						throw new Error('KtModal: Unbound contentRef')

					popper.append(contentRef.value)

					return { popper }
				},
				trigger: 'manual',
			})),
		)

		watch(
			() => props.isOpen,
			(shouldOpen, wasOpen) => {
				// component just mounted but tippy hasn't
				if (wasOpen === undefined && tippyInstanceRef.value === null) return

				if (tippyInstanceRef.value === null)
					throw new Error('KtModal: Unbound tippyInstanceRef')

				if (shouldOpen) tippyInstanceRef.value.show()
				else tippyInstanceRef.value.unmount()
			},
			{ flush: 'post', immediate: true },
		)

		return {
			closeModal: () => {
				if (!props.preventCloseOutside) emit('close')
			},
			contentRef,
			/**
			 * 'slots' is non-reactive, so computed values won't react to
			 * changes in 'slots'. Therefore, a function is needed to check
			 * if a slot exists.
			 */
			hasSlot: (name: string): boolean => name in slots,
			modalClass: computed(() => [
				'kt-modal__container',
				`kt-modal--is-size-${props.size}`,
			]),
			targetRef,
			Yoco,
		}
	},
})
</script>

<style>
:root {
	--kt-drawer-mask-background: rgb(0 0 0 / 50%);
	--kt-drawer-shadow: var(--shadow-lg);
}

:root[data-theme='dark'] {
	--kt-drawer-mask-background: rgb(0 0 0 / 70%);
	--kt-drawer-shadow: 0 0 32px rgb(180 180 255 / 10%);
}
</style>

<style lang="scss" scoped>
@import '../kotti-style/_variables';

.kt-modal {
	&__mask {
		position: fixed;
		top: 0;
		left: 0;
		z-index: $zindex-4;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		background-color: rgb(0 0 0 / 46%);
		transition: opacity var(--transition-long) ease;
	}

	&__container {
		display: flex;
		flex-direction: column;
		width: 90%;
		max-height: 90%;
		background-color: var(--ui-background);
		border: 1px solid var(--ui-02);
		border-radius: var(--border-radius);
		box-shadow: var(--kt-drawer-shadow);
		transition: all 0.3s ease;
	}

	&--is-size {
		&-sm {
			max-width: 24rem;
		}

		&-md {
			max-width: 36rem;
		}

		&-lg {
			max-width: 48rem;
		}

		&-xl {
			max-width: 64rem;
		}
	}

	&__header {
		display: flex;
		flex: 1 1 auto;
		justify-content: flex-end;
		padding: var(--unit-3) var(--unit-4);

		&--has-content {
			justify-content: space-between;
		}
	}

	&__header-close-btn {
		color: var(--icon-01);

		&:hover,
		&:focus-visible {
			background-color: var(--ui-01);
			border-color: var(--ui-01);
		}
	}

	&__header-title {
		padding: 0;
		margin: 0;
		line-height: 1;
		border: 0;
	}

	&__body--has-padding-bottom {
		padding-bottom: var(--unit-3);
	}

	&__body--has-padding-top {
		padding-top: var(--unit-3);
	}

	&__footer {
		flex: 0 0 auto;
		padding: var(--unit-3) var(--unit-4);
		text-align: right;
	}
}
</style>
