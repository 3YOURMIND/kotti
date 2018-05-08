<template>
  <div class="comment-reply">
    <KtAvatar small :src="src"/>
    <div class="comment-reply__wrapper">
      <div class="comment-reply__info">
        <div class="comment-reply__name" v-text="name" />
        <div class="comment-reply__time">2018-04-02 14:30</div>
      </div>
			<div class="comment-reply__body">
      	<div class="comment-reply__text" v-text="message" />
				<div class="comment-reply__action action__more">
          <i class="yoco">dots</i>
					<div class="comment__options">
						<a>Edit</a>
						<a @click="handCommentDeleteClicked">Delete</a>
					</div>
				</div>
			</div>
    </div>
  </div>
</template>

<script>
import KtAvatar from '../../kotti-avatar';

export default {
	name: 'KtCommentReply',
	components: {
		KtAvatar,
	},
	props: {
		name: String,
		message: String,
		src: String,
	},
};
</script>
