<template>
	<KtField
		v-bind="{ field }"
		:getEmptyValue="() => []"
		:helpTextSlot="$slots.helpText"
	>
		<div slot="container" class="kt-field-file-upload">
			<DropArea
				v-if="showDropArea"
				v-bind="{
					...sharedProps,
					allowMultiple,
					collapseExtensionsAfter,
					externalUrl,
					icon,
					tabIndex,
				}"
				@addFiles="onAddFiles"
			>
				<template #footer>
					<TakePhoto
						v-if="allowPhotos"
						v-bind="sharedProps"
						@addFiles="onAddFiles"
					/>
				</template>
			</DropArea>
			<div v-if="filesList.length" :style="filesListStyle" @click.stop.prevent>
				<FileItem
					v-for="fileInfo in filesList"
					v-bind="{
						...sharedProps,
						fileInfo,
						remoteActions,
					}"
					:key="fileInfo.id"
					@remove="onRemoveFile"
				/>
			</div>
			<div
				v-if="preUploadedFilesList.length"
				:style="preUploadedFilesListStyle"
				@click.stop.prevent
			>
				<PreUploadedFileItem
					v-for="fileInfo in preUploadedFilesList"
					v-bind="{
						...sharedProps,
						fileInfo,
						remoteActions,
					}"
					:key="fileInfo.id"
					@remove="onRemoveFile"
				/>
			</div>
		</div>
	</KtField>
</template>

<script lang="ts">
import {
	computed,
	defineComponent,
	onBeforeMount,
	watch,
} from '@vue/composition-api'
import isEmpty from 'lodash/isEmpty'

import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import DropArea from './components/DropArea.vue'
import FileItem from './components/FileItem.vue'
import PreUploadedFileItem from './components/PreUploadedFileItem.vue'
import TakePhoto from './components/TakePhoto/TakePhoto.vue'
import { KOTTI_FIELD_FILE_UPLOAD_SUPPORTS } from './constants'
import { KottiFieldFileUpload } from './types'
import { buildFileInfo, buildPreUploadedFileInfo } from './utils'
import { isValidUploadedFileStatus, validateFile } from './validators'

export default defineComponent<KottiFieldFileUpload.PropsInternal>({
	name: 'KtFieldFileUpload',
	components: {
		DropArea,
		FileItem,
		KtField,
		PreUploadedFileItem,
		TakePhoto,
	},
	props: makeProps(KottiFieldFileUpload.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldFileUpload.ValueInternal>({
			emit,
			/**
			 * We consider this field empty if:
			 * a. No files are selected, or
			 * b. All selected files are invalid
			 */
			isEmpty: (value) =>
				value.length === 0 ||
				value.every(
					(fileItem) =>
						validateFile({
							extensions: props.extensions,
							fileName: 'file' in fileItem ? fileItem.file.name : fileItem.name,
							fileSize: 'file' in fileItem ? fileItem.file.size : fileItem.size,
							maxFileSize: props.maxFileSize,
						}) !== KottiFieldFileUpload.Validation.SUCCESS,
				),
			props,
			supports: KOTTI_FIELD_FILE_UPLOAD_SUPPORTS,
		})

		const newUploadedFiles = new Set<KottiFieldFileUpload.FileInfo['id']>()
		const preUploadedFiles = new Set<KottiFieldFileUpload.FileInfo['id']>()

		const filesList = computed<KottiFieldFileUpload.FileInfo[]>(() =>
			field.currentValue
				.filter((fileItem) => fileItem.id && !preUploadedFiles.has(fileItem.id))
				.map((fileItem) => {
					const fileInfo = buildFileInfo({
						extensions: props.extensions,
						fileItem,
						isRemoteUpload: Boolean(props.remoteUpload?.actions),
						isUploaded: newUploadedFiles.has(fileItem.id),
						maxFileSize: props.maxFileSize,
						progress: props.remoteUpload?.payload[fileItem.id]?.progress ?? 0,
					})

					if (fileItem.status !== fileInfo.status)
						setStatus({ id: fileItem.id, status: fileInfo.status })

					return fileInfo
				}),
		)
		const showDropArea = computed(
			() =>
				props.allowMultiple ||
				(!props.allowMultiple && field.currentValue.length === 0),
		)

		const setStatus = (payload: KottiFieldFileUpload.Events.SetStatus) => {
			field.setValue(
				field.currentValue.map((fileItem) =>
					fileItem.id === payload.id
						? { ...fileItem, status: payload.status }
						: fileItem,
				),
			)

			if (payload.status === KottiFieldFileUpload.Status.Common.UPLOADED)
				newUploadedFiles.add(payload.id)
		}

		onBeforeMount(() => {
			const parsedValue = KottiFieldFileUpload.valuesSchema.parse(
				field.currentValue,
			)

			parsedValue.forEach((fileItem) => {
				if (!isValidUploadedFileStatus(fileItem))
					throw new Error(
						`KtFieldFileUpload: invalid status for file item ${fileItem.id}: ${fileItem.status}`,
					)
				preUploadedFiles.add(fileItem.id)
			})

			field.setValue(parsedValue)
		})

		watch(
			() => props.remoteUpload?.payload,
			(payload) => {
				if (!payload || isEmpty(payload)) return

				field.currentValue.forEach((fileItem) => {
					if (
						!(
							fileItem.status === KottiFieldFileUpload.Status.Remote.CANCELED ||
							fileItem.status === KottiFieldFileUpload.Status.Remote.ERROR ||
							fileItem.status === KottiFieldFileUpload.Status.Remote.UPLOADING
						)
					)
						return

					const remoteStatus = payload[fileItem.id]?.status

					if (remoteStatus && fileItem.status !== remoteStatus)
						setStatus({ id: fileItem.id, status: remoteStatus })
				})
			},
			{ deep: true },
		)

		return {
			field,
			filesList,
			filesListStyle: computed(() =>
				showDropArea.value ? { 'padding-top': 'var(--unit-4)' } : undefined,
			),
			onAddFiles: (value: KottiFieldFileUpload.Events.AddFiles) =>
				field.setValue(
					props.allowMultiple ? [...field.currentValue, ...value] : value,
				),
			onRemoveFile: (id: KottiFieldFileUpload.Events.RemoveFile) =>
				field.setValue(
					field.currentValue.filter((fileItem) => fileItem.id !== id),
				),
			preUploadedFilesList: computed<KottiFieldFileUpload.FileInfo[]>(() =>
				field.currentValue
					.filter((fileItem) => preUploadedFiles.has(fileItem.id))
					.map((fileItem) => {
						const fileInfo = buildPreUploadedFileInfo({
							extensions: props.extensions,
							fileItem,
							maxFileSize: props.maxFileSize,
						})

						if (fileItem.status !== fileInfo.status)
							setStatus({ id: fileItem.id, status: fileInfo.status })

						return fileInfo
					}),
			),
			preUploadedFilesListStyle: computed(() =>
				showDropArea.value
					? {
							'padding-top': `var(${
								filesList.value.length ? '--unit-8' : '--unit-4'
							})`,
					  }
					: undefined,
			),
			remoteActions: computed(() => props.remoteUpload?.actions),
			sharedProps: computed(() => ({
				dataTest: field.inputProps['data-test'],
				extensions: props.extensions,
				isDisabled: field.isDisabled,
				maxFileSize: props.maxFileSize,
			})),
			showDropArea,
		}
	},
})
</script>
