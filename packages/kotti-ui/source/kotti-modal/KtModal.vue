<template>
	<transition mode="out-in" name="modal">
		<div class="modal-mask" @click.self="closeModal">
			<slot name="modal-container">
				<div :class="modalClass">
					<div v-if="hasHeader" class="modal-header">
						<slot name="modal-header" />
					</div>
					<div v-if="hasBody" class="modal-body">
						<slot name="modal-body" />
					</div>
					<div v-if="hasFooter" class="modal-footer">
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
			modalClass: computed(() => ['modal-container', `modal-${props.size}`]),
		}
	},
})
</script>

<style lang="scss">
@import '../kotti-style/_variables.scss';

.modal-mask {
	position: fixed;
	top: 0;
	left: 0;
	z-index: $zindex-4;
	display: flex;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.46);
	transition: opacity 0.3s ease;
}

.modal-container {
	display: flex;
	flex-direction: column;
	align-self: center;
	width: 90%;
	max-height: 90%;
	padding: $unit-6;
	margin: 0px auto;
	background-color: #fff;
	border-radius: $border-radius;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
	transition: all 0.3s ease;

	> *:not(:first-child) {
		margin-top: 0.8rem;
	}
}

.modal-sm {
	max-width: 24rem;
}

.modal-md {
	max-width: 36rem;
}

.modal-lg {
	max-width: 48rem;
}

.modal-xl {
	max-width: 64rem;
}

.modal-header {
	flex: 0 0 auto;
}

.modal-body {
	flex: 1 1 auto;
	overflow: auto;
}

.modal-footer {
	flex: 0 0 auto;
	text-align: right;
}

.modal-enter {
	opacity: 0;
}

.modal-leave-active {
	opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
	-webkit-transform: scale(1.1);
	transform: scale(1.1);
}
</style>
