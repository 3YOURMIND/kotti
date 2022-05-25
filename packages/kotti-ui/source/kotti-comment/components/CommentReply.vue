<template>
	<div class="comment-reply">
		<KtAvatar class="comment-reply__avatar" size="sm" :src="userAvatar" />
		<div class="comment-reply__content">
			<div class="comment-reply__content__info">
				<div class="info__name" v-text="userName" />
				<div class="info__time" v-text="createdTime" />
			</div>

			<div v-if="!isInlineEdit" class="comment-reply__content__message">
				<!-- eslint-disable vue/no-v-html -->
				<span
					v-html="postEscapeParser(dangerouslyOverrideParser(inlineMessage))"
				/>
				<!-- eslint-enable vue/no-v-html -->
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

			<CommentActions
				:options="actionOptions"
				:userData="{ userId, userName }"
				@replyClick="($event) => $emit('replyClick', $event)"
			/>
		</div>
	</div>
</template>

<script>
import escape from 'lodash/escape'

import CommentActions from './CommentActions.vue'

export default {
	name: 'CommentReply',
	components: {
		CommentActions,
	},
	props: {
		createdTime: String,
		dangerouslyOverrideParser: { default: escape, type: Function },
		isDeletable: { default: false, type: Boolean },
		isEditable: { default: false, type: Boolean },
		id: [Number, String],
		message: String,
		parser: { default: escape, type: Function },
		postEscapeParser: { default: (_) => _, type: Function },
		userAvatar: String,
		userId: [Number, String],
		userName: String,
	},
	data() {
		return {
			inlineMessageValue: '',
			isInlineEdit: false,
		}
	},
	computed: {
		inlineMessage() {
			return this.inlineMessageValue || this.message
		},
		actionOptions() {
			const options = []
			if (this.isEditable)
				options.push({
					label: 'Edit',
					onClick: () => {
						this.inlineMessageValue = this.inlineMessage
						this.isInlineEdit = true
					},
				})
			if (this.isDeletable)
				options.push({
					label: 'Delete',
					onClick: () => this.$emit('_inlineDeleteClick', this.id),
				})
			return options
		},
	},
	methods: {
		cancelInlineEdit() {
			this.inlineMessageValue = ''
			this.isInlineEdit = false
		},
		handleInlineInput(event) {
			this.inlineMessageValue = event.target.value
		},
		handleConfirm() {
			this.isInlineEdit = false
			if (!this.inlineMessageValue) return
			this.$emit('_inlineEditSubmit', {
				message: this.inlineMessageValue,
				id: this.id,
			})
		},
	},
}
</script>
<style lang="scss" scoped>
.comment-reply {
	display: flex;
	padding: 0.2rem 0;

	&__content {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin-left: 0.4rem;

		&__info {
			display: flex;
			flex-direction: row;
			margin-bottom: 0.1rem;
			font-size: 0.7rem;
			line-height: 0.7rem;
		}

		&__message {
			display: flex;
			align-items: center;

			width: 100%;
			font-size: 0.65rem;
			line-height: 1rem;
			word-break: break-word;
		}
	}
}
</style>
