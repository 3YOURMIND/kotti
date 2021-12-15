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
					<i class="yoco" v-text="'comment'" /> {{ replyButton }}
				</div>
				<div v-if="actionOptions.length > 0" class="action__more">
					<i class="yoco">dots</i>
					<div class="action__options">
						<a
							v-for="option in actionOptions"
							:key="option.label"
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

import { KtAvatar } from '../kotti-avatar'
import { KtButton } from '../kotti-button'
import { KtButtonGroup } from '../kotti-button-group'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'

import CommentReply from './components/CommentReply.vue'
import KtCommentInput from './KtCommentInput.vue'
import { KottiComment } from './types'

type UserData = Pick<KottiComment.PropsInternal, 'userName' | 'userId'>
type CommentAction = {
	label: string
	onClick: () => void
}

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
		const translations = useTranslationNamespace('KtComment')

		const handleDelete = (
			commentId: number | string | null,
			isInline?: boolean,
		) => {
			const payload: KottiComment.Events.Delete = {
				id: commentId,
				parentId: isInline ? props.id ?? null : null,
			}
			emit('delete', payload)
		}
		return {
			actionOptions: computed<Array<CommentAction>>(() => {
				const options: Array<CommentAction> = []
				if (isInlineEdit.value) return options
				if (props.isEditable)
					options.push({
						label: 'Edit',
						onClick: () => {
							inlineMessageValue.value = props.message
							isInlineEdit.value = true
						},
					})
				if (props.isDeletable)
					options.push({
						label: 'Delete',
						onClick: () => handleDelete(props.id ?? null),
					})
				return options
			}),
			cancelInlineEdit: () => {
				inlineMessageValue.value = null
				isInlineEdit.value = false
			},
			handleDelete,
			handleEditConfirm: () => {
				isInlineEdit.value = false
				if (inlineMessageValue.value === null) return
				const payload: KottiComment.Events.Edit = {
					id: props.id ?? null,
					message: inlineMessageValue.value,
				}
				emit('edit', payload)
			},
			handleInlineReplyClick: (replyUserData: UserData) => {
				userBeingRepliedTo.value = replyUserData
			},
			handleInlineSubmit: (commentData: KottiComment.Events.Submit) => {
				userBeingRepliedTo.value = null
				emit('submit', commentData)
			},
			inlineMessage: computed(() => inlineMessageValue.value ?? props.message),
			inlineMessageValue,
			isInlineEdit,
			placeholder: computed(() =>
				userBeingRepliedTo.value === null
					? null
					: [
							translations.value.replyPlaceholder,
							userBeingRepliedTo.value.userName,
					  ].join(' '),
			),
			replyButton: computed(() => translations.value.replyButton),
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
