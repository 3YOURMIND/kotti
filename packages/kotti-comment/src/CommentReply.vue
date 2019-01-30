<template>
	<div class="comment-reply">
		<KtAvatar small :src="userAvatar" class="comment-reply__avatar" />
		<div class="comment-reply__wrapper">
			<div class="comment-reply__info">
				<div class="comment-reply__name" v-text="userName" />
				<div class="comment-reply__time" v-text="createdTime" />
			</div>
			<div class="comment-reply__body">
				<div
					class="comment-reply__message"
					v-if="!isInlineEdit"
					@click="$emit('_inlineReplyClick', { userName, userId })"
				>
					<span
						v-html="
							postEscapeParser(dangerouslyOverrideParser(inlineMessage))
						"
					/>
					<i class="yoco" v-text="'comment'" />
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
				<div
					class="comment-reply__action action__more"
					v-if="!isInlineEdit & allowChange"
				>
					<i class="yoco">dots</i>
					<div class="action__options">
						<a @click="isInlineEdit = true"> <li>Edit</li> </a>
						<a @click="$emit('_inlineDeleteClick', id)"> <li>Delete</li> </a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import escape from 'lodash/escape'
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
		dangerouslyOverrideParser: { default: escape, type: Function },
		postEscapeParser: { default: _ => _, type: Function },
		parser: { default: escape, type: Function },
		createdTime: String,
		id: Number | String,
		message: String,
		userAvatar: String,
		userId: Number | String,
		userName: String,
		allowChange: Boolean,
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
		handleInlineInput(event) {
			this.inlineMessageValue = event.target.value
		},
		handleConfirm() {
			this.isInlineEdit = false
			if (!this.inlineMessageValue) return
			let _payload = {
				message: this.inlineMessageValue,
				id: this.id,
			}
			this.$emit('_inlineEditSumbit', _payload)
		},
	},
}
</script>
