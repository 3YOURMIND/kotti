<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<p>
			Use <code>KtComment</code> to display a comment thread, a comment post and
			comment replies. It allows adding new replies by clicking on the
			<strong>Reply</strong>
			button.
		</p>
		<p>Use <code>KtCommentInput</code> to input new comment posts.</p>

		<h2>Example</h2>
		<KtI18nContext :locale="settings.locale">
			<div class="element-example no-background">
				<KtComment
					v-for="comment in comments"
					:key="comment.id"
					v-bind="comment"
					:allowInternal="settings.allowInternal"
					:forceInternal="settings.forceInternal"
					class="mb-block"
					:dataTest="settings.dataTest"
					:isReadOnly="settings.isReadOnly"
					:tabIndex="settings.tabIndex"
					:userAvatar="currentUser.avatar"
					@add="handleAdd($event)"
					@delete="handleDelete($event)"
					@edit="handleEdit($event)"
				/>
				<KtCommentInput
					:allowInternal="settings.allowInternal"
					:forceInternal="settings.forceInternal"
					:isInternal="settings.isInternal"
					:dataTest="settings.dataTest"
					:placeholder="settings.placeholder"
					:tabIndex="settings.tabIndex"
					:userAvatar="currentUser.avatar"
					@add="handleAdd($event)"
				/>
			</div>

			<KtForm v-model="settings" size="small">
				<div class="wrapper">
					<div>
						<h4>Settings</h4>
						<KtFieldSingleSelect
							formKey="locale"
							helpText="Can be set via KtI18nContext"
							hideClear
							label="Language"
							leftIcon="global"
							:options="[
								{ label: 'German (de-DE)', value: 'de-DE' },
								{ label: 'English (en-US)', value: 'en-US' },
								{ label: 'Spanish (es-ES)', value: 'es-ES' },
								{ label: 'French (fr-FR)', value: 'fr-FR' },
								{ label: 'Japanese (ja-JP)', value: 'ja-JP' },
							]"
						/>
						<KtFieldNumber formKey="tabIndex" isOptional label="tabIndex" />
						<KtFieldToggle
							formKey="allowInternal"
							helpText="Allows Internal Comments i.e. Restricted access"
							isOptional
							label="allowInternal"
							type="switch"
						/>
						<KtFieldToggle
							formKey="forceInternal"
							helpText="Force Internal Comments i.e. No public access (only meaningful if allowInternal is true)"
							isOptional
							label="forceInternal"
							type="switch"
						/>
						<KtFieldToggle
							formKey="isReadOnly"
							helpText="Hides KtComment action buttons"
							isOptional
							label="isReadOnly"
							type="switch"
						/>
					</div>
					<div>
						<h4>Texts</h4>
						<KtFieldText formKey="dataTest" isOptional label="dataTest" />
						<KtFieldText formKey="placeholder" isOptional label="placeholder" />
					</div>
				</div>
			</KtForm>

			<pre><code data-lang="vue">&lt;KtComment
	v-for=&quot;comment in comments&quot;
	:key=&quot;comment.id&quot;
	v-bind=&quot;comment&quot;
	allowInternal
	dataTest=&quot;comments&quot;
	:isReadOnly=&quot;false&quot;
	:tabIndex=&quot;1&quot;
	:userAvatar=&quot;currentUser.avatar&quot;
	@add=&quot;handleAdd($event)&quot;
	@delete=&quot;handleDelete($event)&quot;
	@edit=&quot;handleEdit($event)&quot;
/&gt;
&lt;KtCommentInput
	allowInternal
	dataTest=&quot;comments&quot;
	placeholder=&quot;Add a comment&quot;
	:tabIndex=&quot;1&quot;
	:userAvatar=&quot;currentUser.avatar&quot;
	@add=&quot;handleAdd($event)&quot;
