<template>
	<div class="comment-reply">
		<KtAvatar small :src="src" class="comment-reply__avatar" />
		<div class="comment-reply__wrapper">
			<div class="comment-reply__info">
				<div class="comment-reply__name" v-text="name" />
				<div class="comment-reply__time" v-text="time" />
			</div>
			<div class="comment-reply__body">
				<div
					class="comment-reply__message"
					v-if="!isInlineEdit"
					@click="$emit('_inlineReplyClick', name)"
				>
					<span v-html="inlineMessage" /> <i class="yoco" v-text="'comment'" />
				</div>
				<div class="comment-inline-edit form-group" v-else>
					<textarea
						class="comment-inline-edit-input form-input"
						:value="inlineMessage"
						@change="handleInlineInput"
					></textarea>
					<KtButtonGroup class="comment-inline-edit-buttons" shadow>
						<KtButton icon="close" @click="isInlineEdit = false" />
						<KtButton icon="check" @click="handleConfirm" />
					</KtButtonGroup>
				</div>
				<div class="comment-reply__action action__more" v-if="!isInlineEdit">
					<i class="yoco">dots</i>
					<div class="action__options">
						<a @click="isInlineEdit = true"> <li>Edit</li> </a>
						<a @click="$emit('_inlineDeleteClick', uuid)"> <li>Delete</li> </a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import KtAvatar from '../../kotti-avatar'
import KtButton from '../../kotti-button'
import KtButtonGroup from '../../kotti-button-group'

export default {
	name: 'KtCommentReply',
	components: {
		KtAvatar,
		KtButton,
		KtButtonGroup,
	},
	props: {
		message: String,
		name: String,
		src: String,
		time: String,
		uuid: String,
	},
	data() {
		return {
			isInlineEdit: false,
			inlineMessageValue: '',
		}
	},
	computed: {
		inlineMessage() {
			return this.inlineMessageValue ? this.inlineMessageValue : this.message
		},
	},
	methods: {
		handleInlineInput(evt) {
			this.inlineMessageValue = evt.target.value
		},
		handleConfirm() {
			this.isInlineEdit = false
			if (!this.inlineMessageValue) return
			let _payload = {
				value: this.inlineMessageValue,
				uuid: this.uuid,
			}
			this.$emit('_inlineEditSumbit', _payload)
		},
	},
}
</script>
