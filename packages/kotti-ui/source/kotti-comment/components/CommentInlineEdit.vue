<template>
	<div v-if="!isEditing" class="kt-comment-inline-edit__message">
		<!-- eslint-disable vue/no-v-html -->
		<span v-html="postEscapeParser(dangerouslyOverrideParser(message))" />
		<!-- eslint-enable vue/no-v-html -->
	</div>
	<div v-else class="kt-comment-inline-edit">
		<textarea v-model="inlineValue" class="form-input" />
		<KtButtonGroup class="kt-comment-inline-edit__buttons">
			<KtButton icon="close" @click="handleCancel" />
			<KtButton icon="check" @click="handleConfirm" />
		</KtButtonGroup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

import { KtButton } from '../../kotti-button'
import { KtButtonGroup } from '../../kotti-button-group'
import { KottiComment } from '../types'

export default defineComponent<{
	dangerouslyOverrideParser: () => void
	id: KottiComment.PropsInternal['id']
	isEditing: boolean
	message: string
	parentId?: KottiComment.PropsInternal['id']
	postEscapeParser: () => void
}>({
	name: 'CommentInlineEdit',
	components: {
		KtButton,
		KtButtonGroup,
	},
	props: {
		dangerouslyOverrideParser: { required: true, type: Function },
		id: { required: true, type: [Number, String] },
		isEditing: { default: false, type: Boolean },
		message: { required: true, type: String },
		parentId: { required: false, type: [Number, String] },
		postEscapeParser: { required: true, type: Function },
	},
	setup(props, { emit }) {
		const inlineValue = ref<string | null>(null)

		watch(
			() => props.isEditing,
			(newValue) => {
				if (newValue === true) {
					inlineValue.value = props.message
				}
			},
			{ immediate: true },
		)

		return {
			handleConfirm: () => {
				emit('update:isEditing', false)

				if (inlineValue.value === null) return

				const payload: KottiComment.Events.Edit = {
					id: props.id,
					message: inlineValue.value,
					parentId: props.parentId,
				}

				emit('edit', payload)
			},
			handleCancel: () => {
				emit('update:isEditing', false)
				inlineValue.value === null
			},
			inlineValue,
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-field/mixins';

.kt-comment-inline-edit {
	position: relative;
	width: 100%;

	textarea {
		resize: vertical;

		@include prettify-scrollbar;
	}

	&__buttons {
		position: absolute;
		right: 0;
		z-index: 9999; // use tippy
	}

	&__message {
		display: flex;
		align-items: center;
		word-break: break-word;
	}
}
</style>
