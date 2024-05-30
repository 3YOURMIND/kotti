<template>
	<div class="kt-comment__actions">
		<KtButton
			v-if="!isReply"
			class="kt-comment__actions__reply-button"
			:data-test="`${dataTest}.reply-button`"
			:label="translations.replyButton"
			:tabIndex="tabIndex"
			type="text"
			@click.stop="onReply"
		/>
		<KtButton
			v-if="isEditable"
			class="kt-comment__actions__edit-button"
			:data-test="`${dataTest}.edit-button`"
			:label="translations.editButton"
			:tabIndex="tabIndex"
			type="text"
			@click.stop="onEdit"
		/>
		<KtButton
			v-if="isDeletable"
			class="kt-comment__actions__delete-button"
			:data-test="`${dataTest}.delete-button`"
			:label="translations.deleteButton"
			:tabIndex="tabIndex"
			type="text"
			@click.stop="onDelete"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { KottiComment } from '../types'

export default defineComponent({
	name: 'CommentActions',
	props: makeProps(KottiComment.Actions.schema),
	emits: ['delete', 'reply', 'update:isEditing'],
	setup(_, { emit }) {
		const translations = useTranslationNamespace('KtComment')

		return {
			onDelete: () => {
				emit('delete')
			},
			onEdit: () => {
				emit('update:isEditing', true)
			},
			onReply: () => {
				emit('reply')
			},
			translations,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment__actions {
	display: flex;
}
</style>
