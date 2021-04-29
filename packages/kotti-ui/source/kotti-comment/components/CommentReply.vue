<template>
	<div class="comment-reply">
		<KtAvatar class="comment-reply__avatar" isSmall :src="userAvatar" />
		<div class="comment-reply__wrapper">
			<div class="comment-reply__info">
				<div class="comment-reply__name" v-text="userName" />
				<div class="comment-reply__time" v-text="createdTime" />
			</div>
			<div class="comment-reply__body">
				<div
					v-if="!isInlineEdit"
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
					<KtButtonGroup class="comment-inline-edit-buttons" shadow>
						<KtButton icon="close" @click="cancelInlineEdit" />
						<KtButton icon="check" @click="handleConfirm" />
					</KtButtonGroup>
				</div>
				<div
					v-if="!isInlineEdit & allowChange"
					class="comment-reply__action action__more"
				>
					<i class="yoco">dots</i>
					<div class="action__options">
						<a @click="startInlineEdit"> <li>Edit</li> </a>
						<a @click="$emit('_inlineDeleteClick', id)"> <li>Delete</li> </a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import escape from 'lodash/escape'

import { KtAvatar } from '../../kotti-avatar'
import { KtButton } from '../../kotti-button'
import { KtButtonGroup } from '../../kotti-button-group'

export default {
	name: 'CommentReply',
	components: {
		KtAvatar,
		KtButton,
		KtButtonGroup,
	},
	props: {
		dangerouslyOverrideParser: { default: escape, type: Function },
		postEscapeParser: { default: (_) => _, type: Function },
		parser: { default: escape, type: Function },
		createdTime: String,
		id: [Number, String],
		message: String,
		userAvatar: String,
		userId: [Number, String],
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
			return this.inlineMessageValue || this.message
		},
	},
	methods: {
		cancelInlineEdit() {
			this.inlineMessageValue = ''
			this.isInlineEdit = false
		},
		startInlineEdit() {
			this.inlineMessageValue = this.inlineMessage
			this.isInlineEdit = true
		},
		handleInlineInput(event) {
			this.inlineMessageValue = event.target.value
		},
		handleConfirm() {
			this.isInlineEdit = false
			if (!this.inlineMessageValue) return
			const _payload = {
				message: this.inlineMessageValue,
				id: this.id,
			}
			this.$emit('_inlineEditSumbit', _payload)
		},
	},
}
</script>
