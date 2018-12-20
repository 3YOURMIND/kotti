<template lang="md">

# Comments

## Example

<div class="element-example">
	<KtComment
		v-for="comment in comments"
		:key="comment.id"
		:id="comment.id"
		:createdTime="comment.createdTime"
		:userName="comment.userName"
		:userAvatar="comment.userAvatar"
		:userId="comment.userId"
		:message="comment.message"
		:replies="comment.replies"
		:allowChange="comment.allowChange"
		@delete="handelDelete($event)"
		@edit="handleEdit($event)"
		@submit="handleSubmit($event)"
	/>
	<KtCommentInput
		class="mt-16px"
		placeholder="Add comment"
		userAvatar='https://picsum.photos/120'
		@submit="handleSubmit($event)"
	/>
</div>

```html
<KtComment
	v-for="comment in comments"
	:key="comment.id"
	:id="comment.id"
	:createdTime="comment.createdTime"
	:userName="comment.userName"
	:userAvatar="comment.userAvatar"
	:userId="comment.userId"
	:message="comment.message"
	:replies="comment.replies"
	:allowChange="comment.allowChange"
	@delete="handelDelete($event)"
	@edit="handleEdit($event)"
	@submit="handlePost($event)"
/>
<KtCommentInput
	class="mt-16px"
	placeholder="Add comment"
	userAvatar='https://picsum.photos/120'
	@submit="handlePost($event)"
/>
```

## Usage

### Comment Object

```js
{
	id: 1, // Comment ID
	userId: 12,
	userName: 'Margaret Atwood',
	message: 'Marine Le Pen, a Fierce Campaigner',
	userAvatar: 'https://picsum.photos/200',
	createdTime: '2018-12-04T09:57:20+00:00',
	allowChange: true,
	replies: [{
		id: 2,
		userId: 12,
		userName: 'Margaret Atwood',
		message: 'Marine Le Pen, a Fierce Campaigner',
		userAvatar: 'https://picsum.photos/200',
		createdTime: '2018-12-04T09:57:20+00:00',
		allowChange: false
	}]
}
```

### Payload Object

```js
// Submit Payload
{
	parentId: Number // If null => parent comment
	replyToUserId: Number // Reserved variable for @ function
	message: String
}

// Edit Payload
{
	id: Number
	message: String
}

// Delete Payload
{
	id: Number
	message: String
	parentId: Number
}

```

### Event

| Event Name | Component        | Payload   | Description     |
|------------|------------------|-----------|-----------------|
| `@submit`  | `KtCommentInput` | See above | Add new comment |
| `@delete`  | `KtComment`      | See above | Delete comment  |
| `@edit`    | `KtComment`      | See above | Edit comment    |

</template>

<script>
export default {
	name: 'KtCommentDoc',
	data() {
		return {
			currentUuid: '',
			currentUser: {
				userName: 'Junyu',
				userId: 3,
				userAvatar: 'https://picsum.photos/48',
			},
			comments: [
				{
					id: 1,
					userId: 12,
					userName: 'Margaret Atwood',
					message:
						'Marine Le Pen, a Fierce Campaigner, Heads to Finale in French Election',
					userAvatar: 'https://picsum.photos/200',
					createdTime: '2018-12-04T09:57:20+00:00',
					allowChange: true,
					replies: [
						{
							id: 2,
							userId: 13,
							userName: 'Benni',
							createdTime: '2018-03-20',
							message:
								'Join Bright Side Now! Join Bright Side Now! Join Bright Side Now! Join Bright Side Now!',
							userAvatar: 'https://picsum.photos/100',
							allowChange: false,
						},
						{
							id: 3,
							userId: 2,
							userName: 'Cooky',
							userAvatar: 'https://picsum.photos/120',
							createdTime: '2018-03-20',
							message: 'RE: Your trip to Montreal',
							allowChange: true,
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
		handleEdit(payload) {
			console.log(payload)
		},
		handleSubmit(payload) {
			const _message = {
				...this.currentUser,
				id: Math.floor(Math.random() * 101),
				message: payload.message,
				createdTime: new Date().toDateString(),
				replies: [],
			}
			const parentComment = this.comments.find(comment => {
				return comment.id === payload.parentId
			})
			if (parentComment) {
				parentComment.replies.push(_message)
				return
			}
			this.comments.push(_message)
		},
		handelDelete(payload) {
			if (payload.parentId) {
				let parentComment = this.comments.find(
					comment => comment.id === payload.parentId,
				)
				parentComment.replies = parentComment.replies.filter(
					reply => reply.id !== payload.id,
				)
			}
			this.comments = this.comments.filter(comment => comment.id !== payload.id)
		},
	},
}
</script>
