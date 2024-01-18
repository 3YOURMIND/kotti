<template>
	<ItemLayout :isInternal="fileInfo.isInternal" :name="fileInfo.name">
		<template #description>
			<i v-if="isError" class="yoco" v-text="Yoco.Icon.CIRCLE_ATTENTION" />
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
				:icon="deleteActionIcon"
				:isDisabled="isDisabled"
				@click="onClickDelete"
			/>
		</template>
	</ItemLayout>
</template>

<script lang="ts">
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { formatFileSize } from '../formatters'
import { KottiFieldFileUpload, Shared } from '../types'

import ActionButton from './ActionButton.vue'
import ItemLayout from './ItemLayout.vue'

export default defineComponent({
	name: 'FileItem',
	components: {
		ActionButton,
		ItemLayout,
	},
	props: makeProps(KottiFieldFileUpload.FileItem.schema),
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const status = computed(() => props.fileInfo.status)
		const statusText = computed(() =>
			props.fileInfo.validation === Shared.Validation.SUCCESS
				? translations.value.statusMsg[status.value]
				: translations.value.validationMsg[props.fileInfo.validation],
		)

		return {
			deleteActionIcon: computed<Yoco.Icon>(() =>
				[
					KottiFieldFileUpload.Status.UPLOADED,
					KottiFieldFileUpload.Status.READY_TO_UPLOAD,
				].includes(status.value)
					? Yoco.Icon.TRASH
					: Yoco.Icon.CLOSE,
			),
			description: computed(() =>
				[formatFileSize(props.fileInfo.size), statusText.value].join(' - '),
			),
			isError: computed(
				() => status.value === KottiFieldFileUpload.Status.INVALID,
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
					status.value === KottiFieldFileUpload.Status.UPLOADED &&
					(Boolean(props.fileInfo.viewUrl) ||
						Boolean(props.fileInfo.downloadUrl)),
			),
			viewOrDownloadActionIcon: computed<Yoco.Icon>(() =>
				props.fileInfo.viewUrl ? Yoco.Icon.EYE : Yoco.Icon.DOWNLOAD,
			),
			Yoco,
		}
	},
})
</script>
