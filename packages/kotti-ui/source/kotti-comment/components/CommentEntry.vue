<template>
	<div class="kt-comment-entry">
		<KtAvatar size="sm" :src="user.avatar" />
		<div class="kt-comment-entry__wrapper">
			<CommentHeader
				v-bind="{ createdAt, isInternal, isModified, isReply, user }"
			/>
			<CommentInlineEdit
				v-bind="{
					allowInternal,
					dangerouslyOverrideParser,
					dataTest,
					id,
					isEditing,
					isInternal,
					isReply,
					message,
					parentId,
					postEscapeParser,
					tabIndex,
				}"
				@edit="onEdit"
				@update:isEditing="isEditing = $event"
			/>
			<CommentActions
				v-if="!isReadOnly && !isEditing"
				v-bind="{ dataTest, isDeletable, isEditable, isReply, tabIndex }"
				@delete="onDelete"
				@reply="onReply"
				@update:isEditing="isEditing = $event"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'
import pick from 'lodash/pick'

import { makeProps } from '../../make-props'
import { KottiComment } from '../types'

import CommentActions from './CommentActions.vue'
import CommentHeader from './CommentHeader.vue'
import CommentInlineEdit from './CommentInlineEdit.vue'

export default defineComponent({
	name: 'CommentEntry',
	components: {
		CommentActions,
		CommentHeader,
		CommentInlineEdit,
	},
	props: makeProps(KottiComment.Entry.schema),
	setup(props: KottiComment.Entry.PropsInternal, { emit }) {
		const isEditing = ref(false)

		return {
			isEditing,
			onDelete: () => {
				const payload: KottiComment.Events.Delete = pick(props, [
					'id',
					'parentId',
				])
				emit('delete', payload)
			},
			onEdit: (payload: KottiComment.Events.Edit) => emit('edit', payload),
			onReply: () => emit('reply', props.user),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment-entry {
	display: flex;
	column-gap: var(--unit-2);

	&__wrapper {
		display: flex;
		flex-direction: column;
		row-gap: var(--unit-1);
		width: 100%;
	}
}
</style>
