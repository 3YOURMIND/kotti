<template>
	<transition mode="out-in" name="kt-modal">
		<div class="kt-modal__mask" @click.self="closeModal">
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
	</transition>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { KottiModal } from './types'

export default defineComponent<KottiModal.PropsInternal>({
	name: 'KtModal',
	props: {
		preventCloseOutside: { default: false, type: Boolean },
		size: { default: KottiModal.Size.MEDIUM, type: String },
	},
	setup(props, { emit, slots }) {
		return {
			closeModal: () => {
				if (!props.preventCloseOutside) emit('close')
			},
			hasBody: computed(() => Boolean(slots.body)),
			hasFooter: computed(() => Boolean(slots.footer)),
			hasHeader: computed(() => Boolean(slots.header)),
			modalClass: computed(() => [
				'kt-modal__container',
				`kt-modal--is-size-${props.size}`,
			]),
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

		background-color: rgba(0, 0, 0, 0.46);
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
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
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

	// transitions

	&-enter,
	&-leave-active {
		opacity: 0;

		.kt-modal__container {
			transform: scale(1.1);
		}
	}
}
</style>
