<template>
	<div :class="containerClass">
		<div :class="wrapperClass">
			<KtAvatar
				v-if="!isInline"
				class="kt-comment-input__avatar"
				size="sm"
				:src="userAvatar"
			/>
			<textarea
				ref="textarea"
				v-model="text"
				class="kt-comment-input__textarea"
				:placeholder="placeholder"
				@blur="textFocused = false"
				@focus="textFocused = true"
				@input="updateHeight"
			/>
			<KtButton
				:disabled="!text"
				:label="replyButtonText"
				type="text"
				@click="handleSubmitClick"
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
				'kt-comment-input': true,
				'kt-comment-input--inline': props.isInline,
			})),
			handleSubmitClick: () => {
				if (text.value === null) return
				emit('submit', {
					message: text.value,
					replyToUserId: props.replyToUserId,
					parentId: props.parentId,
				})
				text.value = null
				if (textarea.value) textarea.value.style.height = '1.2rem'
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
				'kt-comment-input__wrapper': true,
				'kt-comment-input__wrapper--focus': textFocused.value,
				'kt-comment-input__wrapper--inline': props.isInline,
			})),
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment-input {
	box-sizing: border-box;
	display: flex;

	&--inline {
		margin: 0 0 var(--unit-1) 0;
	}

	&__wrapper {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100%;
		padding: var(--unit-2);
		background-color: var(--white);
		border: 1px solid #dbdbdb;
		border-radius: var(--border-radius);

		&--focus {
			border: 1px solid #bbb;
		}

		&--inline {
			padding: var(--unit-1);
		}
	}

	&__avatar {
		margin-right: var(--unit-1);
	}

	&__textarea {
		flex: 1 1;
		width: 100%;
		height: 1.2rem;
		padding: 0;
		margin: 0 0.2rem;
		resize: none;
		border: 0;

		&:focus {
			outline: none;
		}
	}

	.kt-button {
		cursor: pointer;
	}
}
</style>
