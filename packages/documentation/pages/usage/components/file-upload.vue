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
				>
					<template #dropAreaFooter v-if="settings.showDropAreaFooterSlot">
						<div @click.stop @kepup.prevent style="padding: var(--unit-3)">
							<KtFieldRadioGroup
								v-model="failUploads"
								:options="[
									{ label: 'Succeed uploads', value: false },
									{ label: 'Fail uploads', value: true },
								]"
							/>
						</div>
					</template>
				</KtFileUpload>
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
					<KtFieldToggle
						formKey="showDropAreaFooterSlot"
						isOptional
						label="use #dropAreaFooter slot"
						type="switch"
					/>

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
import {
	Kotti,
	KtFieldMultiSelect,
	KtFieldNumber,
	KtFieldRadioGroup,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggleGroup,
	KtFileUpload,
	KtForm,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import dayjs from 'dayjs'
import { computed, defineComponent, ref, onMounted, onBeforeUnmount } from 'vue'
import { TimeConversion } from '@metatypes/units'

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
		KtFieldRadioGroup,
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
			showDropAreaFooterSlot: Kotti.FieldToggle.Value
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
			externalUrl: null,
			extensions: [],
			helpDescription: null,
			helpText: null,
			icon: Yoco.Icon.CLOUD_UPLOAD,
			label: 'Label',
			maxFileSize: Number.MAX_SAFE_INTEGER,
			showDropAreaFooterSlot: false,
			tabIndex: null,
		})
		const failUploads = ref(false)

		const state = ref<
			(Kotti.FileUpload.FileInfo & {
				uploadStartTime: dayjs.Dayjs
				uploadEndTime: dayjs.Dayjs
			})[]
		>([])

		useRequestAnimationFrame(() => {
			state.value = state.value.map((file) => {
				if (file.status !== Kotti.FileUpload.Status.UPLOADING) return file
				const now = dayjs()

				if (now.isAfter(file.uploadEndTime))
					return {
						...file,
						progress: 1,
						status: failUploads.value
							? Kotti.FileUpload.Status.UPLOADED_WITH_ERROR
							: Kotti.FileUpload.Status.UPLOADED,
					}

				const current = now.valueOf() - file.uploadStartTime.valueOf()
				const delta =
					file.uploadEndTime.valueOf() - file.uploadStartTime.valueOf()

				return { ...file, progress: current / delta }
			})
		})

		return {
			component: KtFileUpload,
			failUploads,
			fieldProps: computed(() => ({
				allowMultiple: settings.value.booleanFlags.allowMultiple,
				allowPhotos: settings.value.booleanFlags.allowPhotos,
				collapseExtensionsAfter: settings.value.collapseExtensionsAfter,
				dataTest: settings.value.dataTest,
				externalUrs: settings.value.externalUrl,
				extensions: settings.value.extensions,
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
						uploadEndTime: dayjs().add(Math.random() * 4, 'second'),
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
