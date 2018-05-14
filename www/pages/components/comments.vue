<template>
	<div>
		<h1>Comments</h1>
		<KottiComment
			:authorName="comment.name"
			:message="comment.message"
			:replies="replies"
		/>
	</div>
</template>

<script>
import KottiComment from '../../../packages/kotti-comment/dist/kotti-comment.esm';
import '../../../packages/kotti-comment/dist/kotti-comment.css';

export default {
	name: 'CommentsPage',
	components: {
		KottiComment,
	},
	data() {
		return {
			comment: {
				name: 'Margaret Atwood',
				message:
					'Marine Le Pen, a Fierce Campaigner, Heads to Finale in French Election',
			},
			replies: [
				{
					name: 'Benni',
					message: 'Join Bright Side Now!',
				},
				{
					name: 'Cooky',
					message: 'RE: Your trip to Montreal',
				},
			],
		};
	},
};
</script>

<style>
</style>
