<template>
	<div :class="classes">
		<CommentEntry
			v-bind="commentProps"
			:type="EntryType.POST"
			@delete="onDelete"
			@edit="onEdit"
			@reply="onReply"
		/>
		<div class="kt-comment__thread">
			<CommentEntry
				v-for="reply in replies"
				:key="reply.id"
				v-bind="reply"
				:dangerouslyOverrideParser="dangerouslyOverrideParser"
				:parentId="id"
				:postEscapeParser="postEscapeParser"
				:type="EntryType.REPLY"
				@delete="onDelete"
				@edit="onEdit"
			/>
			<KtCommentInput
				v-if="userToReply"
				isInline
				:parentId="id"
				:placeholder="placeholder"
				:replyToUserId="userToReply.id"
				:userAvatar="user.avatar"
				@add="onAdd"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import { omit } from 'lodash'

import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'

import CommentEntry from './components/CommentEntry.vue'
import KtCommentInput from './KtCommentInput.vue'
import { KottiComment } from './types'

export default defineComponent<KottiComment.PropsInternal>({
	name: 'KtComment',
	components: {
		CommentEntry,
		KtCommentInput,
	},
	props: makeProps(KottiComment.propsSchema),
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtComment')

		const userToReply = ref<KottiComment.User | null>(null)

		return {
			classes: computed(() => ({
				'kt-comment': true,
				'kt-comment--is-internal-thread': props.isInternalThread,
			})),
			commentProps: computed(() => omit(props, 'replies')),
			EntryType: KottiComment.EntryType,
			onAdd: (payload: KottiComment.Events.Add) => {
				userToReply.value = null
				emit('add', payload)
			},
			onDelete: (payload: KottiComment.Events.Delete) =>
				emit('delete', payload),
			onEdit: (payload: KottiComment.Events.Edit) => emit('edit', payload),
			onReply: (user: KottiComment.User) => (userToReply.value = user),
			placeholder: computed(() =>
				userToReply.value
					? [translations.value.replyToLabel, userToReply.value.name].join(' ')
					: undefined,
			),
			userToReply,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment {
	padding: var(--unit-4);

	&--is-internal-thread {
		background-color: var(--ui-01);
	}

	&__thread {
		display: flex;
		flex-direction: column;
		row-gap: var(--unit-4);
		padding: var(--unit-4) 0 0 var(--unit-10);
	}
}
</style>
