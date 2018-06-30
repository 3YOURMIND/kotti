<template>
	<div class="comment-input">
		<div
			class="comment-input__wrapper"
			:class="{'comment-input__wrapper--focus' : textFocused}"
		>
			<div class="comment-input__quote" v-if="replyName">
				<div class="comment-quote__name">Reply to {{ replyName }}</div>
				<div class="comment-quote__close c-hand" @click="handleReplyClose">
					<i class="yoco">close</i>
				</div>
			</div>
			<div class="comment-input__reply">
				<KtAvatar class="comment-input__avatar" :src="src"/>
				<div class="comment-input__input">
					<textarea
						@focus="textFocused=true"
						@blur="textFocused=false"
						@input="updateHeight"
						ref="textarea"
					></textarea>
				</div>
				<div class="comment-input__button">
					<button
						class="text"
						@click="handlePostClick"
						v-text="'post'"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar'

export default {
	name: 'KtCommentInput',
	components: {
		KtAvatar,
	},
	props: {
		replyName: String,
		src: String,
	},
	data() {
		return {
			textFocused: false,
		}
	},
	methods: {
		updateHeight() {
			this.$refs.textarea.style.height = '1.3rem'
			const height = this.$refs.textarea.scrollHeight
			this.$refs.textarea.style.height = `${height}px`
		},
		handleReplyClose() {
			this.$emit('replyCloseClicked')
		},
		handlePostClick() {
			this.$emit('postClicked')
		},
	},
}
</script>
