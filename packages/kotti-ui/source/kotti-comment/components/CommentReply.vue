<template>
	<div class="comment-reply">
		<KtAvatar class="comment-reply__avatar" size="sm" :src="userAvatar" />
		<div class="comment-reply__content">
			<CommentHeader v-bind="{ createdTime, userName }" />

			<CommentInlineEdit
				:id="id"
				:dangerouslyOverrideParser="dangerouslyOverrideParser"
				:isEditing="isEditing"
				:message="message"
				:postEscapeParser="postEscapeParser"
				@edit="$emit('edit', $event)"
				@update:isEditing="isEditing = $event"
			/>

			<CommentActions
				v-bind="{ isEditable, isDeletable, isEditing }"
				@delete="$emit('delete', id)"
				@update:isEditing="isEditing = $event"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import escape from 'lodash/escape'
import { defineComponent, ref } from 'vue'

import { KtAvatar } from '../../kotti-avatar'
import { Kotti } from '../../types'
import { defaultParser, defaultPostEscapeParser } from '../utilities'

import CommentActions from './CommentActions.vue'
import CommentHeader from './CommentHeader.vue'
import CommentInlineEdit from './CommentInlineEdit.vue'

export default defineComponent<Kotti.Comment.Reply.PropsInternal>({
	name: 'CommentReply',
	components: {
		CommentActions,
		CommentHeader,
		CommentInlineEdit,
		KtAvatar,
	},
	props: {
		createdTime: { default: () => null, type: String },
		dangerouslyOverrideParser: { default: escape, type: Function },
		isDeletable: { default: false, type: Boolean },
		isEditable: { default: false, type: Boolean },
		id: { default: () => null, type: [Number, String] },
		message: { type: String, required: true },
		parser: { default: defaultParser, type: Function },
		postEscapeParser: { default: defaultPostEscapeParser, type: Function },
		userAvatar: { default: () => null, type: String },
		userId: { default: () => null, type: Number },
		userName: { default: () => null, type: String },
	},
	setup() {
		return {
			isEditing: ref<boolean>(false),
		}
	},
})
</script>

<style lang="scss" scoped>
.comment-reply {
	display: flex;
	padding: var(--unit-1) 0;

	&__content {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-left: var(--unit-2);

		&__info {
			display: flex;
			flex-direction: row;
			margin-bottom: var(--unit-h);
			font-size: calc(var(--unit-3) + var(--unit-h));
			line-height: calc(var(--unit-3) + var(--unit-h));
		}
	}
}
</style>
