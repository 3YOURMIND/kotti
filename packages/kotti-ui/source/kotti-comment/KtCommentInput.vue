<template>
	<div class="kt-comment-input">
		<KtAvatar size="sm" :src="userAvatar" />
		<CommentTextArea
			v-model="_message"
			v-bind="{ allowInternal, autofocus, isReply, placeholder, tabIndex }"
			:dataTest="_dataTest"
			:isInternal="_isInternal"
			@cancel="onCancel"
			@confirm="onConfirm"
			@toggleInternal="onToggleInternal"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from '@vue/composition-api'

import { makeProps } from '../make-props'

import CommentTextArea from './components/CommentTextArea.vue'
import { KottiComment, KottiCommentInput } from './types'

export default defineComponent<KottiCommentInput.PropsInternal>({
	name: 'KtCommentInput',
	components: {
		CommentTextArea,
	},
	props: makeProps(KottiCommentInput.propsSchema),
	setup(props, { emit }) {
		const _isInternal = ref<KottiComment.PropsInternal['isInternal']>(
			props.isInternal,
		)
		const _message = ref<KottiComment.PropsInternal['message']>('')

		watch(
			() => props.isInternal,
			(isInternal) => (_isInternal.value = isInternal),
		)

		return {
			_dataTest: computed(() => {
				const commentType = `new-${props.isReply ? 'reply' : 'comment'}`
				return props.dataTest ? `${props.dataTest}.${commentType}` : commentType
			}),
			_isInternal,
			_message,
			onCancel: () => {
				_isInternal.value = props.isInternal
				_message.value = ''
				emit('cancel')
			},
			onConfirm: () => {
				if (_message.value === '') return

				const payload: KottiComment.Events.Add = {
					isInternal: _isInternal.value,
					message: _message.value,
					replyToUserId: props.replyToUserId,
					parentId: props.parentId,
				}

				emit('add', payload)

				_isInternal.value = props.isInternal
				_message.value = ''
			},
			onToggleInternal: () => (_isInternal.value = !_isInternal.value),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment-input {
	display: flex;
	column-gap: var(--unit-2);
}
</style>
