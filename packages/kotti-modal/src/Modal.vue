<template>
	<transition name="modal" mode="out-in">
		<div class="modal-mask" @click.self="closeModal">
			<div :class="modalClass">
				<div class="modal-header">
					<slot name="modal-header" />
				</div>
				<div class="modal-body">
					<slot name="modal-body" />
				</div>
				<div class="modal-footer">
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
		modalClass() {
			let modalSizeClass = `modal-${this.size}`;
			return ['modal-container', modalSizeClass];
		},
	},
	methods: {
		closeModal() {
			if (this.closeOutside) {
				this.$emit('close');
			}
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
