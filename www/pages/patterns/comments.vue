<template lang=md>

# Comments

<div>
<KtComment
  @replyClicked="handleCurrentUuid(comment.uuid)"
  @commentDeleteClicked="handleCommentDeleteClicked(comment.uuid)"
  v-for="comment in comments"
  :key="comment.uuid"
  :uuid="comment.uuid"
  :name="comment.name"
  :message="comment.message" :src="comment.src"
  :replies="comment.replies"/>
<KtCommentInput :replyName="replyName" @replyCloseClicked="handleReplyCloseClicked"/>
</div>

</template>

<script>
import KtComment from '../../../packages/kotti-comment/src/Comment.vue';
import KtCommentInput from '../../../packages/kotti-comment/src/CommentInput.vue';
import KtCommentReply from '../../../packages/kotti-comment/src/CommentReply.vue';
export default {
	name: 'KtCommentDoc',
	components: {
		KtComment,
		KtCommentInput,
		KtCommentReply,
	},
	data() {
		return {
			currentUuid: '',
			comments: [
				{
					uuid: '333afea0-52c0-11e8-9c2d-fa7ae01bbebc',
					name: 'Margaret Atwood',
					message:
						'Marine Le Pen, a Fierce Campaigner, Heads to Finale in French Election',
					src: 'https://picsum.photos/200',
					replies: [
						{
							uuid: '45051148-52c0-11e8-9c2d-fa7ae01bbebc',
							name: 'Benni',
							message: 'Join Bright Side Now!',
							src: 'https://picsum.photos/100',
						},
						{
							uuid: '4bf75e84-52c0-11e8-9c2d-fa7ae01bbebc',
							name: 'Cooky',
							message: 'RE: Your trip to Montreal',
							src: 'https://picsum.photos/120',
						},
					],
				},
				{
					uuid: 'f682fa1a-52c1-11e8-9c2d-fa7ae01bbebc',
					name: 'Anny Hetwood',
					message: 'Marine Le Pen Finale in French Election',
					src: 'https://picsum.photos/100',
					replies: [
						{
							uuid: 'f9e6e2d4-52c1-11e8-9c2d-fa7ae01bbebe',
							name: 'Benni',
							message: 'Join Bright!',
							src: 'https://picsum.photos/100',
						},
						{
							uuid: '005e57aa-52c2-11e8-9c2d-fa7ae01bbebc',
							name: 'Cooky',
							message: 'Your trip to Montreal is cool',
							src: 'https://picsum.photos/120',
						},
					],
				},
			],
		};
	},
	computed: {
		replyName() {
			let _comment = this.comments.find(
				comment => comment.uuid === this.currentUuid
			);
			return _comment ? _comment.name : null;
		},
	},
	methods: {
		handleCurrentUuid(value) {
			console.log(value);
			this.currentUuid = value;
		},
		handleReplyCloseClicked() {
			this.currentUuid = null;
		},
		handleCommentDeleteClicked(uuid) {
			let _comments = [];
			this.comments.find(comment => {
				if (comment.uuid !== uuid) _comments.push(comment);
			});
			this.comments = _comments;
		},
	},
};
</script>
