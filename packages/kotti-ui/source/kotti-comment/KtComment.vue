<template>
	<div class="kt-comment">
		<KtAvatar size="sm" :src="userAvatar" />
		<div class="kt-comment__content">
			<CommentHeader v-bind="{ createdTime, userName }" />

			<CommentInlineEdit
				:id="id"
				:dangerouslyOverrideParser="dangerouslyOverrideParser"
				:isEditing="isEditing"
				:message="message"
				:postEscapeParser="postEscapeParser"
				@edit="onEdit($event)"
				@update:isEditing="($event) => (isEditing = $event)"
			/>

			<CommentActions
				:userData="{ userId, userName }"
				v-bind="{ isEditable, isDeletable, isEditing }"
				@delete="onDelete(id)"
				@reply="onReply"
				@update:isEditing="isEditing = $event"
			/>

			<div v-for="reply in replies" :key="reply.id">
				<CommentReply
					v-bind="reply"
					:dangerouslyOverrideParser="dangerouslyOverrideParser"
					:postEscapeParser="postEscapeParser"
					@click="onReply"
					@delete="(commentId) => onDelete(commentId, true)"
					@edit="(editPayload) => onEdit(editPayload, true)"
				/>
			</div>

			<KtCommentInput
				v-if="userBeingRepliedTo"
				isInline
				:parentId="id"
				:placeholder="placeholder"
				:replyToUserId="userBeingRepliedTo.userId"
				:userAvatar="userAvatar"
				@submit="onSubmit($event)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { KtAvatar } from '../kotti-avatar'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { Kotti } from '../types'

import CommentActions from './components/CommentActions.vue'
import CommentHeader from './components/CommentHeader.vue'
import CommentInlineEdit from './components/CommentInlineEdit.vue'
import CommentReply from './components/CommentReply.vue'
import KtCommentInput from './KtCommentInput.vue'
import { KottiComment } from './types'

export default defineComponent<KottiComment.PropsInternal>({
	name: 'KtComment',
	components: {
		CommentActions,
		CommentHeader,
		CommentReply,
		CommentInlineEdit,
		KtAvatar,
		KtCommentInput,
	},
	props: makeProps(KottiComment.propsSchema),
	setup(props, { emit }) {
		const isEditing = ref(false)
		const userBeingRepliedTo = ref<Kotti.Comment.UserData | null>(null)
		const translations = useTranslationNamespace('KtComment')

		const onDelete = (commentId: number | string, isReply = false) => {
			const payload: KottiComment.Events.Delete = {
				id: commentId,
				parentId: isReply ? props.id : null,
			}
			emit('delete', payload)
		}

		const onEdit = (
			{ id, message }: KottiComment.Events.InternalEdit,
			isReply = false,
		) => {
			const payload: KottiComment.Events.Edit = {
				id,
				message,
				parentId: isReply ? props.id : null,
			}
			emit('edit', payload)
		}

		return {
			isEditing,
			Kotti,
			onDelete,
			onEdit,
			onReply: (replyUserData: Kotti.Comment.UserData) => {
				userBeingRepliedTo.value = replyUserData
			},
			onSubmit: (commentData: KottiComment.Events.Submit) => {
				userBeingRepliedTo.value = null
				emit('submit', commentData)
			},
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
			font-size: var(--font-size);
			line-height: 1.2rem;
		}
	}
}
</style>