/&gt;
</code></pre>

			<h2>Usage</h2>

			<h3>Comment Object</h3>
			<pre><code data-lang="js">{
	createdAt: '2018-12-04 09:57',
	id: 1,
	isDeletable: true,
	isEditable: true,
	isInternal: true,
	isModified: true,
	message: 'Comment message',
	replies: [
		{
			createdAt: '2018-12-04 09:57',
			id: 2,
			isDeletable: false,
			isEditable: false,
			isInternal: true,
			isModified: true,
			message: 'Reply message',
			user: {
				avatar: 'https://picsum.photos/200',
				id: 102,
				name: 'User name',
			},
		},
	],
	user: {
		avatar: 'https://picsum.photos/230',
		id: 101,
		name: 'User name',
	},
}</code></pre>

			<h3>Events</h3>
			<table>
				<tr>
					<th>Event Name</th>
					<th>Component</th>
					<th>Payload</th>
					<th>Description</th>
				</tr>
				<tr>
					<td><code>@add</code></td>
					<td><code>KtComment</code>, <code>KtCommentInput</code></td>
					<td>
						<pre><code data-lang="ts">{
	isInternal?: boolean,
	message: string,
	parentId?: number | string,
	replyToUserId?: number | string,
}</code></pre>
					</td>
					<td>Add new comment</td>
				</tr>
				<tr>
					<td><code>@delete</code></td>
					<td><code>KtComment</code></td>
					<td>
						<pre><code data-lang="ts">{
	id: number | string,
	parentId?: number | string,
}</code></pre>
					</td>
					<td>Delete comment</td>
				</tr>
				<tr>
					<td><code>@edit</code></td>
					<td><code>KtComment</code></td>
					<td>
						<pre><code data-lang="ts">{
	id: number | string,
	isInternal?: boolean,
	message: string,
	parentId?: number | string,
}</code></pre>
					</td>
					<td>Edit comment</td>
				</tr>
			</table>

			<h2>Parsing HTML</h2>
			<p>
				KtComment will escape all tags by default but you can opt out and pass
				your own parser by using the parser prop.
			</p>
			<blockquote cite="https://en.wikipedia.org/wiki/Cross-site_scripting">
				Remember to <b>escape malicious tags</b> to prevent
				<a href="https://en.wikipedia.org/wiki/Cross-site_scripting"
					>Cross-site-scripting</a
				>
				attacks, you can use KtComment's default parser function with
				KtComment.defaultParser.
			</blockquote>

			<pre><code data-lang="js">methods: {
	dangerouslyOverrideParser: msg => escape(msg).replace(/\n/g, '&lt;br /&gt;'),
	// alternativly you could
	dangerouslyOverrideParser: msg => escape(msg),
	postEscapeParser: msg => msg.replace(/\n/g, '&lt;br /&gt;'),
	// or just
	postEscapeParser: msg => msg.replace(/\n/g, '&lt;br /&gt;'),
}</code></pre>

			<div class="element-example no-background">
				<KtComment
					v-for="comment in comments"
					:key="comment.id"
					v-bind="comment"
					:allowInternal="settings.allowInternal"
					:forceInternal="settings.forceInternal"
					class="mb-block"
					:dangerouslyOverrideParser="dangerouslyOverrideParser"
					:dataTest="settings.dataTest"
					:isReadOnly="settings.isReadOnly"
					:postEscapeParser="postEscapeParser"
					:tabIndex="settings.tabIndex"
					:userAvatar="currentUser.avatar"
					@add="handleAdd($event)"
					@delete="handleDelete($event)"
					@edit="handleEdit($event)"
				/>
				<KtCommentInput
					:allowInternal="settings.allowInternal"
					:forceInternal="settings.forceInternal"
					:dataTest="settings.dataTest"
					:placeholder="settings.placeholder"
					:tabIndex="settings.tabIndex"
					:userAvatar="currentUser.avatar"
					@add="handleAdd($event)"
				/>
			</div>
		</KtI18nContext>
	</div>
</template>

