<template>
	<div :class="classes">
		<CommentEntry
			v-bind="commentProps"
			@delete="onDelete"
			@edit="onEdit"
			@reply="onReply"
		/>
		<div v-if="showCommentThread" class="kt-comment__thread">
			<CommentEntry
				v-for="reply in replies"
				:key="reply.id"
				v-bind="{
					...reply,
					dangerouslyOverrideParser,
					isReadOnly,
					postEscapeParser,
					tabIndex,
				}"
				:dataTest="`${rootDataTest}.reply.${reply.id}`"
				isReply
				:parentId="id"
				@delete="onDelete"
				@edit="onEdit"
			/>
			<KtCommentInput
				v-if="userToReply"
				v-bind="{ isInternal, placeholder, tabIndex, userAvatar }"
				autofocus
				:dataTest="rootDataTest"
				isReply
				:parentId="id"
				:replyToUserId="userToReply.id"
				@add="onAdd"
				@cancel="onCancel"
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

export default defineComponent({
	name: 'KtComment',
	components: {
		CommentEntry,
		KtCommentInput,
	},
	props: makeProps(KottiComment.propsSchema),
	setup(props: KottiComment.PropsInternal, { emit }) {
		const translations = useTranslationNamespace('KtComment')

		const userToReply = ref<KottiComment.User | null>(null)

		const rootDataTest = computed(() =>
			props.dataTest
				? `${props.dataTest}.comment.${props.id}`
				: `comment.${props.id}`,
		)

		return {
			classes: computed(() => ({
				'kt-comment': true,
				'kt-comment--is-internal': props.isInternal,
			})),
			commentProps: computed<KottiComment.Entry.PropsInternal>(() => ({
				...omit(props, 'replies'),
				dataTest: rootDataTest.value,
				isReply: false,
			})),
			onAdd: (payload: KottiComment.Events.Add) => {
				userToReply.value = null
				emit('add', payload)
			},
			onCancel: () => (userToReply.value = null),
			onDelete: (payload: KottiComment.Events.Delete) =>
				emit('delete', payload),
			onEdit: (payload: KottiComment.Events.Edit) => emit('edit', payload),
			onReply: (user: KottiComment.User) => (userToReply.value = user),
			placeholder: computed(() =>
				userToReply.value
					? [translations.value.replyToLabel, userToReply.value.name].join(' ')
					: undefined,
			),
			rootDataTest,
			showCommentThread: computed(
				() => props.replies.length > 0 || userToReply.value !== null,
			),
			userToReply,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment {
	padding: var(--unit-4);

	&--is-internal {
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
