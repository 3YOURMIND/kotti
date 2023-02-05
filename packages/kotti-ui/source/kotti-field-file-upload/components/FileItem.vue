<template>
	<ItemLayout :name="fileInfo.name">
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
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref, watch } from '@vue/composition-api'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { formatFileSize } from '../formatters'
import { KottiFieldFileUpload } from '../types'

import ActionButton from './ActionButton.vue'
import ItemLayout from './ItemLayout.vue'
import ProgressBar from './ProgressBar.vue'

export default defineComponent({
	name: 'FileItem',
	components: {
		ActionButton,
		ItemLayout,
		ProgressBar,
	},
	props: makeProps(KottiFieldFileUpload.FileItem.schema),
	setup(props: KottiFieldFileUpload.FileItem.Props, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const progressBarForceRenderKey = ref<number>(0)
		const shouldTriggerRemoteUpload = ref<boolean>(true)

		const status = computed(() => props.fileInfo.status)
		const statusText = computed(() =>
			props.fileInfo.validation === KottiFieldFileUpload.Validation.SUCCESS
				? translations.value.statusMsg[status.value]
				: translations.value.validationMsg[props.fileInfo.validation],
		)

		watch(
			status,
			(newStatus) => {
				if (
					newStatus === KottiFieldFileUpload.Status.Remote.UPLOADING &&
					shouldTriggerRemoteUpload.value
				) {
					props.remoteActions?.onUpload(props.fileInfo.id)
					shouldTriggerRemoteUpload.value = false
				}
			},
			{ immediate: true },
		)

		return {
			cancelOrDeleteActionIcon: computed<Yoco.Icon>(() =>
				status.value === KottiFieldFileUpload.Status.Common.UPLOADED ||
				status.value === KottiFieldFileUpload.Status.NonRemote.READY_TO_UPLOAD
					? Yoco.Icon.TRASH
					: Yoco.Icon.CLOSE,
			),
			description: computed(() =>
				[formatFileSize(props.fileInfo.size), statusText.value].join(' - '),
			),
			isError: computed(
				() =>
					status.value === KottiFieldFileUpload.Status.Common.INVALID ||
					status.value === KottiFieldFileUpload.Status.Remote.ERROR,
			),
			onClickCancelOrDelete: () => {
				if (props.isDisabled) return

				if (status.value === KottiFieldFileUpload.Status.Remote.UPLOADING) {
					props.remoteActions?.onCancel?.(props.fileInfo.id)
					return
				}

				if (props.remoteActions) props.remoteActions.onDelete(props.fileInfo.id)
				else {
					const payload: KottiFieldFileUpload.Events.RemoveFile =
						props.fileInfo.id
					emit('remove', payload)
				}
			},
			onClickRetry: () => {
				if (props.isDisabled) return

				progressBarForceRenderKey.value++
				props.remoteActions?.onRetry?.(props.fileInfo.id)
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
					status.value === KottiFieldFileUpload.Status.Remote.ERROR ||
					status.value === KottiFieldFileUpload.Status.Remote.UPLOADING,
			),
			showRetryAction: computed(
				() =>
					(status.value === KottiFieldFileUpload.Status.Remote.CANCELED ||
						status.value === KottiFieldFileUpload.Status.Remote.ERROR) &&
					props.remoteActions?.onRetry,
			),
			showViewOrDownloadAction: computed(
				() =>
					status.value === KottiFieldFileUpload.Status.Common.UPLOADED &&
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
