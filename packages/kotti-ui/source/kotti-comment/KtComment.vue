<template>
	<div class="kt-comment">
		<KtAvatar size="sm" :src="userAvatar" />
		<div class="kt-comment__content">
			<div class="kt-comment__content__info">
				<div class="info__name" v-text="userName" />
				<div class="info__time" v-text="createdTime" />
			</div>

			<CommentInlineEdit
				:id="id"
				:dangerouslyOverrideParser="dangerouslyOverrideParser"
				:isEditing="isEditing"
				:message="message"
				:postEscapeParser="postEscapeParser"
				@edit="handleEditComment($event)"
				@update:isEditing="($event) => (isEditing = $event)"
			/>

			<CommentActions
				:options="actionOptions"
				:userData="{ userId, userName }"
				@replyClick="handleReplyClick"
			/>

			<div v-for="(reply, index) in replies" :key="reply.id">
				<CommentReply
					v-bind="reply"
					:dangerouslyOverrideParser="dangerouslyOverrideParser"
					:postEscapeParser="postEscapeParser"
					@click="handleReplyClick"
					@delete="(commentId) => handleDelete(commentId, true)"
					@edit="($event) => handleEditReply($event, index)"
				/>
			</div>

			<KtCommentInput
				v-if="userBeingRepliedTo"
				isInline
				:parentId="id"
				:placeholder="placeholder"
				:replyToUserId="userBeingRepliedTo.userId"
				:userAvatar="userAvatar"
				@submit="handleInlineSubmit($event)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { Kotti } from '../types'

import CommentActions from './components/CommentActions.vue'
import CommentInlineEdit from './components/CommentInlineEdit.vue'
import CommentReply from './components/CommentReply.vue'
import KtCommentInput from './KtCommentInput.vue'
import { KottiComment } from './types'

export default defineComponent<KottiComment.PropsInternal>({
	name: 'KtComment',
	components: {
		CommentActions,
		CommentReply,
		CommentInlineEdit,
		KtCommentInput,
	},
	props: makeProps(KottiComment.propsSchema),
	setup(props, { emit }) {
		const isEditing = ref(false)
		const userBeingRepliedTo = ref<Kotti.Comment.UserData | null>(null)
		const translations = useTranslationNamespace('KtComment')

		const handleDelete = (commentId: number | string, isInline?: boolean) => {
			const payload: KottiComment.Events.Delete = {
				id: commentId,
				parentId: isInline ? props.id : null,
			}
			emit('delete', payload)
		}
		return {
			actionOptions: computed<Kotti.Popover.Props['options']>(() => {
				const options = []
				if (isEditing.value) return options

				if (props.isEditable)
					options.push({
						label: translations.value.editButton,
						onClick: () => {
							isEditing.value = true
						},
					})
				if (props.isDeletable)
					options.push({
						label: translations.value.deleteButton,
						onClick: () => handleDelete(props.id),
					})
				return options
			}),
			handleDelete,
			handleEditComment: (payload: Kotti.Comment.Events.Edit) => {
				emit('edit', payload)
			},
			handleReplyClick: (replyUserData: Kotti.Comment.UserData) => {
				userBeingRepliedTo.value = replyUserData
			},
			handleEditReply: (
				{ id, message }: Kotti.Comment.Events.Edit,
				index: number,
			) => {
				if (props.replies.length === 0)
					throw new Error(
						`Attempting to edit a reply of id: ${id} while props.replies: ${JSON.stringify(
							props.replies,
						)} is empty.`,
					)

				const newReplies: Kotti.Comment.Events.EditReplies = [
					...props.replies.slice(0, index),
					{ ...props.replies[index], message },
					...props.replies.slice(index + 1),
				]

				emit('editReplies', newReplies)
			},
			handleInlineSubmit: (commentData: KottiComment.Events.Submit) => {
				userBeingRepliedTo.value = null
				emit('submit', commentData)
			},
			isEditing,
			Kotti,
			placeholder: computed(() =>
				userBeingRepliedTo.value === null
					? null
					: [
							translations.value.replyPlaceholder,
							userBeingRepliedTo.value.userName,
					  ].join(' '),
			),
			userBeingRepliedTo,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment {
	display: flex;
	flex-flow: row;

	+ .kt-comment {
		padding-top: var(--unit-1);
		border-top: 1px solid var(--ui-02);
	}

	&__content {
		display: flex;
		flex: 1;
		flex-direction: column;
		margin-left: var(--unit-2);

		&__info {
			display: flex;
			width: 100%;
			font-size: 0.7rem;
			line-height: 1.2rem;
		}
	}
}
</style>
