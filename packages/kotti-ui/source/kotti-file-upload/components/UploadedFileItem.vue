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
import { Yoco } from '@3yourmind/yoco'
import { computed, defineComponent, ref } from 'vue'

import { useTranslationNamespace } from '../../kotti-i18n/hooks'
import { makeProps } from '../../make-props'
import { formatFileSize } from '../../kotti-field-file-upload/formatters'
import { KottiFileUpload } from '../../kotti-file-upload/types'

import ActionButton from '../../kotti-field-file-upload/components/ActionButton.vue'
import ItemLayout from '../../kotti-field-file-upload/components/ItemLayout.vue'
import ProgressBar from '../../kotti-field-file-upload/components/ProgressBar.vue'
import { validateFile } from '../../kotti-field-file-upload/validators'

export default defineComponent({
	name: 'UploadedFileItem',
	components: {
		ActionButton,
		ItemLayout,
		ProgressBar,
	},
	props: makeProps(KottiFileUpload.internalFileInfoSchema),
	emits: ['cancelUpload', 'deleteFile', 'restartUpload'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const progressBarForceRenderKey = ref<number>(0)

		const status = computed<KottiFileUpload.Status>(() => props.fileInfo.status)
		const validation = computed<KottiFileUpload.Validation>(() => {
			if (props.fileInfo.validation) return props.fileInfo.validation

			if (props.fileInfo.status === KottiFileUpload.Status.NOT_STARTED)
				return validateFile({
					extensions: props.extensions,
					fileName: props.fileInfo.name,
					fileSize: props.fileInfo.size,
					maxFileSize: props.maxFileSize,
				})

			return KottiFileUpload.Validation.SUCCESS
		})
		const statusText = computed(() =>
			validation.value === KottiFileUpload.Validation.SUCCESS
				? translations.value.statusMsg[status.value]
				: translations.value.validationMsg[validation.value],
		)

		const isDeletable = computed(
			() =>
				validation.value !== KottiFileUpload.Validation.SUCCESS ||
				status.value === KottiFileUpload.Status.UPLOADED,
		)

		return {
			cancelOrDeleteActionIcon: computed<Yoco.Icon>(() =>
				isDeletable.value ? Yoco.Icon.TRASH : Yoco.Icon.CLOSE,
			),
			description: computed(() =>
				[formatFileSize(props.fileInfo.size), statusText.value].join(' - '),
			),
			isError: computed(() =>
				[
					KottiFileUpload.Status.ERROR,
					KottiFileUpload.Status.INVALID,
					KottiFileUpload.Status.UPLOADED_WITH_ERROR,
				].includes(status.value),
			),
			onClickCancelOrDelete: () => {
				if (props.isDisabled) return

				const eventName = isDeletable.value ? 'deleteFile' : 'cancelUpload'

				emit(eventName, props.fileInfo.id)
			},
			onClickRetry: () => {
				if (props.isDisabled) return

				// Force re-render Progress Bar to get rid of previous progress value
				progressBarForceRenderKey.value++
				emit('restartUpload', props.fileInfo.id)
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
					props.fileInfo.validation === KottiFileUpload.Validation.SUCCESS &&
					(status.value === KottiFileUpload.Status.ERROR ||
						status.value === KottiFileUpload.Status.UPLOADING),
			),
			showRetryAction: computed(
				() =>
					props.fileInfo.validation === KottiFileUpload.Validation.SUCCESS &&
					(status.value === KottiFileUpload.Status.CANCELED ||
						status.value === KottiFileUpload.Status.ERROR),
			),
			showViewOrDownloadAction: computed(
				() =>
					status.value === KottiFileUpload.Status.UPLOADED &&
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
