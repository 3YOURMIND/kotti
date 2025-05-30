<template>
	<div>
		<div ref="targetRef" />
		<div ref="contentRef" class="kt-modal__mask" @click.self="closeModal">
			<slot name="container">
				<div :class="modalClass">
					<div
						v-if="hasSlot('header') || showCloseButton"
						class="kt-modal__header-wrapper"
					>
						<div v-if="hasSlot('header')" class="kt-modal__header">
							<slot name="header" />
						</div>
						<KtButton
							v-if="showCloseButton"
							class="kt-modal__close-button"
							:icon="Yoco.Icon.CLOSE"
							type="text"
							@click="$emit('close')"
						/>
					</div>
					<div v-if="hasSlot('body')" class="kt-modal__body">
						<slot name="body" />
					</div>
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

import { makeProps } from '../make-props'

import { KottiModal } from './types'

export default defineComponent({
	name: 'KtModal',
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

		/**
		 * 'slots' is non-reactive, so we need to use a function to check
		 * if a slot exists instead of a computed value
		 */
		const hasSlot = (name: string): boolean => name in slots

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
			hasSlot,
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

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

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
		gap: 0.8rem;
		width: 90%;
		max-height: 90%;
		padding: var(--unit-4);
		background-color: #fff;
		border-radius: var(--border-radius);
		box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
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

	&__close-button {
		width: 20px;
		height: 20px;
		padding: 0;
		color: var(--icon-01);

		&:hover,
		&:focus-visible {
			background-color: var(--ui-01);
			border-color: var(--ui-01);
		}

		:deep(.yoco) {
			font-size: 21px;
		}
	}

	&__header-wrapper {
		display: flex;
		flex: 1 1 auto;
		justify-content: space-between;

		&:not(:has(.kt-modal__header)) {
			justify-content: flex-end;
		}
	}

	&__header {
		flex: 1 1 auto;
	}

	&__body {
		flex: 1 1 auto;
		overflow: auto;
	}

	&__footer {
		flex: 0 0 auto;
		text-align: right;
	}
}
</style>
