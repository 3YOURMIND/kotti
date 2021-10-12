<template>
	<div :class="divClass">
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

<script>
import { KtAvatar } from '../kotti-avatar'
import { KtButton } from '../kotti-button'

export default {
	name: 'KtCommentInput',
	components: {
		KtAvatar,
		KtButton,
	},
	props: {
		isInline: { type: Boolean, default: false },
		parentId: [Number, String],
		placeholder: String,
		replyToUserId: [Number, String],
		userAvatar: String,
	},
	data() {
		return {
			textFocused: false,
			text: null,
		}
	},
	computed: {
		divClass() {
			return {
				'comment-input': true,
				'comment-input--inline': this.isInline,
			}
		},
		replyButtonText() {
			return this.isInline ? 'Reply' : 'Post'
		},
		wrapperClass() {
			return {
				'comment-input__wrapper': true,
				'comment-input__wrapper--focus': this.textFocused,
				'comment-input__wrapper--inline': this.isInline,
			}
		},
	},
	methods: {
		updateHeight() {
			this.$refs.textarea.style.height = '1.2rem'
			const height = this.$refs.textarea.scrollHeight
			this.$refs.textarea.style.height = `${height}px`
		},
		handleSubmitClick() {
			this.$emit('submit', {
				message: this.text,
				replyToUserId: this.replyToUserId,
				parentId: this.parentId,
			})
			// Reset all the state
			this.text = null
			this.$refs.textarea.style.height = '1.2rem'
		},
	},
}
</script>