<script lang="ts">
import type { Kotti } from '@3yourmind/kotti-ui'
import { KtComment } from '@3yourmind/kotti-ui'
import escape from 'lodash/escape.js'
import { defineComponent, ref } from 'vue'

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
				isInternal: true,
				message: `We miss you, David`,
				replies: [
					{
						createdAt: '2018-03-21 09:57',
						id: 2,
						isDeletable: false,
						isEditable: false,
						isInternal: true,
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
						isInternal: true,
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
						isInternal: true,
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
		const settings = ref<{
			allowInternal: Kotti.FieldToggle.Value
			forceInternal: Kotti.FieldToggle.Value
			dataTest: Kotti.FieldText.Value
			isReadOnly: Kotti.FieldToggle.Value
			locale: Kotti.I18n.SupportedLanguages
			placeholder: Kotti.FieldText.Value
			tabIndex: Kotti.FieldNumber.Value
		}>({
			allowInternal: true,
			forceInternal: false,
			dataTest: null,
			isReadOnly: false,
			locale: 'en-US',
			placeholder: 'Add a comment',
			tabIndex: null,
		})

		const buildNewComment = ({
			isInternal,
			message,
		}: {
			isInternal: Kotti.Comment.Props['isInternal']
			message: Kotti.Comment.Props['message']
		}): Kotti.Comment.Props => ({
			createdAt: new Date().toDateString(),
			// eslint-disable-next-line no-magic-numbers
			id: Math.floor(Math.random() * 101),
			isDeletable: true,
			isEditable: true,
			isInternal,
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
							isInternal: payload.isInternal,
							message: payload.message,
						}
					: comment

		return {
			comments,
			component: KtComment,
			currentUser,
			dangerouslyOverrideParser: (msg: string) => escape(msg),
			handleAdd(payload: Kotti.Comment.Events.Add) {
				if (!payload.parentId) {
					comments.value.push(
						buildNewComment({
							isInternal: payload.isInternal,
							message: payload.message,
						}),
					)
					return
				}

				const parentComment = comments.value.find(
					(comment) => comment.id === payload.parentId,
				)

				if (!parentComment)
					throw new Error(
						`Comment not found, comment id: ${String(payload.parentId)}`,
					)

				parentComment.replies.push(
					buildNewComment({
						isInternal: payload.isInternal,
						message: payload.message,
					}),
				)
			},
			handleEdit(payload: Kotti.Comment.Events.Edit) {
				if (!payload.parentId) {
					if (!comments.value.some((comment) => comment.id === payload.id))
						throw new Error(`Comment not found, comment id: ${payload.id}`)

					comments.value = comments.value.map(editComment(payload))
					return
				}

				const parentComment = comments.value.find(
					(comment) => comment.id === payload.parentId,
				)

				if (!parentComment)
					throw new Error(
						`Comment not found, comment id: ${String(payload.parentId)}`,
					)

				if (!parentComment.replies.some((reply) => reply.id === payload.id))
					throw new Error(
						`Comment not found, comment id: ${String(payload.id)}`,
					)

				parentComment.replies = parentComment.replies.map(editComment(payload))
			},
			handleDelete(payload: Kotti.Comment.Events.Delete) {
				if (!payload.parentId) {
					if (!comments.value.some((comment) => comment.id === payload.id))
						throw new Error(
							`Comment not found, comment id: ${String(payload.id)}`,
						)

					comments.value = comments.value.filter(
						(comment) => comment.id !== payload.id,
					)
					return
				}

				const parentComment = comments.value.find(
					(comment) => comment.id === payload.parentId,
				)

				if (!parentComment)
					throw new Error(
						`Comment not found, comment id: ${String(payload.parentId)}`,
					)

				if (!parentComment.replies.some((reply) => reply.id === payload.id))
					throw new Error(
						`Comment not found, comment id: ${String(payload.id)}`,
					)

				parentComment.replies = parentComment.replies.filter(
					(reply) => reply.id !== payload.id,
				)
			},
			postEscapeParser: (msg: string) => msg.replaceAll('\n', '</br>'),
			settings,
		}
	},
})
</script>

<style lang="scss" scoped>
.no-background {
	background: unset;
}
</style>
