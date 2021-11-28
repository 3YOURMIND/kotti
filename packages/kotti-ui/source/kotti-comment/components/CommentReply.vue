<template>
	<div class="comment-reply">
		<KtAvatar class="comment-reply__avatar" size="sm" :src="userAvatar" />
		<div class="comment-reply__wrapper">
			<div class="comment-reply__info">
				<div class="comment-reply__name" v-text="userName" />
				<div class="comment-reply__time" v-text="createdTime" />
			</div>
			<div class="comment-reply__body">
				<div
					v-if="!isEditing"
					class="comment-reply__message"
					@click="$emit('_inlineReplyClick', { userName, userId })"
				>
					<!-- eslint-disable vue/no-v-html -->
					<span
						v-html="postEscapeParser(dangerouslyOverrideParser(inlineMessage))"
					/>
					<!-- eslint-enable vue/no-v-html -->
					<i class="yoco" v-text="'comment'" />
				</div>
				<div v-else class="comment-inline-edit form-group">
					<textarea
						v-model="inlineMessageValue"
						class="comment-inline-edit-input form-input"
					></textarea>
					<KtButtonGroup class="comment-inline-edit-buttons">
						<KtButton icon="close" @click="cancelInlineEdit" />
						<KtButton icon="check" @click="handleConfirm" />
					</KtButtonGroup>
				</div>
				<div
					v-if="!isEditing & (actionOptions.length > 0)"
					class="comment-reply__action action__more"
				>
					<i class="yoco">dots</i>
					<div class="action__options">
						<a
							v-for="(option, index) in actionOptions"
							:key="index"
							@click="option.onClick"
						>
							<li v-text="option.label" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'
import compact from 'lodash/compact'
import { z } from 'zod'

import { KtAvatar } from '../../kotti-avatar'
import { KtButton } from '../../kotti-button'
import { KtButtonGroup } from '../../kotti-button-group'
import { makeProps } from '../../make-props'
import { KottiComment } from '../types'

namespace CommentReply {
	export const propsSchema = KottiComment.propsSchema.omit({ replies: true })
	export type PropsInternal = z.output<typeof propsSchema>
}

export default defineComponent<CommentReply.PropsInternal>({
	name: 'CommentReply',
	components: {
		KtAvatar,
		KtButton,
		KtButtonGroup,
	},
	props: makeProps(CommentReply.propsSchema),
	setup(props, { emit }) {
		const inlineMessageValue = ref<string | null>(null)
		const isEditing = ref(false)

		const inlineMessage = computed(
			() => inlineMessageValue.value ?? props.message,
		)
		return {
			actionOptions: computed(() =>
				compact([
					props.isEditable
						? {
								label: 'Edit',
								onClick: () => {
									inlineMessageValue.value = inlineMessage.value
									isEditing.value = true
								},
						  }
						: null,
					props.isDeletable
						? {
								label: 'Delete',
								onClick: () => emit('_inlineDeleteClick', props.id),
						  }
						: null,
				]),
			),
			cancelInlineEdit: () => {
				inlineMessageValue.value = null
				isEditing.value = false
			},
			handleConfirm: () => {
				isEditing.value = false
				if (inlineMessageValue.value === null) return
				emit('_inlineEditSubmit', {
					id: props.id,
					message: inlineMessageValue.value,
				})
			},
			inlineMessage,
			inlineMessageValue,
			isEditing,
		}
	},
})
</script>
<style lang="scss" scoped>
.comment-reply__message {
	display: flex;
	align-items: center;
}
</style>
