<template>
	<div class="comment">
		<KtAvatar size="sm" :src="userAvatar" />
		<div class="comment__wrapper">
			<div class="comment__info">
				<div class="info__name" v-text="userName" />
				<div class="info__time" v-text="createdTime" />
			</div>
			<!-- eslint-disable vue/no-v-html -->
			<div
				v-if="!isInlineEdit"
				class="comment__message"
				v-html="postEscapeParser(dangerouslyOverrideParser(inlineMessage))"
			/>
			<!-- eslint-enable vue/no-v-html -->
			<div v-else class="comment-inline-edit form-group">
				<textarea
					v-model="inlineMessageValue"
					class="comment-inline-edit-input form-input"
				></textarea>
				<KtButtonGroup class="comment-inline-edit-buttons">
					<KtButton icon="close" @click="cancelInlineEdit" />
					<KtButton icon="check" @click="handleEditConfirm" />
				</KtButtonGroup>
			</div>
			<div class="comment__action">
				<div
					class="action__reply"
					@click="handleInlineReplyClick({ userName, userId })"
				>
					<i class="yoco">comment</i> Reply
				</div>
				<div v-if="actionOptions.length > 0" class="action__more">
					<i class="yoco">dots</i>
					<div class="action__options">
						<a
							v-for="option in actionOptions"
							:key="option.type"
							@click="option.onClick"
						>
							<li>{{ option.label }}</li>
						</a>
					</div>
				</div>
			</div>
			<div v-for="reply in replies" :key="reply.id">
				<CommentReply
					:id="reply.id"
					:createdTime="reply.createdTime"
					:dangerouslyOverrideParser="dangerouslyOverrideParser"
					:isDeletable="reply.isDeletable"
					:isEditable="reply.isEditable"
					:message="reply.message"
					:postEscapeParser="postEscapeParser"
					:userAvatar="reply.userAvatar"
					:userId="reply.userId"
					:userName="reply.userName"
					@_inlineDeleteClick="(commentId) => handleDelete(commentId, true)"
					@_inlineEditSubmit="$emit('edit', $event)"
					@_inlineReplyClick="handleInlineReplyClick"
				/>
			</div>
			<KtCommentInput
				v-if="userBeingRepliedTo"
				isInline
				:parentId="id"
				:placeholder="replyToText"
				:replyToUserId="userBeingRepliedTo.userId"
				:userAvatar="userAvatar"
				@submit="handleInlineSubmit($event)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import compact from 'lodash/compact'

import { KtAvatar } from '../kotti-avatar'
import { KtButton } from '../kotti-button'
import { KtButtonGroup } from '../kotti-button-group'
import { KottiButton } from '../kotti-button/types'
import { makeProps } from '../make-props'

import CommentReply from './components/CommentReply.vue'
import KtCommentInput from './KtCommentInput.vue'
import { KottiComment } from './types'

type UserData = Pick<KottiComment.PropsInternal, 'userName' | 'userId'>

export default defineComponent<KottiComment.PropsInternal>({
	name: 'KtComment',
	components: {
		KtAvatar,
		KtButton,
		KtButtonGroup,
		CommentReply,
		KtCommentInput,
	},
	props: makeProps(KottiComment.propsSchema),
	setup(props, { emit }) {
		const isInlineEdit = ref(false)
		const inlineMessageValue = ref<string | null>(null)
		const userBeingRepliedTo = ref<UserData | null>(null)

		const handleDelete = (commentId: number | string, isInline?: boolean) => {
			emit('delete', {
				id: commentId,
				parentId: isInline ? props.id : null,
			})
		}
		return {
			actionOptions: computed<Array<KottiButton.Props>>(() =>
				compact([
					props.isEditable
						? {
								label: 'Edit',
								onClick: () => {
									if (inlineMessageValue.value === null)
										inlineMessageValue.value = props.message
									isInlineEdit.value = true
								},
								type: KottiButton.Type.PRIMARY,
						  }
						: null,
					props.isDeletable
						? {
								label: 'Delete',
								onClick: () => handleDelete(props.id),
								type: KottiButton.Type.DANGER,
						  }
						: null,
				]),
			),
			cancelInlineEdit: () => {
				inlineMessageValue.value = null
				isInlineEdit.value = false
			},
			handleDelete,
			handleEditConfirm: () => {
				isInlineEdit.value = false
				if (!inlineMessageValue.value) return
				emit('edit', {
					id: props.id,
					message: inlineMessageValue.value,
				})
			},
			handleInlineReplyClick: ({ userId, userName }: UserData) => {
				userBeingRepliedTo.value = { userId, userName }
			},
			handleInlineSubmit: (commentData: KottiComment.Events.Submit) => {
				userBeingRepliedTo.value = null
				emit('submit', commentData)
			},
			inlineMessage: computed(() => inlineMessageValue.value ?? props.message),
			inlineMessageValue,
			isInlineEdit,
			replyToText: computed(() =>
				userBeingRepliedTo.value === null
					? null
					: `Reply to ${userBeingRepliedTo.value.userName}`,
			),
			userBeingRepliedTo,
		}
	},
})
</script>

<style lang="scss" scoped>
.action__reply {
	display: flex;
	align-items: center;
}
</style>
