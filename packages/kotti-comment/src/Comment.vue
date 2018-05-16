<template>
  <div class="comment">
    <KtAvatar class="comment__avatar" :src="src"/>
    <div class="comment__wrapper">
      <div class="comment__info">
        <div class="info__name" v-text="name" />
        <div class="info__time" v-text="time" />
      </div>
      <div class="comment__message" v-text="inlineMessage" v-if="!isInlineEdit"/>
			<div class="comment-inline-edit form-group" v-else>
				<textarea class="comment-inline-edit-input form-input"
				:value="inlineMessage"
				@change="handleInlineInput" />
				<KtButtonGroup class="comment-inline-edit-buttons" shadow>
					<KtButton icon="close" @click="handleDismiss" />
					<KtButton icon="check" @click="handleConfirm" />
				</KtButtonGroup>
			</div>
      <div class="comment__action">
        <div class="action__reply" @click="handleReplyClicked">
          <i class="yoco">comment</i> Reply
        </div>
        <div class="action__more">
          <i class="yoco">dots</i>
          <div class="action__options">
            <a @click="handleEditClicked">
							<li>Edit</li>
						</a>
            <a @click="handCommentDeleteClicked">
							<li>Delete</li>
						</a>
          </div>
        </div>
      </div>
      <div v-for="reply in replies" :key="reply.uuid">
        <KtCommentReply
					:uuid="reply.uuid"
					:name="reply.name"
					:message="reply.message"
					:time="reply.time"
					:src="reply.src"/>
      </div>
    </div>
  </div>
</template>



<script>
import KtAvatar from '../../kotti-avatar';
import KtCommentReply from './CommentReply.vue';
import KtButton from '../../kotti-button';
import KtButtonGroup from '../../kotti-button-group/';

export default {
	name: 'KtComment',
	props: {
		uuid: String,
		name: String,
		time: String,
		src: String,
		message: String,
		replies: Array,
	},
	components: {
		KtCommentReply,
		KtAvatar,
		KtButton,
		KtButtonGroup,
	},
	data() {
		return {
			isInlineEdit: false,
			inlineMessageValue: '',
		};
	},
	computed: {
		styleObject() {
			return {
				avatar: true,
				'avatar-selected': this.selected,
			};
		},
		inlineMessage() {
			return this.inlineMessageValue ? this.inlineMessageValue : this.message;
		},
	},
	methods: {
		handleInlineInput(evt) {
			this.inlineMessageValue = evt.target.value;
		},
		handleDismiss() {
			this.isInlineEdit = false;
		},
		handleConfirm() {
			this.isInlineEdit = false;
			if (!this.inlineMessageValue) return;
			let _payload = {
				value: this.inlineMessageValue,
				uuid: this.uuid,
			};
			this.$emit('commentEditConfirmed', _payload);
		},
		handleEditClicked() {
			this.isInlineEdit = true;
		},
		handleReplyClicked() {
			this.$emit('replyClicked', this.uuid);
		},
		handCommentDeleteClicked() {
			this.$emit('commentDeleteClicked', this.uuid);
		},
	},
};
</script>
