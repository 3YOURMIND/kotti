<template>
	<KtField
		v-bind="{ field }"
		debounceLabelClick
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
					inputId,
					tabIndex,
				}"
				@addFiles="onAddFiles"
			>
				<template #footer>
					<TakePhoto
						v-if="allowPhotos"
						v-bind="{
							...sharedProps,
							tabIndex,
						}"
						@addFiles="onAddFiles"
					/>
				</template>
			</DropArea>
			<div v-if="filesList.length > 0" :style="filesListStyle">
				<FileItemRemote
					v-for="fileInfo in filesList"
					v-bind="{
						...sharedProps,
						actions,
						fileInfo,
					}"
					:key="fileInfo.id"
				/>
			</div>
			<div
				v-if="preUploadedFilesList.length > 0"
				:style="preUploadedFilesListStyle"
			>
				<PreUploadedFileItem
					v-for="fileInfo in preUploadedFilesList"
					v-bind="{
						...sharedProps,
						fileInfo,
					}"
					:key="fileInfo.id"
					@remove="onRemoveFile"
				/>
			</div>
		</div>
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount, watch } from 'vue'

import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import DropArea from './components/DropArea.vue'
import FileItemRemote from './components/FileItemRemote.vue'
import PreUploadedFileItem from './components/PreUploadedFileItem.vue'
import TakePhoto from './components/TakePhoto/TakePhoto.vue'
import { KOTTI_FIELD_FILE_UPLOAD_SUPPORTS } from './constants'
import type { KottiFieldFileUpload, Shared } from './types'
import { KottiFieldFileUploadRemote } from './types'
import {
	buildFileInfo,
	buildFileItem,
	buildPreUploadedFileInfo,
} from './utils/remote'
import { isValidValue } from './validators'

export default defineComponent({
	name: 'KtFieldFileUploadRemote',
	components: {
		DropArea,
		FileItemRemote,
		KtField,
		PreUploadedFileItem,
		TakePhoto,
	},
	props: makeProps(KottiFieldFileUploadRemote.propsSchema),
	setup(props, { emit }) {
		const field = useField<KottiFieldFileUploadRemote.ValueInternal>({
			emit,
			/**
			 * We consider this field empty if:
			 * a. No files are selected, or
			 * b. Value is invalid
			 */
			isEmpty: (value) => value.length === 0 || !isValidValue(value, 'Remote'),
			props,
			supports: KOTTI_FIELD_FILE_UPLOAD_SUPPORTS,
		})

		const newUploadedFiles = new Set<
			KottiFieldFileUploadRemote.FileInfo['id']
		>()
		const preUploadedFiles = new Set<
			KottiFieldFileUploadRemote.FileInfo['id']
		>()

		const setStatus = (
			payload: KottiFieldFileUploadRemote.Events.SetStatus,
		) => {
			field.setValue(
				field.currentValue.map((fileItem) =>
					fileItem.id === payload.id
						? { ...fileItem, status: payload.status }
						: fileItem,
				),
				{ forceUpdate: true },
			)

			if (payload.status === KottiFieldFileUploadRemote.Status.UPLOADED)
				newUploadedFiles.add(payload.id)
		}

		const filesList = computed<KottiFieldFileUploadRemote.FileInfo[]>(() =>
			field.currentValue
				.filter((fileItem) => !preUploadedFiles.has(fileItem.id))
				.filter(
					(fileItem) =>
						fileItem.status !== KottiFieldFileUploadRemote.Status.HIDDEN,
				)
				.map((fileItem) => {
					const fileInfo = buildFileInfo({
						extensions: props.extensions,
						fileItem,
						isUploaded: newUploadedFiles.has(fileItem.id),
						maxFileSize: props.maxFileSize,
						progress: props.payload[fileItem.id]?.progress ?? 0,
					})

					if (fileItem.status !== fileInfo.status)
						setStatus({ id: fileItem.id, status: fileInfo.status })

					return fileInfo
				}),
		)

		const showDropArea = computed(
			() =>
				(props.allowMultiple || field.currentValue.length === 0) &&
				!props.hideDropArea,
		)

		const setStatuses = (
			payload: Map<
				KottiFieldFileUploadRemote.ValueInternal[number]['id'],
				KottiFieldFileUploadRemote.Status
			>,
		) => {
			field.setValue(
				field.currentValue.map((fileItem) => {
					const status = payload.get(fileItem.id)
					return status ? { ...fileItem, status } : fileItem
				}),
				{ forceUpdate: true },
			)

			Object.entries(payload).forEach(([id, status]) => {
				if (status === KottiFieldFileUploadRemote.Status.UPLOADED)
					newUploadedFiles.add(id)
			})
		}

		onBeforeMount(() => {
			field.currentValue.forEach((fileItem) => {
				if (
					[
						undefined,
						KottiFieldFileUploadRemote.Status.UPLOADED,
						KottiFieldFileUploadRemote.Status.UPLOADED_WITH_ERROR,
					].includes(
						fileItem.status as undefined | KottiFieldFileUploadRemote.Status,
					)
				)
					preUploadedFiles.add(fileItem.id)
			})
		})

		watch(
			() => props.payload,
			(newPayload, oldPayload) => {
				const newStatuses = new Map(
					Object.entries(newPayload)
						.filter(([id, { status }]) => oldPayload[id]?.status !== status)
						.filter(([id, _]) => {
							const fileItemStatus =
								field.currentValue.find((fileItem) => fileItem.id === id)
									?.status ?? null

							return (
								fileItemStatus !== null &&
								![
									KottiFieldFileUploadRemote.Status.INVALID,
									KottiFieldFileUploadRemote.Status.NOT_STARTED,
									KottiFieldFileUploadRemote.Status.UPLOADED,
									KottiFieldFileUploadRemote.Status.UPLOADED_WITH_ERROR,
								].includes(fileItemStatus as KottiFieldFileUploadRemote.Status)
							)
						})
						.map(([id, { status }]) => [id, status]),
				)
				setStatuses(newStatuses)
			},
			{ flush: 'post' },
		)

		return {
			field,
			filesList,
			filesListStyle: computed(() =>
				showDropArea.value ? { 'padding-top': 'var(--unit-4)' } : undefined,
			),
			inputId: computed(() => field.inputProps.id),
			onAddFiles: (value: Shared.Events.AddFiles) => {
				if (props.allowMultiple)
					field.setValue([
						...field.currentValue,
						...value.map((file) => buildFileItem(file)),
					])
				else field.setValue([buildFileItem(value[0] as File)])
			},
			onRemoveFile: (id: Shared.Events.RemoveFile) => {
				props.actions.onDelete(id)
			},
			preUploadedFilesList: computed<
				KottiFieldFileUpload.FileItem.Props['fileInfo'][]
			>(() =>
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

						// FIXME: status seems to be incompatible between remote and non-remote
						return fileInfo as unknown as KottiFieldFileUpload.FileItem.Props['fileInfo']
					}),
			),
			preUploadedFilesListStyle: computed(() =>
				showDropArea.value
					? {
							'padding-top': `var(${
								filesList.value.length > 0 ? '--unit-8' : '--unit-4'
							})`,
						}
					: undefined,
			),
			sharedProps: computed(() => ({
				dataTest: field.inputProps['data-test'],
				extensions: props.extensions,
				isDisabled: field.isDisabled,
				isLoading: field.isLoading,
				maxFileSize: props.maxFileSize,
			})),
			showDropArea,
		}
	},
})
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
