<template>
	<div v-if="!isEditing" class="kt-comment__actions">
		<KtButton
			v-if="userData !== null"
			class="kt-comment__actions__reply-button"
			:label="translations.replyButton"
			type="text"
			@click.stop="onReply"
		/>
		<KtButton
			v-if="isEditable"
			class="kt-comment__actions__edit-button"
			:label="translations.editButton"
			type="text"
			@click.stop="onEdit"
		/>
		<KtButton
			v-if="isDeletable"
			class="kt-comment__actions__delete-button"
			:label="translations.deleteButton"
			type="text"
			@click.stop="onDelete"
		/>
	</div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { KottiComment } from '../types'

export default defineComponent<KottiComment.Actions.PropsInternal>({
	name: 'CommentActions',
	props: makeProps(KottiComment.Actions.schema),
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtComment')

		return {
			onDelete: () => emit('delete'),
			onEdit: () => emit('update:isEditing', true),
			onReply: () => emit('reply', props.userData),
			translations,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-comment__actions {
	display: flex;
	margin: 0.2rem 0;
}
</style>
