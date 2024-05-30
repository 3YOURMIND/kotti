<template>
	<ItemLayout
		class="pre-uploaded-item"
		:isInternal="fileInfo.isInternal"
		:name="fileInfo.name"
	>
		<template #description>
			<i v-if="isInvalid" class="yoco" v-text="Yoco.Icon.CIRCLE_ATTENTION" />
			{{ description }}
		</template>
		<template #actions>
			<ActionButton
				v-if="showViewOrDownloadAction"
				:data-test="
					dataTest
						? `${dataTest}.${fileInfo.id}.viewOrDownloadButton`
						: undefined
				"
				:icon="viewOrDownloadActionIcon"
				:isDisabled="isDisabled"
				@click="onClickViewOrDownload"
			/>
			<ActionButton
				:data-test="
					dataTest ? `${dataTest}.${fileInfo.id}.deleteButton` : undefined
				"
				:icon="Yoco.Icon.TRASH"
				:isDisabled="isDisabled"
				@click="onClickDelete"
			/>
		</template>
	</ItemLayout>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from 'vue'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { formatFileSize } from '../formatters'
import { KottiFieldFileUpload, Shared } from '../types'

import ActionButton from './ActionButton.vue'
import ItemLayout from './ItemLayout.vue'

export default defineComponent({
	name: 'PreUploadedFileItem',
	components: {
		ActionButton,
		ItemLayout,
	},
	props: makeProps(KottiFieldFileUpload.FileItem.schema),
	emits: ['remove'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const errorMessage = computed(() =>
			props.fileInfo.validation !== Shared.Validation.SUCCESS
				? translations.value.validationMsg[props.fileInfo.validation]
				: null,
		)

		return {
			description: computed(() =>
				[formatFileSize(props.fileInfo.size), errorMessage.value]
					.filter(Boolean)
					.join(' - '),
			),
			isInvalid: computed(
				() => props.fileInfo.validation !== Shared.Validation.SUCCESS,
			),
			onClickDelete: () => {
				if (props.isDisabled) return

				const payload: Shared.Events.RemoveFile = props.fileInfo.id
				emit('remove', payload)
			},
			onClickViewOrDownload: () => {
				if (props.isDisabled) return

				window.open(
					props.fileInfo.viewUrl ?? props.fileInfo.downloadUrl,
					'_blank',
				)
			},
			showViewOrDownloadAction: computed(
				() =>
					Boolean(props.fileInfo.viewUrl) ||
					Boolean(props.fileInfo.downloadUrl),
			),
			viewOrDownloadActionIcon: computed<Yoco.Icon>(() =>
				props.fileInfo.viewUrl ? Yoco.Icon.EYE : Yoco.Icon.DOWNLOAD,
			),
			Yoco,
		}
	},
})
</script>

<style lang="scss" scoped>
.pre-uploaded-item {
	background-color: var(--ui-01);
}
</style>
