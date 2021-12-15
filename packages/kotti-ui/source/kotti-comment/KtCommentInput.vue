<template>
	<div :class="containerClass">
		<div :class="wrapperClass">
			<KtAvatar
				v-if="!isInline"
				class="comment-input__avatar"
				size="sm"
				:src="userAvatar"
			/>
			<textarea
				ref="textarea"
				v-model="text"
				class="comment-input__textarea"
				:placeholder="placeholder"
				@blur="textFocused = false"
				@focus="textFocused = true"
				@input="updateHeight"
			></textarea>
			<KtButton
				:disabled="!text"
				type="text"
				@click="handleSubmitClick"
				v-text="replyButtonText"
			/>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from '@vue/composition-api'

import { KtAvatar } from '../kotti-avatar'
import { KtButton } from '../kotti-button'
import { useTranslationNamespace } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'

import { KottiCommentInput } from './types'

export default defineComponent<KottiCommentInput.PropsInternal>({
	name: 'KtCommentInput',
	components: {
		KtAvatar,
		KtButton,
	},
	props: makeProps(KottiCommentInput.propsSchema),
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtComment')

		const text = ref<string | null>(null)
		const textarea = ref<HTMLElement | null>(null)
		const textFocused = ref(false)
		return {
			containerClass: computed(() => ({
				'comment-input': true,
				'comment-input--inline': props.isInline,
			})),
			handleSubmitClick: () => {
				if (text.value === null) return
				emit('submit', {
					message: text.value,
					replyToUserId: props.replyToUserId,
					parentId: props.parentId ?? null,
				})
				text.value = null
				if (textarea.value !== null) textarea.value.style.height = '1.2rem'
			},
			replyButtonText: computed(() =>
				props.isInline
					? translations.value.replyButton
					: translations.value.postButton,
			),
			text,
			textarea,
			textFocused,
			updateHeight: () => {
				if (textarea.value === null) return '1.2rem'
				const height = textarea.value.scrollHeight
				textarea.value.style.height = `${height}px`
			},

			wrapperClass: computed(() => ({
				'comment-input__wrapper': true,
				'comment-input__wrapper--focus': textFocused.value,
				'comment-input__wrapper--inline': props.isInline,
			})),
		}
	},
})
</script>
