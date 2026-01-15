<template>
	<div class="kt-file-upload">
		<div v-if="hasLabel || hasHelpText" class="kt-file-upload__header">
			<label
				v-if="hasLabel"
				class="kt-file-upload__label"
				:for="inputId"
				v-text="label"
			/>
			<span v-if="hasHelpText" class="kt-field__help-text">
				<FieldHelpText :helpText="helpText" :helpTextSlot="$slots.helpText" />
			</span>
		</div>
		<div
			v-if="helpDescription"
			class="kt-file-upload__help-description"
			v-text="helpDescription"
		/>
		<div class="kt-file-upload__content">
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
			<div v-if="uploadedFilesList.length > 0">
				<UploadedFileItem
					v-for="fileInfo in uploadedFilesList"
					v-bind="{
						...sharedProps,
						fileInfo,
					}"
					:key="fileInfo.id"
					@cancelUpload="(fileId) => $emit('cancelUpload', fileId)"
					@deleteFile="onDeleteFile"
					@restartUpload="(fileId) => $emit('restartUpload', fileId)"
				/>
			</div>
			<div v-if="preUploadedFilesList.length > 0">
				<PreUploadedFileItem
					v-for="fileInfo in preUploadedFilesList"
					v-bind="{
						...sharedProps,
						fileInfo,
					}"
					:key="fileInfo.id"
					@remove="onDeleteFile"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'

import DropArea from '../kotti-field-file-upload/components/DropArea.vue'
import PreUploadedFileItem from '../kotti-field-file-upload/components/PreUploadedFileItem.vue'
import TakePhoto from '../kotti-field-file-upload/components/TakePhoto/TakePhoto.vue'
import type { Shared } from '../kotti-field-file-upload/types'
import FieldHelpText from '../kotti-field/components/FieldHelpText.vue'
import { makeProps } from '../make-props'

import UploadedFileItem from './components/UploadedFileItem.vue'
import { KottiFileUpload } from './types'
import { buildFileInfo } from './utilities'

let ktFileUploadId = 1

export default defineComponent({
	name: 'KtFileUpload',
	components: {
		DropArea,
		FieldHelpText,
		PreUploadedFileItem,
		TakePhoto,
		UploadedFileItem,
	},
	props: makeProps(KottiFileUpload.propsSchema),
	emits: ['addFiles', 'cancelUpload', 'deleteFile', 'restartUpload'],
	setup(props, { emit, slots }) {
		const interceptedFiles = ref<Array<KottiFileUpload.InterceptedFile>>([])
		const preUploadedFileIds = ref<Set<number | string>>(new Set())

		const uploadedFilesList = computed(() => [
			...interceptedFiles.value.map((file) => ({
				id: file.id,
				name: file.file.name,
				size: file.file.size,
				status: file.status,
				validation: file.validation,
			})),
			...props.state.filter((file) => !preUploadedFileIds.value.has(file.id)),
		])

		onMounted(() => {
			for (const file of props.state) {
				if (
					!preUploadedFileIds.value.has(file.id) &&
					(file.status === KottiFileUpload.Status.UPLOADED ||
						file.status === KottiFileUpload.Status.UPLOADED_WITH_ERROR)
				) {
					preUploadedFileIds.value.add(file.id)
				}
			}
		})

		return {
			hasHelpText: computed(() => props.helpText !== null || slots.helpText),
			hasLabel: computed(() => props.label !== null),
			inputId: computed(() => `kt-file-upload-${ktFileUploadId++}`),
			onAddFiles: (value: Shared.Events.AddFiles) => {
				const payload: KottiFileUpload.Events.AddFiles = []
				for (const file of value) {
					const fileInfo = buildFileInfo({
						extensions: props.extensions,
						file,
						maxFileSize: props.maxFileSize,
					})
					if (fileInfo.validation === KottiFileUpload.Validation.SUCCESS)
						payload.push({ file, fileInfo })
					else
						interceptedFiles.value = [
							...interceptedFiles.value,
							{ ...fileInfo, file },
						]
				}
				emit('addFiles', payload)
			},
			onDeleteFile: (fileId: number | string) => {
				const interceptedFileIndex = interceptedFiles.value.findIndex(
					(file) => file.id === fileId,
				)
				if (interceptedFileIndex >= 0) {
					interceptedFiles.value = [
						...interceptedFiles.value.slice(0, interceptedFileIndex),
						...interceptedFiles.value.slice(
							interceptedFileIndex + 1,
							interceptedFiles.value.length,
						),
					]
				} else {
					emit('deleteFile', fileId)
				}
			},
			preUploadedFilesList: computed(() =>
				props.state
					.filter((file) => preUploadedFileIds.value.has(file.id))
					.map((file) => ({ ...file, validation: 'SUCCESS' })),
			),
			sharedProps: computed(() => ({
				dataTest: props.dataTest,
				extensions: props.extensions,
				isDisabled: props.isDisabled,
				isLoading: props.isLoading,
				maxFileSize: props.maxFileSize,
			})),
			showDropArea: computed(
				() =>
					!props.hideDropArea &&
					(props.allowMultiple || props.state.length === 0),
			),
			uploadedFilesList,
		}
	},
})
</script>

<style lang="scss" scoped>
.kt-file-upload {
	display: flex;
	flex-direction: column;
	gap: var(--unit-2);

	&__header {
		display: flex;
		font-size: 0.9em;

		> :not(:first-child) {
			margin-left: 0.2rem;
		}
	}

	&__help-text {
		display: flex;
		align-items: center;
		cursor: pointer;

		.yoco {
			font-size: 1.4em;
		}
	}

	&__label {
		display: flex;
		align-items: center;
		font-weight: 500;
		color: var(--text-02);
	}

	&__help-description {
		color: var(--text-03);
	}

	&__content {
		display: flex;
		flex-direction: column;
		gap: var(--unit-4);
	}
}
</style>
