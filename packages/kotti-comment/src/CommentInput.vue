<template>
  <div class="comment-input">
    <div class="comment-input__wrapper" 
      :class="{'comment-input__wrapper--focus' : textFocused}">
      <div class="comment-input__quote" v-if="replyName">
        <div class="comment-quote__name">Reply to {{replyName}}</div>
        <div class="comment-quote__close c-hand" @click="handleReplyClose">
          <i class="yoco">close</i>
        </div>
      </div>
				<div class="comment-input__reply">
					<div class="comment-input__avatar">
						<img src="https://picsum.photos/200/200">
					</div>
					<div class="comment-input__input">
						<textarea 
						@focus="textFocused=true" 
						@blur="textFocused=false"
						@input="updateHeight"
						ref="textarea"
						>
						</textarea>
					</div>
					<div class="comment-input__button">
						<button class="text">post</button>
					</div>
					</div>
    </div>
  </div>
</template>

<script>
export default {
	name: 'KtCommentInput',
	props: {
		replyName: String,
	},
	data() {
		return {
			textFocused: false,
		};
	},
	methods: {
		updateHeight() {
			this.$refs.textarea.style.height = '1.3rem';
			var height = this.$refs.textarea.scrollHeight;
			this.$refs.textarea.style.height = `${height}px`;
		},
		handleReplyClose() {
			this.$emit('replyCloseClicked');
		},
	},
};
</script>
