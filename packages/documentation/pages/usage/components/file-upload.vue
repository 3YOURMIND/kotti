<template>
	<div>
		<ComponentInfo v-bind="{ component }" />

		<div class="overview">
			<div class="overview__component">
				<KtFileUpload
					v-bind="fieldProps"
					@addFiles="onAddFiles"
					@cancelUpload="onCancelUpload"
					@deleteFile="onDeleteFile"
					@restartUpload="onRestartUpload"
				/>
			</div>
		</div>
		<KtForm v-model="settings" size="small">
			<div class="wrapper">
				<div>
					<h4>Settings</h4>

					<KtFieldToggleGroup
						formKey="booleanFlags"
						isOptional
						label="Boolean Flags"
						:options="[
							{ key: 'allowMultiple', label: 'allowMultiple' },
							{ key: 'allowPhotos', label: 'allowPhotos' },
							{ key: 'hideDropArea', label: 'hideDropArea' },
							{ key: 'isDisabled', label: 'isDisabled' },
							{ key: 'isLoading', label: 'isLoading' },
						]"
						type="switch"
					/>
					<KtFieldNumber
						formKey="collapseExtensionsAfter"
						isOptional
						label="collapseExtensionsAfter"
					/>
					<KtFieldNumber formKey="maxFileSize" isOptional label="maxFileSize" />
					<KtFieldNumber formKey="tabIndex" isOptional label="tabIndex" />
					<KtFieldText formKey="dataTest" isOptional label="dataTest" />

					<KtFieldMultiSelect
						formKey="extensions"
						helpText="List of allowed file extensions. Takes an array of case-insensitive strings."
						isOptional
						label="extensions"
						:options="[
							{ label: 'DOC', value: 'DOC' },
							{ label: 'GIF', value: 'GIF' },
							{ label: 'JP2', value: 'JP2' },
							{ label: 'JPEG', value: 'JPEG' },
							{ label: 'JPG', value: 'JPG' },
							{ label: 'OBJ', value: 'OBJ' },
							{ label: 'PDF', value: 'PDF' },
							{ label: 'PNG', value: 'PNG' },
							{ label: 'STL', value: 'STL' },
							{ label: 'TXT', value: 'TXT' },
						]"
					/>
				</div>

				<div>
					<h4>Texts</h4>
					<KtFieldText formKey="label" isOptional label="label" />
					<KtFieldText formKey="externalUrl" isOptional label="externalUrl" />
					<KtFieldText
						formKey="helpDescription"
						isOptional
						label="helpDescription"
					/>
					<KtFieldText formKey="helpText" isOptional label="helpText" />

					<KtFieldSingleSelect
						formKey="icon"
						isOptional
						label="icon"
						:options="yocoIconOptions"
					>
						<template #option="{ option }">
							<i
								class="yoco"
								style="margin-right: 10px; font-size: 24px"
								v-text="option.value"
							/>
							<span v-text="option.label" />
						</template>
					</KtFieldSingleSelect>
				</div>
			</div>
		</KtForm>
	</div>
</template>

<script lang="ts">
import { TimeConversion } from '@metatypes/units'
import dayjs from 'dayjs'
import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'

