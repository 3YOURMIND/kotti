<template>
	<div class="comment">
		<KtAvatar class="comment__avatar" :src="userAvatar" />
		<div class="comment__wrapper">
			<div class="comment__info">
				<div class="info__name" v-text="userName" />
				<div class="info__time" v-text="createdTime" />
			</div>
			<div
				v-if="!isInlineEdit"
				class="comment__message"
				v-html="postEscapeParser(dangerDefaultParserOverride(inlineMessage))"
			/>
			<div class="comment-inline-edit form-group" v-else>
				<textarea
					class="comment-inline-edit-input form-input"
					:value="inlineMessage"
					@change="handleInlineInput"
				></textarea>
				<KtButtonGroup class="comment-inline-edit-buttons" shadow>
					<KtButton icon="close" @click="isInlineEdit = false" />
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
				<div class="action__more" v-if="allowChange">
					<i class="yoco">dots</i>
					<div class="action__options">
						<a @click="isInlineEdit = true"> <li>Edit</li> </a>
						<a @click="handleDelete(id)"> <li>Delete</li> </a>
					</div>
				</div>
			</div>
			<div v-for="reply in replies" :key="reply.id">
				<KtCommentReply
					:id="reply.id"
					:userName="reply.userName"
					:userAvatar="reply.userAvatar"
					:userId="reply.userId"
					:message="reply.message"
					:createdTime="reply.createdTime"
					:allowChange="reply.allowChange"
					:dangerDefaultParserOverride="dangerDefaultParserOverride"
					:postEscapeParser="postEscapeParser"
					@_inlineReplyClick="handleInlineReplyClick"
					@_inlineDeleteClick="handleDelete($event, 'INLINE')"
					@_inlineEditSumbit="$emit('edit', $event)"
				/>
			</div>
			<KtCommentInput
				isInline
				v-if="showInlineReply"
				:parentId="id"
				:replyToUserId="replyToUserId"
				:placeholder="replyToText"
				:userAvatar="userAvatar"
				@submit="handleInlineSubmit($event)"
			/>
		</div>
	</div>
</template>

<script>
import escape from 'lodash/escape'
import KtAvatar from '../../kotti-avatar'
import KtButton from '../../kotti-button'
import KtButtonGroup from '../../kotti-button-group/'
import KtCommentReply from './CommentReply.vue'
import KtCommentInput from './CommentInput.vue'

export default {
	name: 'KtComment',
	props: {
		dangerDefaultParserOverride: { default: escape, type: Function },
		postEscapeParser: { default: _ => _, type: Function },
		createdTime: String,
		id: Number,
		message: String,
		replies: Array,
		userAvatar: String,
		userId: Number,
		userName: String,
		allowChange: Boolean,
	},
	components: {
		KtAvatar,
		KtButton,
		KtButtonGroup,
		KtCommentReply,
		KtCommentInput,
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
		handleInlineInput(event) {
			this.inlineMessageValue = event.target.value
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
