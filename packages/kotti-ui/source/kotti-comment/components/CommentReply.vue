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

import { KtAvatar } from '../../kotti-avatar'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { Kotti } from '../../types'

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
		parser: { default: escape, type: Function },
		postEscapeParser: { default: (_) => _, type: Function },
		userAvatar: { default: () => null, type: String },
		userId: { default: () => null, type: Number },
		userName: { default: () => null, type: String },
	},
	setup(props, { emit }) {
		const isEditing = ref<boolean>(false)
		const translations = useTranslationNamespace('KtComment')

		return {
			actionOptions: computed(() => {
				const options = []
				if (props.isEditable)
					options.push({
						label: translations.value.editButton,
						onClick: () => (isEditing.value = true),
					})
				if (props.isDeletable)
					options.push({
						label: translations.value.deleteButton,
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
