<template>
	<div class="comment-reply">
		<KtAvatar class="comment-reply__avatar" size="sm" :src="userAvatar" />
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
					<KtButtonGroup class="comment-inline-edit-buttons">
						<KtButton icon="close" @click="cancelInlineEdit" />
						<KtButton icon="check" @click="handleConfirm" />
					</KtButtonGroup>
				</div>
				<div
					v-if="!isInlineEdit & (actionOptions.length > 0)"
					class="comment-reply__action action__more"
				>
					<i class="yoco">dots</i>
					<div class="action__options">
						<a
							v-for="(option, index) in actionOptions"
							:key="index"
							@click="option.onClick"
						>
							<li v-text="option.label" />
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { KtAvatar } from '../../kotti-avatar'
import { KtButton } from '../../kotti-button'
import { KtButtonGroup } from '../../kotti-button-group'
import { makeProps } from '../../make-props'
import { KottiComment } from '../types'

const propsSchema = KottiComment.propsSchema.omit({ replies: true })

export default {
	name: 'CommentReply',
	components: {
		KtAvatar,
		KtButton,
		KtButtonGroup,
	},
	props: makeProps(propsSchema),
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
.comment-reply__message {
	display: flex;
	align-items: center;
}
</style>
