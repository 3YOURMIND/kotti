<template>
	<div class="kt-comment__entry">
		<KtAvatar size="sm" :src="user.avatar" />
		<div class="kt-comment__entry__wrapper">
			<CommentHeader v-bind="headerProps" />
			<CommentInlineEdit
				v-bind="{
					dangerouslyOverrideParser,
					id,
					isEditing,
					message,
					parentId,
					postEscapeParser,
				}"
				@edit="onEdit"
				@update:isEditing="isEditing = $event"
			/>
			<CommentActions
				v-if="!isEditing"
				v-bind="{ isDeletable, isEditable, showReply }"
				@delete="onDelete"
				@reply="onReply"
				@update:isEditing="isEditing = $event"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { pick } from 'lodash'

import { makeProps } from '../../make-props'
import { KottiComment } from '../types'

import CommentActions from './CommentActions.vue'
import CommentHeader from './CommentHeader.vue'
import CommentInlineEdit from './CommentInlineEdit.vue'

export default defineComponent<KottiComment.Entry.PropsInternal>({
	name: 'CommentEntry',
	components: {
		CommentActions,
		CommentHeader,
		CommentInlineEdit,
	},
	props: makeProps(KottiComment.Entry.schema),
	setup(props, { emit }) {
		const isEditing = ref(false)

		const isReply = computed(() => props.type === KottiComment.EntryType.REPLY)

		return {
			headerProps: computed(() => ({
				...pick(props, ['createdAt', 'isModified', 'user']),
				isInternalThread: !isReply.value ? props.isInternalThread : false,
			})),
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
			showReply: computed(() => !isReply.value),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment__entry {
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
