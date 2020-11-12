<template>
	<transition mode="out-in" name="modal">
		<div class="kt-modal-mask" @click.self="closeModal">
			<slot name="kt-modal-container">
				<div :class="modalClass">
					<div v-if="hasHeader" class="kt-modal-header">
						<slot name="modal-header" />
					</div>
					<div v-if="hasBody" class="kt-modal-body">
						<slot name="modal-body" />
					</div>
					<div v-if="hasFooter" class="kt-modal-footer">
						<slot name="modal-footer" />
					</div>
				</div>
			</slot>
		</div>
	</transition>
</template>

<script lang="ts">
import { computed, defineComponent } from '@vue/composition-api'

import { Kotti } from '../types'

export default defineComponent<Kotti.Modal.PropsInternal>({
	name: 'KtModal',
	props: {
		closeOutside: { default: true, type: Boolean },
		size: { default: Kotti.Modal.Size.MEDIUM, type: String },
	},
	setup(props, { emit, slots }) {
		return {
			closeModal: () => {
				if (props.closeOutside) emit('close')
			},
			hasBody: computed(() => Boolean(slots['modal-body'])),
			hasFooter: computed(() => Boolean(slots['modal-footer'])),
			hasHeader: computed(() => Boolean(slots['modal-header'])),
			modalClass: computed(() => [
				'kt-modal-container',
				`kt-modal--is-size-${props.size}`,
			]),
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../kotti-style/_variables.scss';

.kt-modal {
	&-mask {
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

	&-container {
		display: flex;
		flex-direction: column;

		width: 90%;
		max-height: 90%;

		padding: $unit-6;

		background-color: #fff;
		border-radius: $border-radius;
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

	&-header {
		flex: 0 0 auto;
	}

	&-body {
		flex: 1 1 auto;
		overflow: auto;
	}

	&-footer {
		flex: 0 0 auto;
		text-align: right;
	}

	// transitions

	&-enter,
	&-leave-active {
		opacity: 0;

		&-container {
			transform: scale(1.1);
		}
	}
}
</style>
