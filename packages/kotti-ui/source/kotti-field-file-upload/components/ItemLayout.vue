<template>
	<div class="kt-field-file-upload-item">
		<div class="kt-field-file-upload-item__wrapper">
			<div>
				<div class="kt-field-file-upload-item__name" v-text="name" />
				<div class="kt-field-file-upload-item__description">
					<slot name="description" />
				</div>
			</div>
			<div class="kt-field-file-upload-item__actions">
				<slot name="actions" />
			</div>
		</div>
		<slot name="footer" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
	name: 'ItemLayout',
	props: {
		name: { required: true, type: String },
	},
})
</script>

<style lang="scss" scoped>
.kt-field-file-upload-item {
	display: flex;
	flex-direction: column;
	padding: var(--unit-2);
	border-bottom: 1px solid var(--ui-02);

	&__actions {
		display: flex;
		flex: 0 0 auto;
		align-items: center;
	}

	&__description {
		display: flex;
		align-items: center;
		font-size: 14px;
		line-height: 20px;
		color: var(--text-03);

		.yoco {
			flex: 0 0 auto;
			margin-right: var(--unit-1);
			font-size: calc(var(--unit-4) + var(--unit-h));
			color: var(--support-error);
		}
	}

	&__name {
		margin-bottom: var(--unit-1);
		font-size: 16px;
		line-height: 20px;
		color: var(--text-01);
	}

	&__wrapper {
		display: flex;
		gap: var(--unit-2);
		align-items: center;
		justify-content: space-between;
		word-break: break-word;
	}
}
</style>
