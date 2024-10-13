<template>
	<div :class="wrapperClasses">
		<div class="kt-field-file-upload-item__wrapper">
			<div>
				<div class="kt-field-file-upload-item__name">
					<span v-text="name" />
					<span
						v-if="isInternal"
						class="kt-field-file-upload-item__is-internal-tag"
					>
						<i class="yoco" v-text="Yoco.Icon.PERMISSION_LOCKED" />
						<span v-text="translations.label.internal" />
					</span>
				</div>
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
import { computed, defineComponent } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'

export default defineComponent({
	name: 'ItemLayout',
	props: {
		isInternal: { default: false, type: Boolean },
		name: { required: true, type: String },
	},
	setup(props) {
		return {
			translations: useTranslationNamespace('KtFieldFileUpload'),
			wrapperClasses: computed(() => ({
				'kt-field-file-upload-item': true,
				'kt-field-file-upload-item--is-internal': props.isInternal,
			})),
			Yoco,
		}
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

	&--is-internal {
		background-color: var(--ui-01);
	}

	&__is-internal-tag {
		display: inline-flex;
		align-items: baseline;
		padding: 0;
		margin-left: 0;
		font-size: calc(var(--unit-3) + var(--unit-h));
		color: var(--text-02);

		.yoco {
			align-self: center;
			margin-right: var(--unit-1);
			font-size: var(--unit-4);
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
