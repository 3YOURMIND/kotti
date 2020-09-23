<template>
	<div class="comment">
		<KtAvatar class="comment__avatar" :src="userAvatar" />
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
				<KtButtonGroup class="comment-inline-edit-buttons" shadow>
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
				<div v-if="allowChange" class="action__more">
					<i class="yoco">dots</i>
					<div class="action__options">
						<a @click="startInlineEdit"> <li>Edit</li> </a>
						<a @click="handleDelete(id)"> <li>Delete</li> </a>
					</div>
				</div>
			</div>
			<div v-for="reply in replies" :key="reply.id">
				<CommentReply
					:id="reply.id"
					:allowChange="reply.allowChange"
					:createdTime="reply.createdTime"
					:dangerouslyOverrideParser="dangerouslyOverrideParser"
					:message="reply.message"
					:postEscapeParser="postEscapeParser"
					:userAvatar="reply.userAvatar"
					:userId="reply.userId"
					:userName="reply.userName"
					@_inlineDeleteClick="handleDelete($event, 'INLINE')"
					@_inlineEditSumbit="$emit('edit', $event)"
					@_inlineReplyClick="handleInlineReplyClick"
				/>
			</div>
			<KtCommentInput
				v-if="showInlineReply"
				isInline
				:parentId="id"
				:placeholder="replyToText"
				:replyToUserId="replyToUserId"
				:userAvatar="userAvatar"
				@submit="handleInlineSubmit($event)"
			/>
		</div>
	</div>
</template>

<script>
import escape from 'lodash/escape'

import { KtAvatar } from '../kotti-avatar'
import { KtButton } from '../kotti-button'
import { KtButtonGroup } from '../kotti-button-group'

import CommentReply from './components/CommentReply.vue'
import KtCommentInput from './KtCommentInput.vue'
import { defaultParser } from './utilities'

export default {
	defaultParser,
	name: 'KtComment',
	components: {
		KtAvatar,
		KtButton,
		KtButtonGroup,
		CommentReply,
		KtCommentInput,
	},
	props: {
		dangerouslyOverrideParser: { default: escape, type: Function },
		postEscapeParser: { default: (_) => _, type: Function },
		createdTime: String,
		id: [Number, String],
		message: String,
		replies: Array,
		userAvatar: String,
		userId: [Number, String],
		userName: String,
		allowChange: Boolean,
	},
	data() {
		return {
			showInlineReply: false,
			replyToText: null,
			replyToUserId: Number,
			isInlineEdit: false,
			inlineMessageValue: '',
		}
	},
	computed: {
		styleObject() {
			return {
				avatar: true,
				'avatar-selected': this.selected,
			}
		},
		inlineMessage() {
			return this.inlineMessageValue || this.message
		},
	},
	methods: {
		cancelInlineEdit() {
			this.inlineMessageValue = ''
			this.isInlineEdit = false
		},
		startInlineEdit() {
			this.inlineMessageValue = this.inlineMessage
			this.isInlineEdit = true
		},
		handleInlineReplyClick(user) {
			this.showInlineReply = true
			this.replyToUserId = user.userId
			this.replyToText = `Reply to ${user.userName}`
		},
		handleDelete(event, type) {
			const _payload = {
				id: event,
				parentId: type ? this.id : null,
			}
			this.$emit('delete', _payload)
		},
		handleInlineSubmit(event) {
			this.showInlineReply = false
			this.$emit('submit', event)
		},
		handleEditConfirm() {
			this.isInlineEdit = false
			if (!this.inlineMessageValue) return
			const _payload = {
				id: this.id,
				message: this.inlineMessageValue,
			}
			this.$emit('edit', _payload)
		},
	},
}
</script>
