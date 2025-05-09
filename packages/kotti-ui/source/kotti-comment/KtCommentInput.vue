<template>
	<div class="kt-comment-input">
		<KtAvatar size="sm" :src="userAvatar" />
		<CommentTextArea
			v-model="localMessage"
			v-bind="{ allowInternal, autofocus, isReply, placeholder, tabIndex }"
			:dataTest="localDataTest"
			:isInternal="localIsInternal"
			@cancel="onCancel"
			@confirm="onConfirm"
			@toggleInternal="onToggleInternal"
		/>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import KtAvatar from '../kotti-avatar/KtAvatar.vue'
import { makeProps } from '../make-props'

import CommentTextArea from './components/CommentTextArea.vue'
import type { KottiComment } from './types'
import { KottiCommentInput } from './types'

export default defineComponent({
	name: 'KtCommentInput',
	components: {
		CommentTextArea,
		KtAvatar,
	},
	props: makeProps(KottiCommentInput.propsSchema),
	emits: ['add', 'cancel'],
	setup(props, { emit }) {
		// eslint-disable-next-line vue/no-setup-props-reactivity-loss
		const localIsInternal = ref<KottiComment.PropsInternal['isInternal']>(
			props.isInternal,
		)
		const localMessage = ref<KottiComment.PropsInternal['message']>('')

		watch(
			() => props.isInternal,
			(isInternal) => (localIsInternal.value = isInternal),
			{ flush: 'post' },
		)

		return {
			localDataTest: computed(() => {
				const commentType = `new-${props.isReply ? 'reply' : 'comment'}`
				return props.dataTest ? `${props.dataTest}.${commentType}` : commentType
			}),
			localIsInternal,
			localMessage,
			onCancel: () => {
				localIsInternal.value = props.isInternal
				localMessage.value = ''
				emit('cancel')
			},
			onConfirm: () => {
				if (localMessage.value === '') return

				const payload: KottiComment.Events.Add = {
					isInternal: localIsInternal.value,
					message: localMessage.value,
					parentId: props.parentId,
					replyToUserId: props.replyToUserId,
				}

				emit('add', payload)

				localIsInternal.value = props.isInternal
				localMessage.value = ''
			},
			onToggleInternal: () => {
				if (localIsInternal.value && props.allowInternal && props.forceInternal)
					return
				localIsInternal.value = !localIsInternal.value
			},
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
