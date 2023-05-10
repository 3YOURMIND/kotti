<template lang="md">
    <ComponentInfo v-bind="{ component }" />

    ## Example

    <div class="element-example no-background">
    	<KtComment
    		v-for="comment in comments"
    		:key="comment.id"
    		v-bind="comment"
    		@add="handleAdd($event)"
    		@delete="handleDelete($event)"
    		@edit="handleEdit($event)"
    	/>
    	<KtCommentInput
    		class="mt-16px"
    		placeholder="Add a comment"
    		userAvatar='https://picsum.photos/120'
    		@add="handleAdd($event)"
    	/>
    </div>

    ```html
    <KtComment
    	v-for="comment in comments"
    	:key="comment.id"
    	v-bind="comment"
    	@add="handleAdd($event)"
    	@delete="handleDelete($event)"
    	@edit="handleEdit($event)"
    />
    <KtCommentInput
    	class="mt-16px"
    	placeholder="Add a comment"
    	userAvatar="https://picsum.photos/120"
    	@add="handleAdd($event)"
    />
    ```

    ## Usage

    ### Comment Object

    ```js
    {
    	createdAt: '2018-12-04 09:57',
    	id: 1,
    	isDeletable: true,
    	isEditable: true,
    	isInternalThread: true,
    	isModified: true,
    	message: 'Comment message',
    	replies: [{
    		createdAt: '2018-12-04 09:57',
    		id: 2,
    		isDeletable: false,
    		isEditable: false
    		isModified: true,
    		message: 'Reply message',
    		user: {
    			avatar: 'https://picsum.photos/200',
    			id: 102,
    			name: 'User name',
    		},
    	}],
    	user: {
    		avatar: 'https://picsum.photos/230',
    		id: 101,
    		name: 'User name',
    	},
    }
    ```

    ### Payload Object

    ```js
    // Add Payload
    {
    	message: String
    	parentId?: Number | String
    	replyToUserId: Number | String
    }

    // Delete Payload
    {
    	id: Number | String
    	parentId?: Number | String
    }

    // Edit Payload
    {
    	id: Number | String
    	message: String
    	parentId?: Number | String
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

    <div class="element-example no-background">
    	<KtComment
    		v-for="comment in comments"
    		:key="comment.id"
    		v-bind="comment"
    		:dangerouslyOverrideParser="dangerouslyOverrideParser"
    		:postEscapeParser="postEscapeParser"
    		@add="handleAdd($event)"
    		@delete="handleDelete($event)"
    		@edit="handleEdit($event)"
    	/>
    	<KtCommentInput
    		class="mt-16px"
    		placeholder="Add a comment"
    		userAvatar='https://picsum.photos/120'
    		@add="handleAdd($event)"
    	/>
    </div>

    ### Events

    | Event Name | Component                     | Payload   | Description     |
    | ---------- | ----------------------------- | --------- | --------------- |
    | `@add`     | `KtComment`, `KtCommentInput` | See above | Add new comment |
    | `@delete`  | `KtComment`                   | See above | Delete comment  |
    | `@edit`    | `KtComment`                   | See above | Edit comment    |
</template>

<script lang="ts">
import { KtComment, Kotti } from '@3yourmind/kotti-ui'
import { defineComponent, ref } from '@vue/composition-api'
import escape from 'lodash/escape'

import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsComment',
	components: {
		ComponentInfo,
	},
	setup() {
		const comments = ref<Array<Kotti.Comment.Props>>([
			{
				createdAt: '2018-03-21 09:49',
				id: 1,
				isDeletable: true,
				isEditable: true,
				isInternalThread: true,
				message: `We miss you, David`,
				replies: [
					{
						createdAt: '2018-03-21 09:57',
						id: 2,
						isDeletable: false,
						isEditable: false,
						message: 'Join Bright Side Now!<br/>Join Bright Side Now!',
						user: {
							avatar: 'https://picsum.photos/100',
							id: 13,
							name: 'Benni',
						},
					},
					{
						createdAt: '2018-03-21 10:05',
						id: 3,
						isDeletable: false,
						isEditable: true,
						isModified: true,
						message: 'RE: Your trip to Montreal',
						user: {
							avatar: 'https://picsum.photos/120',
							id: 2,
							name: 'Cooky',
						},
					},
					{
						createdAt: '2018-03-21 10:06',
						id: 4,
						isDeletable: true,
						isEditable: false,
						message: 'PS: Bring a jacket!',
						user: {
							avatar: 'https://picsum.photos/120',
							id: 2,
							name: 'Cooky',
						},
					},
				],
				user: {
					avatar: 'https://picsum.photos/200',
					id: 12,
					name: 'Margaret',
				},
			},
			{
				createdAt: '2018-03-23 11:20',
				id: 5,
				isDeletable: true,
				isEditable: true,
				message: `BBQ tonite?`,
				replies: [
					{
						createdAt: '2018-03-23 11:43',
						id: 6,
						isDeletable: true,
						isEditable: true,
						message: `I'm in!`,
						user: {
							avatar: 'https://picsum.photos/210',
							id: 9,
							name: 'Janis',
						},
					},
				],
				user: {
					avatar: 'https://picsum.photos/230',
					id: 6,
					name: 'Lemmy',
				},
			},
		])
		const currentUser = ref<Kotti.Comment.User>({
			avatar: 'https://picsum.photos/10',
			id: 3,
			name: 'James',
		})

		const buildNewComment = (
			message: Kotti.Comment.Props['message'],
		): Kotti.Comment.Props => ({
			createdAt: new Date().toDateString(),
			// eslint-disable-next-line no-magic-numbers
			id: Math.floor(Math.random() * 101),
			isDeletable: true,
			isEditable: true,
			message,
			replies: [],
			user: currentUser.value,
		})
		const editComment =
			(payload: Kotti.Comment.Events.Edit) =>
			<T extends Kotti.Comment.Props | Kotti.Comment.Reply.Props>(
				comment: T,
			): T =>
				comment.id === payload.id
					? {
							...comment,
							isModified: true,
							message: payload.message,
					  }
					: comment

		return {
			comments,
			component: KtComment,
			dangerouslyOverrideParser: (msg: string) => escape(msg),
			handleAdd(payload: Kotti.Comment.Events.Add) {
				if (!payload.parentId) {
					comments.value.push(buildNewComment(payload.message))
					return
				}

				const parentComment = comments.value.find(
					(comment) => comment.id === payload.parentId,
				)

				if (!parentComment)
					throw new Error(`Comment not found, comment id: ${payload.parentId}`)

				parentComment.replies.push(buildNewComment(payload.message))
			},
			handleEdit(payload: Kotti.Comment.Events.Edit) {
				if (!payload.parentId) {
					if (!comments.value.find((comment) => comment.id === payload.id))
						throw new Error(`Comment not found, comment id: ${payload.id}`)

					comments.value = comments.value.map(editComment(payload))
					return
				}

				const parentComment = comments.value.find(
					(comment) => comment.id === payload.parentId,
				)

				if (!parentComment)
					throw new Error(`Comment not found, comment id: ${payload.parentId}`)

				if (!parentComment.replies.find((reply) => reply.id === payload.id))
					throw new Error(`Comment not found, comment id: ${payload.id}`)

				parentComment.replies = parentComment.replies.map(editComment(payload))
			},
			handleDelete(payload: Kotti.Comment.Events.Delete) {
				if (!payload.parentId) {
					if (!comments.value.find((comment) => comment.id === payload.id))
						throw new Error(`Comment not found, comment id: ${payload.id}`)

					comments.value = comments.value.filter(
						(comment) => comment.id !== payload.id,
					)
					return
				}

				const parentComment = comments.value.find(
					(comment) => comment.id === payload.parentId,
				)

				if (!parentComment)
					throw new Error(`Comment not found, comment id: ${payload.parentId}`)

				if (!parentComment.replies.find((reply) => reply.id === payload.id))
					throw new Error(`Comment not found, comment id: ${payload.id}`)

				parentComment.replies = parentComment.replies.filter(
					(reply) => reply.id !== payload.id,
				)
			},
			postEscapeParser: (msg: string) => msg.replace(/\n/g, '</br>'),
		}
	},
})
</script>

<style lang="scss" scoped>
.no-background {
	background: unset;
}
</style>
