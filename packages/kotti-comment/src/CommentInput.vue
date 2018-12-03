<template>
	<div :class="divClass('comment-input')">
		<div :class="warpperClass">
			<KtAvatar class="comment-input__avatar" small :src="src" />
			<textarea
				class="comment-input__textarea"
				@focus="textFocused = true"
				@blur="textFocused = false"
				@input="updateHeight"
				v-model="text"
				:placeholder="placeholder"
				ref="textarea"
			></textarea>
			<KtButton
				:style="{ opacity: text ? 1 : '0.24' }"
				type="text"
				v-text="replyButtonText"
				@click="handlePostClick"
			/>
		</div>
	</div>
</template>

<script>
import KtButton from '../../kotti-button'
import KtAvatar from '../../kotti-avatar'

export default {
	name: 'KtCommentInput',
	components: {
		KtAvatar,
		KtButton,
	},
	props: {
		replyName: String,
		src: String,
		parentId: { type: String, default: null },
		placeholder: String,
		isInline: { type: Boolean, default: false },
	},
	data() {
		return {
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
		handleReplyClose() {
			this.$emit('replyCloseClicked')
		},
		handlePostClick() {
			if (!this.text) {
				return
			}
			let _payload = {
				message: this.text,
				replyToId: this.replyToId,
				parentId: this.parentId,
			}
			this.$emit('postClick', _payload)
			_payload = {}
		},
		divClass(divName) {
			return this.isInline ? `${divName} ${divName}--inline` : divName
		},
	},
}
</script>
