<template>
	<div class="kt-comment-inline-edit">
		<CommentTextArea
			v-if="isEditing"
			v-model="localMessage"
			v-bind="{
				allowInternal,
				dataTest,
				isInternal,
				isReply,
				tabIndex,
			}"
			autofocus
			@cancel="onCancel"
			@confirm="onConfirm"
			@toggleInternal="onToggleInternal"
		/>
		<div
			v-else
			class="kt-comment-inline-edit__message"
			:data-test="`${dataTest}.message`"
		>
			<!-- eslint-disable vue/no-v-html -->
			<span v-html="postEscapeParser(dangerouslyOverrideParser(message))" />
			<!-- eslint-enable vue/no-v-html -->
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@vue/composition-api'

import { makeProps } from '../../make-props'
import { KottiComment } from '../types'

import CommentTextArea from './CommentTextArea.vue'

export default defineComponent({
	name: 'CommentInlineEdit',
	components: {
		CommentTextArea,
	},
	props: makeProps(KottiComment.InlineEdit.schema),
	setup(props, { emit }) {
		const localMessage =
			ref<KottiComment.InlineEdit.PropsInternal['message']>('')

		watch(
			() => props.isEditing,
			(isEditing, wasEditing) => {
				if (isEditing === wasEditing) return

				localMessage.value = isEditing ? props.message : ''
			},
			{ immediate: true, flush: 'post' },
		)

		return {
			localMessage,
			onCancel: () => {
				emit('update:isEditing', false)
				localMessage.value = ''
			},
			onConfirm: () => {
				emit('update:isEditing', false)

				if (localMessage.value === '') return

				const payload: KottiComment.Events.Edit = {
					id: props.id,
					isInternal: props.isInternal,
					message: localMessage.value,
					parentId: props.parentId,
				}

				emit('edit', payload)
			},
			onToggleInternal: () => {
				const payload: KottiComment.Events.Edit = {
					id: props.id,
					isInternal: !props.isInternal,
					message: props.message,
					parentId: props.parentId,
				}

				emit('edit', payload)
			},
		}
	},
})
</script>

<style lang="scss" scoped>
@import '../../kotti-field/mixins';

.kt-comment-inline-edit {
	&__message {
		display: flex;
		align-items: center;
		word-break: break-word;
	}
}
</style>
