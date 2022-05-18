<template>
	<div class="comment-reply">
		<KtAvatar class="comment-reply__avatar" size="sm" :src="userAvatar" />
		<div class="comment-reply__content">
			<div class="comment-reply__content__info">
				<div class="info__name" v-text="userName" />
				<div class="info__time" v-text="createdTime" />
			</div>

			<CommentInlineEdit
				:id="id"
				:dangerouslyOverrideParser="dangerouslyOverrideParser"
				:isEditing="isEditing"
				:message="message"
				:postEscapeParser="postEscapeParser"
				@edit="($event) => $emit('edit', $event)"
				@update:isEditing="($event) => (isEditing = $event)"
			/>

			<CommentActions
				:options="actionOptions"
				:userData="{ userId, userName }"
				@replyClick="($event) => $emit('click', $event)"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import escape from 'lodash/escape'

import { Kotti } from '../../types'

import CommentActions from './CommentActions.vue'
import CommentInlineEdit from './CommentInlineEdit.vue'

export default defineComponent<Kotti.Comment.Reply.PropsInternal>({
	name: 'CommentReply',
	components: {
		CommentActions,
		CommentInlineEdit,
	},
	props: {
		createdTime: { default: () => null, type: String },
		dangerouslyOverrideParser: { default: escape, type: Function },
		isDeletable: { default: false, type: Boolean },
		isEditable: { default: false, type: Boolean },
		id: { default: () => null, type: [Number, String] },
		message: { type: String, required: true },
		parser: { default: escape, type: Function },
		postEscapeParser: { default: (_) => _, type: Function },
		userAvatar: { default: () => null, type: String },
		userId: { default: () => null, type: Number },
		userName: { default: () => null, type: String },
	},
	setup(props, { emit }) {
		const isEditing = ref<boolean>(false)

		return {
			actionOptions: computed(() => {
				const options = []
				if (props.isEditable)
					options.push({
						label: 'Edit',
						onClick: () => {
							isEditing.value = true
						},
					})
				if (props.isDeletable)
					options.push({
						label: 'Delete',
						onClick: () => emit('delete', props.id),
					})
				return options
			}),
			isEditing,
		}
	},
})
</script>

<style lang="scss" scoped>
.comment-reply {
	display: flex;
	padding: 0.2rem 0;

	&__content {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-left: 0.4rem;

		&__info {
			display: flex;
			flex-direction: row;
			margin-bottom: 0.1rem;
			font-size: 0.7rem;
			line-height: 0.7rem;
		}
	}
}
</style>
