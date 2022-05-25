<template lang="md">
<ComponentInfo v-bind="{ component }" />

## Example

<div class="element-example">
	<KtComment
		v-for="comment in comments"
		:key="comment.id"
		:createdTime="comment.createdTime"
		:id="comment.id"
		:isDeletable="comment.isDeletable"
		:isEditable="comment.isEditable"
		:message="comment.message"
		:replies="comment.replies"
		:userAvatar="comment.userAvatar"
		:userId="comment.userId"
		:userName="comment.userName"
		@delete="handleDelete($event)"
		@edit="handleEdit($event)"
		@editReplies="handleEditReplies(comment.id, $event)"
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
	:createdTime="comment.createdTime"
	:id="comment.id"
	:isDeletable="comment.isDeletable"
	:isEditable="comment.isEditable"
	:message="comment.message"
	:replies="comment.replies"
	:userAvatar="comment.userAvatar"
	:userId="comment.userId"
	:userName="comment.userName"
	@delete="handleDelete($event)"
	@edit="handleEdit($event)"
	@submit="handlePost($event)"
/>
<KtCommentInput
	class="mt-16px"
	placeholder="Add comment"
	userAvatar="https://picsum.photos/120"
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
	isDeletable: true,
	isEditable: true,
	replies: [{
		id: 2,
		userId: 12,
		userName: 'Margaret Atwood',
		message: 'Marine Le Pen, a Fierce Campaigner',
		userAvatar: 'https://picsum.photos/200',
		createdTime: '2018-12-04T09:57:20+00:00',
		isDeletable: false,
		isEditable: false
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
> you can use KtComment's default parser function with KtComment.defaultParser

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
		v-for="comment in comments"
		:key="comment.id"
		:createdTime="comment.createdTime"
		:dangerouslyOverrideParser="dangerouslyOverrideParser"
		:id="comment.id"
		:isDeletable="comment.isDeletable"
		:isEditable="comment.isEditable"
		:message="comment.message"
		:postEscapeParser="postEscapeParser"
		:replies="comment.replies"
		:userAvatar="comment.userAvatar"
		:userId="comment.userId"
		:userName="comment.userName"
		@delete="handleDelete($event)"
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

### Event

| Event Name | Component        | Payload   | Description     |
| ---------- | ---------------- | --------- | --------------- |
| `@submit`  | `KtCommentInput` | See above | Add new comment |
| `@delete`  | `KtComment`      | See above | Delete comment  |
| `@edit`    | `KtComment`      | See above | Edit comment    |
</template>

<script>
import { KtComment } from '@3yourmind/kotti-ui'
import escape from 'lodash/escape'

import ComponentInfo from '~/components/ComponentInfo'

export default {
	name: 'DocumentationPageUsageComponentsComment',
	components: {
		ComponentInfo,
	},
	data() {
		/* eslint-disable sonarjs/no-duplicate-string */
		return {
			currentUuid: '',
			currentUser: {
				userAvatar: 'https://picsum.photos/48',
				userId: 3,
				userName: 'Junyu',
			},
			comments: [
				{
					createdTime: '2018-12-04T09:57:20+00:00',
					id: 1,
					isDeletable: true,
					isEditable: true,
					message: `We miss you, David`,
					replies: [
						{
							createdTime: '2018-03-20',
							id: 2,
							isDeletable: false,
							isEditable: false,
							message:
								'Join Bright Side Now!<br/>Join Bright Side Now! Join Bright Side Now! Join Bright Side Now!',
							userAvatar: 'https://picsum.photos/100',
							userId: 13,
							userName: 'Benni',
						},
						{
							createdTime: '2018-03-20',
							id: 3,
							isDeletable: false,
							isEditable: true,
							message: 'RE: Your trip to Montreal',
							userAvatar: 'https://picsum.photos/120',
							userId: 2,
							userName: 'Cooky',
						},
						{
							createdTime: '2018-03-20',
							id: 4,
							isDeletable: true,
							isEditable: false,
							message: 'PS: Bring a jacket!',
							userAvatar: 'https://picsum.photos/120',
							userId: 2,
							userName: 'Cooky',
						},
					],
					userAvatar: 'https://picsum.photos/200',
					userId: 12,
					userName: 'Margaret Atwood',
				},
			],
			component: KtComment,
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
		handleEdit({ id, message }) {
			const comments = this.comments
			const indexToEdit = comments.findIndex((comment) => comment.id === id)

			this.comments = [
				...comments.slice(0, indexToEdit),
				{ ...comments[indexToEdit], message },
				...comments.slice(indexToEdit + 1),
			]
		},
		handleEditReplies(id, replies) {
			const parentCommentIndex = this.comments.findIndex(
				(comment) => comment.id === id,
			)

			this.comments = [
				...this.comments.slice(0, parentCommentIndex),
				{ ...this.comments[parentCommentIndex], replies },
				...this.comments.slice(parentCommentIndex + 1),
			]
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
		handleDelete(payload) {
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
