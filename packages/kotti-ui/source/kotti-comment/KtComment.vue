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
					@_inlineDeleteClick="handleDelete($event, 'INLINE')"
					@_inlineEditSubmit="$emit('edit', $event)"
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
		createdTime: String,
		dangerouslyOverrideParser: { default: escape, type: Function },
		id: [Number, String],
		isDeletable: { default: false, type: Boolean },
		isEditable: { default: false, type: Boolean },
		message: String,
		postEscapeParser: { default: (_) => _, type: Function },
		replies: Array,
		userAvatar: String,
		userId: [Number, String],
		userName: String,
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
		actionOptions() {
			const options = []
			if (this.isEditable)
				options.push({
					label: 'Edit',
					onClick: () => {
						this.inlineMessageValue = this.inlineMessage
						this.isInlineEdit = true
					},
					type: 'EDIT',
				})
			if (this.isDeletable)
				options.push({
					label: 'Delete',
					onClick: () => this.handleDelete(this.id),
					type: 'DELETE',
				})
			return options
		},
	},
	methods: {
		cancelInlineEdit() {
			this.inlineMessageValue = ''
			this.isInlineEdit = false
		},
		handleInlineReplyClick(user) {
			this.showInlineReply = true
			this.replyToUserId = user.userId
			this.replyToText = `Reply to ${user.userName}`
		},
		handleDelete(event, type) {
			this.$emit('delete', {
				id: event,
				parentId: type ? this.id : null,
			})
		},
		handleInlineSubmit(event) {
			this.showInlineReply = false
			this.$emit('submit', event)
		},
		handleEditConfirm() {
			this.isInlineEdit = false
			if (!this.inlineMessageValue) return
			this.$emit('edit', {
				id: this.id,
				message: this.inlineMessageValue,
			})
		},
	},
}
</script>

<style lang="scss" scoped>
.action__reply {
	display: flex;
	align-items: center;
}
</style>
