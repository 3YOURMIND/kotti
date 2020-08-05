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
}

```

## Parsing HTML

KtComment will escape all tags by default but you can opt out and pass your own parser by using the parser prop

> Remember to **escape malicious tags** to prevent [Cross-site-scripting](https://en.wikipedia.org/wiki/Cross-site_scripting) attacks,
you can use KtComment's default parser function with KtComment.defaultParser

```js
methods: {
	dangerouslyOverrideParser: msg => escape(msg).replace(/\n/g, '<br>'),
	// alternativly you could
	dangerouslyOverrideParser: msg => escape(msg),
	postEscapeParser: msg => msg.replace(/\n/g, '<br/>'),
	// or just
	postEscapeParser: msg => msg.replace(/\n/g, '<br/>'),
}
```

<div class="element-example">
	<KtComment
		v-for="comment in badComments"
		:key="comment.id"
	:dangerouslyOverrideParser="dangerouslyOverrideParser"
		:postEscapeParser="postEscapeParser"
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

### Props

| Attribute            | Description                                 | Type                        | Accepted values                 | Default |
|:---------------------|:--------------------------------------------|:----------------------------|:--------------------------------|:--------|
| `createdTime`  | The Time that appears in the comment | string | "20-12-2008" | - |
| `id`  | the id to track the comment | number, string | "1" | - |
| `replies`  | array of comment props to be nested under the coment | [CommentProps] | [{id: "1", message: "hello"}] | - |
| `userAvatar`  | url to image thumbnail | string | "https://someimage.com/image.png" | - |
| `userId`  | id of user who made the comment to reply too | number, string | "2" | - |
| `userName`  | name of user to display | string | "Jhone Doe" | - |
| `message`  | the actual comment | string | "Hello" | - |
| `dangerDefaultParserOverride`  | A function that processes and escapes the comment message before it is passed to the div that render it, as the name implies you're responsible for escaping if you use this | (string) => string | Function | lodash escape function |
| `postEscapeParser`  | A function that processes the message after is has been escaped use this instead of `dangerDefaultParserOverride` | (string) => string | Function | (_) => _ |
| `allowChange`  | wether this comment is editable | boolean | true,false | false |

### Event

| Event Name | Component        | Payload   | Description     |
|------------|------------------|-----------|-----------------|
| `@submit`  | `KtCommentInput` | See above | Add new comment |
| `@delete`  | `KtComment`      | See above | Delete comment  |
| `@edit`    | `KtComment`      | See above | Edit comment    |

</template>

<script>
import escape from 'lodash/escape'
export default {
	name: 'KtCommentDoc',
	data() {
		/* eslint-disable sonarjs/no-duplicate-string */
		return {
			currentUuid: '',
			currentUser: {
				userName: 'Junyu',
				userId: 3,
				userAvatar: 'https://picsum.photos/48',
			},
			badComments: [
				{
					id: 1,
					userId: 12,
					userName: 'Margaret Atwood',
					message: `We miss you, David`,
					userAvatar: 'https://picsum.photos/200',
					createdTime: '2018-12-04T09:57:20+00:00',
					allowChange: true,
					replies: [
						{
							id: 2,
							userId: 13,
							userName: 'Benni',
							createdTime: '2018-03-20',
							message: `Join Bright Side Now!
								Join Bright Side Now!
								Join Bright Side Now!
								Join Bright Side Now!`,
							userAvatar: 'https://picsum.photos/100',
							allowChange: false,
						},
					],
				},
			],
			comments: [
				{
					id: 1,
					userId: 12,
					userName: 'Margaret Atwood',
					message: `We miss you, David`,
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
								'Join Bright Side Now!<br/>Join Bright Side Now! Join Bright Side Now! Join Bright Side Now!',
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
		/* eslint-enable sonarjs/no-duplicate-string */
	},
	computed: {
		replyName() {
			const _comment = this.comments.find(
				(comment) => comment.uuid === this.currentUuid,
			)
			return _comment ? _comment.name : null
		},
	},
	methods: {
		dangerouslyOverrideParser: (msg) => escape(msg),
		postEscapeParser: (msg) => msg.replace(/\n/g, '</br>'),
		handleEdit(payload) {
			// eslint-disable-next-line
			console.log(payload)
		},
		handleSubmit(payload) {
			const _message = {
				...this.currentUser,
				// eslint-disable-next-line no-magic-numbers
				id: Math.floor(Math.random() * 101),
				message: payload.message,
				createdTime: new Date().toDateString(),
				replies: [],
			}
			const parentComment = this.comments.find(
				(comment) => comment.id === payload.parentId,
			)
			if (parentComment) {
				parentComment.replies.push(_message)
				return
			}
			this.comments.push(_message)
		},
		handelDelete(payload) {
			if (payload.parentId) {
				const parentComment = this.comments.find(
					(comment) => comment.id === payload.parentId,
				)
				parentComment.replies = parentComment.replies.filter(
					(reply) => reply.id !== payload.id,
				)
			}
			this.comments = this.comments.filter(
				(comment) => comment.id !== payload.id,
			)
		},
	},
}
</script>
