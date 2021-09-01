<template>
	<div :class="divClass('comment-input')">
		<div :class="warpperClass">
			<KtAvatar
				v-if="!isInline"
				class="comment-input__avatar"
				:size="Kotti.Avatar.Size.SMALL"
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
				:style="{ opacity: text ? 1 : '0.24' }"
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
import { Kotti } from '../types'

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
			Kotti,
			textFocused: false,
			text: null,
		}
	},
	computed: {
		replyButtonText() {
			return this.isInline ? 'Reply' : 'Post'
		},
		warpperClass() {
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
			if (!this.text && this.text === '\n') {
				return
			}
			let _payload = {
				message: this.text,
				replyToUserId: this.replyToUserId,
				parentId: this.parentId,
			}
			this.$emit('submit', _payload)
			// Reset all the state
			_payload = {}
			this.text = null
			this.$refs.textarea.style.height = '1.2rem'
		},
		divClass(divName) {
			return this.isInline ? `${divName} ${divName}--inline` : divName
		},
	},
}
</script>
