<template>
	<div class="comment">
		<KtAvatar class="comment__avatar" :src="src" />
		<div class="comment__wrapper">
			<div class="comment__info">
				<div class="info__name" v-text="name" />
				<div class="info__time" v-text="time" />
			</div>
			<div
				v-if="!isInlineEdit"
				class="comment__message"
				v-text="inlineMessage"
			/>
			<div class="comment-inline-edit form-group" v-else>
				<textarea
					class="comment-inline-edit-input form-input"
					:value="inlineMessage"
					@change="handleInlineInput"
				></textarea>
				<KtButtonGroup class="comment-inline-edit-buttons" shadow>
					<KtButton icon="close" @click="handleDismiss" />
					<KtButton icon="check" @click="handleConfirm" />
				</KtButtonGroup>
			</div>
			<div class="comment__action">
				<div class="action__reply" @click="handleInlineReplyClick(name)">
					<i class="yoco">comment</i> Reply
				</div>
				<div class="action__more">
					<i class="yoco">dots</i>
					<div class="action__options">
						<a @click="handleEditClicked"> <li>Edit</li> </a>
						<a @click="handCommentDeleteClicked"> <li>Delete</li> </a>
					</div>
				</div>
			</div>
			<div v-for="reply in replies" :key="reply.uuid">
				<KtCommentReply
					:uuid="reply.uuid"
					:name="reply.name"
					:message="reply.message"
					:time="reply.time"
					:src="reply.src"
					@inlineReplyClick="handleInlineReplyClick"
				/>
			</div>
			<KtCommentInput
				isInline
				v-if="showInlineReply"
				:parentId="uuid"
				:placeholder="replyToText"
				@postClick="handleInlinePostClick($event)"
			/>
		</div>
	</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar'
import KtButton from '../../kotti-button'
import KtButtonGroup from '../../kotti-button-group/'
import KtCommentReply from './CommentReply.vue'
import KtCommentInput from './CommentInput.vue'

export default {
	name: 'KtComment',
	props: {
		message: String,
		name: String,
		replies: Array,
		src: String,
		time: String,
		uuid: String,
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
		handleInlineReplyClick(name) {
			this.showInlineReply = true
			this.replyToText = `Reply to ${name}`
		},
		handleInlinePostClick(event) {
			this.showInlineReply = false
			this.$emit('inlinePostClick', event)
		},
		handleDismiss() {
			this.isInlineEdit = false
		},
		handleConfirm() {
			this.isInlineEdit = false
			if (!this.inlineMessageValue) return

			this.$emit('commentEditConfirmed', {
				value: this.inlineMessageValue,
				uuid: this.uuid,
			})
		},
		handleEditClicked() {
			this.isInlineEdit = true
		},
		handCommentDeleteClicked() {
			this.$emit('commentDeleteClicked', this.uuid)
		},
	},
}
</script>
