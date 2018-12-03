<template lang="md">

# Comments

<div>
	<KtComment
		v-for="comment in comments"
		:key="comment.uuid"
		:uuid="comment.uuid"
		:time="comment.time"
		:name="comment.name"
		:message="comment.message" :src="comment.src"
		:replies="comment.replies"
		@delete="handleCommentDeleteClicked(comment.uuid)"
		@edit="handleEditSumbit(payload)"
		@replySubmit="handlePost($event)"
	/>
	<KtCommentInput
		class="mt-16px"
		placeholder="Add comment"
		src='https://picsum.photos/120'
		:replyName="replyName"
		@submit="handlePost($event)"
	/>
</div>

</template>

<script>
export default {
	name: 'KtCommentDoc',
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
					time: '2018-03-20',
					replies: [
						{
							uuid: '45051148-52c0-11e8-9c2d-fa7ae01bbebc',
							name: 'Benni',
							userId: '12',
							time: '2018-03-20',
							message:
								'Join Bright Side Now! Join Bright Side Now! Join Bright Side Now! Join Bright Side Now!',
							src: 'https://picsum.photos/100',
						},
						{
							uuid: '4bf75e84-52c0-11e8-9c2d-fa7ae01bbebc',
							name: 'Cooky',
							time: '2018-03-20',
							userId: '1',
							message: 'RE: Your trip to Montreal',
							src: 'https://picsum.photos/120',
						},
					],
				},
			],
		}
	},
	computed: {
		replyName() {
			const _comment = this.comments.find(
				comment => comment.uuid === this.currentUuid,
			)
			return _comment ? _comment.name : null
		},
	},
	methods: {
		handleCurrentUuid(value) {
			this.currentUuid = value
		},
		handleEditSumbit(payload) {
			console.log(payload)
		},
		handlePost(payload) {
			const _message = {
				uuid: Math.random().toString(),
				name: 'Junyu',
				message: payload.message,
				src: 'https://picsum.photos/120',
				time: new Date().toDateString(),
				replies: [],
			}
			const parentComment = this.comments.find(comment => {
				return comment.uuid === payload.parentId
			})
			if (parentComment) {
				parentComment.replies.push(_message)
				return
			}
			this.comments.push(_message)
		},
		handleCommentDeleteClicked(uuid) {
			this.comments = this.comments.filter(comment => comment.uuid !== uuid)
		},
	},
}
</script>
