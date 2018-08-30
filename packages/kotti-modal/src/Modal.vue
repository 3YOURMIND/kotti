<template>
	<transition name="modal" mode="out-in">
		<div class="modal-mask" @click.self="closeModal">
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
		</div>
	</transition>
</template>

<script>
export default {
	name: 'KtModal',
	props: {
		size: {
			type: String,
			default: 'md',
		},
		closeOutside: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		hasBody() {
			return Boolean(this.$slots['modal-body'])
		},
		hasFooter() {
			return Boolean(this.$slots['modal-footer'])
		},
		hasHeader() {
			return Boolean(this.$slots['modal-header'])
		},
		modalClass() {
			return ['modal-container', `modal-${this.size}`]
		},
	},
	methods: {
		closeModal() {
			if (this.closeOutside) this.$emit('close')
		},
	},
}
</script>
