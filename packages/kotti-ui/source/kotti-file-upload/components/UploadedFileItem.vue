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
import { computed, defineComponent, type PropType, ref } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import ActionButton from '../../kotti-field-file-upload/components/ActionButton.vue'
import ItemLayout from '../../kotti-field-file-upload/components/ItemLayout.vue'
import ProgressBar from '../../kotti-field-file-upload/components/ProgressBar.vue'
import { formatFileSize } from '../../kotti-field-file-upload/formatters'
import { validateFile } from '../../kotti-field-file-upload/validators'
import { KottiFileUpload } from '../../kotti-file-upload/types'
import { useTranslationNamespace } from '../../kotti-i18n/hooks'

export default defineComponent({
	name: 'UploadedFileItem',
	components: {
		ActionButton,
		ItemLayout,
		ProgressBar,
	},
	props: {
		dataTest: {
			default: null,
			type: String,
		},
		extensions: {
			default: () => [],
			type: Array as PropType<Array<string>>,
		},
		fileInfo: {
			required: true,
			type: Object as PropType<KottiFileUpload.FileInfo>,
		},
		isDisabled: {
			default: false,
			type: Boolean,
		},
		maxFileSize: {
			default: Number.MAX_SAFE_INTEGER,
			type: Number,
		},
	},
	emits: ['cancelUpload', 'deleteFile', 'restartUpload'],
	setup(props, { emit }) {
		const translations = useTranslationNamespace('KtFieldFileUpload')

		const progressBarForceRenderKey = ref<number>(0)

		const status = computed(() =>
			typeof props.fileInfo.status === 'object' ? null : props.fileInfo.status,
		)
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
		const statusText = computed(() => {
			const { status } = props.fileInfo
			if (typeof status === 'object') return status.label

			return validation.value === KottiFileUpload.Validation.SUCCESS
				? translations.value.statusMsg[status as KottiFileUpload.Status]
				: translations.value.validationMsg[validation.value]
		})

		const isDeletable = computed(
			() =>
				validation.value !== KottiFileUpload.Validation.SUCCESS ||
				[
					KottiFileUpload.Status.CANCELED,
					KottiFileUpload.Status.ERROR,
					KottiFileUpload.Status.INVALID,
					KottiFileUpload.Status.UPLOADED,
					KottiFileUpload.Status.UPLOADED_WITH_ERROR,
					null,
				].includes(status.value),
		)

		return {
			cancelOrDeleteActionIcon: computed<Yoco.Icon>(() =>
				isDeletable.value ? Yoco.Icon.TRASH : Yoco.Icon.CLOSE,
			),
			description: computed(() =>
				[formatFileSize(props.fileInfo.size), statusText.value].join(' - '),
			),
			isError: computed(() => {
				const { status } = props.fileInfo
				if (typeof status === 'string')
					return [
						KottiFileUpload.Status.ERROR,
						KottiFileUpload.Status.INVALID,
						KottiFileUpload.Status.UPLOADED_WITH_ERROR,
					].includes(status)

				return status.type === 'error'
			}),
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