import {
	Kotti,
	KtFieldMultiSelect,
	KtFieldNumber,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggleGroup,
	KtFileUpload,
	KtForm,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'

import ComponentInfo from '~/components/ComponentInfo.vue'

export function useRequestAnimationFrame(callback: () => void): {
	start: () => void
	stop: () => void
} {
	const animationFrameId = ref<number | null>(null)

	const start = () => {
		const animate = () => {
			callback()
			animationFrameId.value = window.requestAnimationFrame(animate)
		}
		animationFrameId.value = window.requestAnimationFrame(animate)
	}

	const stop = () => {
		if (animationFrameId.value) {
			window.cancelAnimationFrame(animationFrameId.value)
			animationFrameId.value = null
		}
	}

	onMounted(() => {
		start()
	})

	onBeforeUnmount(() => {
		stop()
	})

	return {
		start,
		stop,
	}
}

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFileUpload',
	components: {
		ComponentInfo,
		KtFieldMultiSelect,
		KtFieldNumber,
		KtFieldSingleSelect,
		KtFieldText,
		KtFieldToggleGroup,
		KtFileUpload,
		KtForm,
	},
	setup() {
		const settings = ref<{
			booleanFlags: {
				allowMultiple: Kotti.FieldToggle.Value
				allowPhotos: Kotti.FieldToggle.Value
				hideDropArea: Kotti.FieldToggle.Value
				isDisabled: Kotti.FieldToggle.Value
				isLoading: Kotti.FieldToggle.Value
			}
			collapseExtensionsAfter: Kotti.FieldNumber.Value
			dataTest: Kotti.FieldText.Value
			extensions: Kotti.FieldMultiSelect.Value
			externalUrl: Kotti.FieldText.Value
			helpDescription: Kotti.FieldText.Value
			helpText: Kotti.FieldText.Value
			icon: Kotti.FieldSingleSelect.Value
			label: Kotti.FieldText.Value
			maxFileSize: Kotti.FieldNumber.Value
			tabIndex: Kotti.FieldNumber.Value
		}>({
			booleanFlags: {
				allowMultiple: true,
				allowPhotos: false,
				hideDropArea: false,
				isDisabled: false,
				isLoading: false,
			},
			collapseExtensionsAfter: 5,
			dataTest: null,
			extensions: [],
			externalUrl: null,
			helpDescription: null,
			helpText: null,
			icon: Yoco.Icon.CLOUD_UPLOAD,
			label: 'Label',
			maxFileSize: Number.MAX_SAFE_INTEGER,
			tabIndex: null,
		})

		const state = ref<
			(Kotti.FileUpload.FileInfo & {
				uploadEndTime: dayjs.Dayjs
				uploadStartTime: dayjs.Dayjs
			})[]
		>([
			{
				id: 'uploading-file-id',
				name: 'uploading file',
				size: 256,
				status: Kotti.FileUpload.Status.UPLOADING,
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
			{
				id: 'uploaded-with-error-file-id',
				name: 'uploaded with error file',
				size: 256,
				status: Kotti.FileUpload.Status.UPLOADED_WITH_ERROR,
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
			{
				id: 'uploaded-file-id',
				name: 'uploaded file',
				size: 256,
				status: Kotti.FileUpload.Status.UPLOADED,
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
			{
				id: 'not-started-file-id',
				name: 'not started file',
				size: 256,
				status: Kotti.FileUpload.Status.NOT_STARTED,
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
			{
				id: 'invalid-file-id',
				name: 'invalid file',
				size: 256,
				status: Kotti.FileUpload.Status.INVALID,
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
			{
				id: 'error-file-id',
				name: 'error file',
				size: 256,
				status: Kotti.FileUpload.Status.ERROR,
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
			{
				id: 'cancelled-file-id',
				name: 'canceled file',
				size: 256,
				status: Kotti.FileUpload.Status.CANCELED,
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
			{
				id: 'custom-error-file-id',
				name: 'custom error file',
				size: 256,
				status: {
					label: 'i have a custom error',
					type: 'error',
				},
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
			{
				id: 'custom-loading-file-id',
				name: 'processing file',
				status: {
					label: 'needs some processing...',
					type: 'loading',
				},
				uploadEndTime: dayjs(),
				uploadStartTime: dayjs(),
			},
		])

		useRequestAnimationFrame(() => {
			state.value = state.value.map((file) => {
				if (file.status !== Kotti.FileUpload.Status.UPLOADING) return file
				const now = dayjs()

				if (now.isAfter(file.uploadEndTime))
					return {
						...file,
						progress: 1,
						status: Kotti.FileUpload.Status.UPLOADED,
					}

				const current = now.valueOf() - file.uploadStartTime.valueOf()
				const delta =
					file.uploadEndTime.valueOf() - file.uploadStartTime.valueOf()

				return { ...file, progress: current / delta }
			})
		})

		return {
			component: KtFileUpload,
			fieldProps: computed(() => ({
				allowMultiple: settings.value.booleanFlags.allowMultiple,
				allowPhotos: settings.value.booleanFlags.allowPhotos,
				collapseExtensionsAfter: settings.value.collapseExtensionsAfter,
				dataTest: settings.value.dataTest,
				extensions: settings.value.extensions,
				externalUrs: settings.value.externalUrl,
				helpDescription: settings.value.helpDescription,
				helpText: settings.value.helpText,
				hideDropArea: settings.value.booleanFlags.hideDropArea,
				icon: settings.value.icon,
				isDisabled: settings.value.booleanFlags.isDisabled,
				isLoading: settings.value.booleanFlags.isLoading,
				label: settings.value.label,
				maxFileSize: settings.value.maxFileSize,
				state: state.value,
				tabIndex: settings.value.tabIndex,
			})),
			onAddFiles: (addedFiles: Kotti.FileUpload.Events.AddFiles) => {
				const uploadStartTime = dayjs()
				state.value = [
					...addedFiles.map((e) => ({
						...e.fileInfo,
						status: Kotti.FileUpload.Status.UPLOADING,
						uploadEndTime: dayjs().add(
							Math.random() * TimeConversion.SECONDS_PER_MINUTE,
							'second',
						),
						uploadStartTime,
					})),
					...state.value,
				]
			},
			onCancelUpload: (fileId: Kotti.FileUpload.Events.CancelUpload) => {
				state.value = state.value.map((file) =>
					file.id !== fileId
						? file
						: { ...file, status: Kotti.FileUpload.Status.CANCELED },
				)
			},
			onDeleteFile: (fileId: Kotti.FileUpload.Events.RemoveFile) => {
				state.value = state.value.filter((file) => file.id !== fileId)
			},
			onRestartUpload: (fileId: Kotti.FileUpload.Events.RestartUpload) => {
				state.value = state.value.map((file) =>
					file.id !== fileId
						? file
						: {
								...file,
								status: Kotti.FileUpload.Status.UPLOADING,
								uploadEndTime: dayjs().add(
									Math.random() * TimeConversion.SECONDS_PER_MINUTE,
									'second',
								),
								uploadStartTime: dayjs(),
							},
				)
			},
			settings,
			yocoIconOptions: Object.values(Yoco.Icon).map((icon) => ({
				label: icon,
				value: icon,
			})),
		}
	},
})
</script>

<style src="../../../styles/form-fields.scss" lang="scss" scoped />
