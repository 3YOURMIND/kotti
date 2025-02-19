<template>
	<div>
		<div ref="targetRef" />
		<div ref="contentRef" class="kt-modal__mask" @click.self="closeModal">
			<slot name="container">
				<div :class="modalClass">
					<div v-if="hasHeader" class="kt-modal__header">
						<slot name="header" />
					</div>
					<div v-if="hasBody" class="kt-modal__body">
						<slot name="body" />
					</div>
					<div v-if="hasFooter" class="kt-modal__footer">
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
			hasBody: computed(() => Boolean(slots.body)),
			hasFooter: computed(() => Boolean(slots.footer)),
			hasHeader: computed(() => Boolean(slots.header)),
			modalClass: computed(() => [
				'kt-modal__container',
				`kt-modal--is-size-${props.size}`,
			]),
			targetRef,
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
		width: 90%;
		max-height: 90%;
		padding: var(--unit-4);
		background-color: #fff;
		border-radius: var(--border-radius);
		box-shadow: 0 2px 8px rgb(0 0 0 / 33%);
		transition: all 0.3s ease;

		> *:not(:first-child) {
			margin-top: 0.8rem;
		}
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
		flex: 0 0 auto;
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
