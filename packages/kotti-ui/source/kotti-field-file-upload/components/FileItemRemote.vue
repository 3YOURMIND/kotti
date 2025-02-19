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
				v-if="showRetryAction"
				:data-test="
					dataTest ? `${dataTest}.${fileInfo.id}.retryButton` : undefined
				"
				:icon="Yoco.Icon.RELOAD"
				:isDisabled="isDisabled"
				@click="onClickRetry"
			/>
			<ActionButton
				:data-test="
					dataTest
						? `${dataTest}.${fileInfo.id}.cancelOrDeleteButton`
						: undefined
				"
				:icon="cancelOrDeleteActionIcon"
				:isDisabled="isDisabled"
				@click="onClickCancelOrDelete"
			/>
		</template>
		<template #footer>
			<ProgressBar
				v-if="showProgressBar"
				:key="progressBarForceRenderKey"
				:isError="isError"
				:progress="progress"
			/>
		</template>
	</ItemLayout>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { formatFileSize } from '../formatters'
import { KottiFieldFileUploadRemote, Shared } from '../types'

import ActionButton from './ActionButton.vue'
import ItemLayout from './ItemLayout.vue'
import ProgressBar from './ProgressBar.vue'

export default defineComponent({
	name: 'FileItemRemote',
	components: {
		ActionButton,
		ItemLayout,
		ProgressBar,
	},
	props: makeProps(KottiFieldFileUploadRemote.FileItem.schema),
	setup(props) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const progressBarForceRenderKey = ref<number>(0)
		const shouldTriggerRemoteUpload = ref<boolean>(true)

		const status = computed(() => props.fileInfo.status)
		const statusText = computed(() =>
			props.fileInfo.validation === Shared.Validation.SUCCESS
				? translations.value.statusMsg[status.value]
				: translations.value.validationMsg[props.fileInfo.validation],
		)

		watch(
			status,
			(newStatus) => {
				if (
					newStatus === KottiFieldFileUploadRemote.Status.UPLOADING &&
					shouldTriggerRemoteUpload.value
				) {
					props.actions.onUpload(props.fileInfo.id)
					shouldTriggerRemoteUpload.value = false
				}
			},
			{ flush: 'post', immediate: true },
		)

		return {
			cancelOrDeleteActionIcon: computed<Yoco.Icon>(() =>
				status.value === KottiFieldFileUploadRemote.Status.UPLOADED
					? Yoco.Icon.TRASH
					: Yoco.Icon.CLOSE,
			),
			description: computed(() =>
				[formatFileSize(props.fileInfo.size), statusText.value].join(' - '),
			),
			isError: computed(() =>
				[
					KottiFieldFileUploadRemote.Status.ERROR,
					KottiFieldFileUploadRemote.Status.INVALID,
					KottiFieldFileUploadRemote.Status.UPLOADED_WITH_ERROR,
				].includes(status.value as KottiFieldFileUploadRemote.Status),
			),
			onClickCancelOrDelete: () => {
				if (props.isDisabled) return

				if (status.value === KottiFieldFileUploadRemote.Status.UPLOADING) {
					props.actions.onCancel(props.fileInfo.id)
					return
				}

				props.actions.onDelete(props.fileInfo.id)
			},
			onClickRetry: () => {
				if (props.isDisabled) return

				// Force re-render Progress Bar to get rid of previous progress value
				progressBarForceRenderKey.value++
				props.actions.onRetry(props.fileInfo.id)
			},
			onClickViewOrDownload: () => {
				if (props.isDisabled) return

				window.open(
					props.fileInfo.viewUrl ?? props.fileInfo.downloadUrl,
					'_blank',
				)
			},
			progress: computed(() => props.fileInfo.progress ?? 0),
			progressBarForceRenderKey,
			showProgressBar: computed(
				() =>
					props.fileInfo.validation === Shared.Validation.SUCCESS &&
					(status.value === KottiFieldFileUploadRemote.Status.ERROR ||
						status.value === KottiFieldFileUploadRemote.Status.UPLOADING),
			),
			showRetryAction: computed(
				() =>
					props.fileInfo.validation === Shared.Validation.SUCCESS &&
					(status.value === KottiFieldFileUploadRemote.Status.CANCELED ||
						status.value === KottiFieldFileUploadRemote.Status.ERROR),
			),
			showViewOrDownloadAction: computed(
				() =>
					status.value === KottiFieldFileUploadRemote.Status.UPLOADED &&
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
