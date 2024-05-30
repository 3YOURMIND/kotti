<template>
	<KtField
		v-bind="{ field }"
		debounceLabelClick
		:helpTextSlot="$slots.helpText"
	>
		<template #container>
			<div class="kt-field-file-upload">
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
					<FileItem
						v-for="fileInfo in filesList"
						v-bind="{
							...sharedProps,
							fileInfo,
						}"
						:key="fileInfo.id"
						@remove="onRemoveFile"
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
		</template>
	</KtField>
</template>

<script lang="ts">
import { computed, defineComponent, onBeforeMount } from 'vue'

import { KtField } from '../kotti-field'
import { useField } from '../kotti-field/hooks'
import { makeProps } from '../make-props'

import DropArea from './components/DropArea.vue'
import FileItem from './components/FileItem.vue'
import PreUploadedFileItem from './components/PreUploadedFileItem.vue'
import TakePhoto from './components/TakePhoto/TakePhoto.vue'
import { KOTTI_FIELD_FILE_UPLOAD_SUPPORTS } from './constants'
import type { Shared } from './types'
import { KottiFieldFileUpload } from './types'
import { buildFileInfo, buildFileItem } from './utils/non-remote'
import { isValidValue } from './validators'

export default defineComponent({
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
			 * b. Value is invalid
			 */
			isEmpty: (value) =>
				value.length === 0 || !isValidValue(value, 'NonRemote'),
			props,
			supports: KOTTI_FIELD_FILE_UPLOAD_SUPPORTS,
		})

		const preUploadedFilesIds = new Set<KottiFieldFileUpload.FileInfo['id']>()

		const setStatus = (payload: KottiFieldFileUpload.Events.SetStatus) => {
			field.setValue(
				field.currentValue.map((fileItem) =>
					fileItem.id === payload.id
						? { ...fileItem, status: payload.status }
						: fileItem,
				),
				{ forceUpdate: true },
			)
		}

		const filesList = computed<KottiFieldFileUpload.FileInfo[]>(() =>
			field.currentValue
				.filter((fileItem) => !preUploadedFilesIds.has(fileItem.id))
				.map((fileItem) => {
					const fileInfo = buildFileInfo({
						extensions: props.extensions,
						fileItem,
						maxFileSize: props.maxFileSize,
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

		onBeforeMount(() => {
			field.currentValue.forEach((fileItem) => {
				if (
					[
						undefined,
						KottiFieldFileUpload.Status.UPLOADED,
						KottiFieldFileUpload.Status.UPLOADED_WITH_ERROR,
					].includes(fileItem.status as undefined | KottiFieldFileUpload.Status)
				)
					preUploadedFilesIds.add(fileItem.id)
			})
		})

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
				field.setValue(
					field.currentValue.filter((fileItem) => fileItem.id !== id),
				)
			},
			preUploadedFilesList: computed<KottiFieldFileUpload.FileInfo[]>(() =>
				field.currentValue
					.filter((fileItem) => preUploadedFilesIds.has(fileItem.id))
					.map((fileItem) => {
						const fileInfo = buildFileInfo({
							extensions: props.extensions,
							fileItem,
							isPreUploaded: true,
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
