<template>
  <div class="comment">
    <KtAvatar class="comment__avatar" :src="src"/>
    <div class="comment__wrapper">
      <div class="comment__info">
        <div class="info__name" v-text="name" />
        <div class="info__time">2018-04-02 14:30</div>
      </div>
      <div class="comment__text" v-text="message" />
      <div class="comment__action">
        <div class="action__reply" @click="handleReplyClicked">
          <i class="yoco">comment</i> Reply
        </div>
        <div class="action__more">
          <i class="yoco">dots</i>
          <div class="comment__options">
            <a>Edit</a>
            <a @click="handCommentDeleteClicked">Delete</a>
          </div>
        </div>
      </div>
      <div v-for="reply in replies" :key="reply.uuid">
        <KtCommentReply :name="reply.name" :message="reply.message" :src="reply.src"/>
      </div>
    </div>
  </div>
</template>


<script>
import KtAvatar from '../../kotti-avatar';
import KtCommentReply from './CommentReply.vue';

export default {
	name: 'KtComment',
	props: {
		uuid: String,
		name: '',
		time: '',
		src: '',
		message: '',
		replies: Array,
	},
	components: {
		KtCommentReply,
		KtAvatar,
	},
	computed: {
		styleObject() {
			return {
				avatar: true,
				'avatar-selected': this.selected,
			};
		},
	},
	methods: {
		handleReplyClicked() {
			this.$emit('replyClicked');
		},
		handCommentDeleteClicked() {
			this.$emit('commentDeleteClicked');
		},
	},
};
</script>
