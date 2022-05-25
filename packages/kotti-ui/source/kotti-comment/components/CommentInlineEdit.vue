<template>
	<div v-if="!isEditing" class="kt-comment-inline-edit__message">
		<!-- eslint-disable vue/no-v-html -->
		<span v-html="postEscapeParser(dangerouslyOverrideParser(message))" />
		<!-- eslint-enable vue/no-v-html -->
	</div>
	<div v-else class="kt-comment-inline-edit">
		<textarea v-model="inlineValue" class="form-input" />
		<KtButtonGroup class="kt-comment-inline-edit-buttons">
			<KtButton icon="close" @click="handleCancel" />
			<KtButton icon="check" @click="handleConfirm" />
		</KtButtonGroup>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

import { Kotti } from '../../types'

export default defineComponent<{
	dangerouslyOverrideParser: () => void
	id: Kotti.Comment.PropsInternal['id']
	isEditing: boolean
	postEscapeParser: () => void
	message: string
}>({
	name: 'CommentInlineEdit',
	props: {
		dangerouslyOverrideParser: { type: Function, required: true },
		id: { type: Number, required: true },
		isEditing: { type: Boolean, required: true },
		postEscapeParser: { type: Function, required: true },
		message: { type: String, required: true },
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

				const payload: Kotti.Comment.Events.Edit = {
					id: props.id,
					message: inlineValue.value,
				}
				emit('confirm', payload)
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
.kt-comment-inline-edit {
	position: relative;
	width: 100%;

	&-buttons {
		position: absolute;
		right: 0;
		z-index: 9999; // use tippy
	}

	&__message {
		display: flex;
		align-items: center;

		width: 100%;
		font-size: 0.65rem;
		line-height: 1rem;
		word-break: break-word;
	}
}
</style>
