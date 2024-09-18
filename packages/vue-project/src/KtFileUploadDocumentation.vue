<template>
	<div>
		<!-- <ComponentInfo v-bind="{ component }" /> -->

		<div class="element-example white">
			<KtFileUpload
				v-bind="fieldProps"
				class="mb-16px"
				@addFiles="onAddFiles"
				@cancelUpload="onCancelUpload"
				@deleteFile="onDeleteFile"
				@restartUpload="onRestartUpload"
			/>
			<KtForm v-model:value="settings" size="small">
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
						<KtFieldNumber
							formKey="maxFileSize"
							isOptional
							label="maxFileSize"
						/>
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
	</div>
</template>

<script lang="ts">
import {
	Kotti,
	KtFieldInlineEdit,
	KtFieldMultiSelect,
	KtFieldNumber,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldToggleGroup,
	KtFileUpload,
	KtForm,
} from '@3yourmind/kotti-ui'
import { Yoco } from '@3yourmind/yoco'
import { defineComponent, ref, computed } from 'vue'
import dayjs from 'dayjs'
import { useRafFn } from '@vueuse/core'

// import ComponentInfo from '~/components/ComponentInfo.vue'

export default defineComponent({
	name: 'DocumentationPageUsageComponentsFieldInlineEdit',
	components: {
		// ComponentInfo,
		KtFieldInlineEdit,
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
			externalUrl: null,
			extensions: [],
			helpDescription: null,
			helpText: null,
			icon: Yoco.Icon.CLOUD_UPLOAD,
			label: 'Label',
			maxFileSize: 2 ** 32,
			tabIndex: null,
		})

		const state = ref<
			(Kotti.FileUpload.FileInfo & {
				uploadStartTime: dayjs.Dayjs
				uploadEndTime: dayjs.Dayjs
			})[]
		>([])

		useRafFn(() => {
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
						uploadEndTime: dayjs().add(Math.random() * 60, 'second'),
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
						: { ...file, status: Kotti.FileUpload.Status.UPLOADING },
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

<style lang="scss">
@import '@3yourmind/kotti-ui/dist/variables.scss';

pre {
	tab-size: 2;
}

li {
	list-style: none;
}

h3 {
	border-bottom: 0;
}

.wrapper {
	display: flex;
	flex-direction: column;
	margin: 0;
	margin-bottom: 1.5em;
	background-color: var(--ui-01);
	border: 1px solid var(--ui-02);
	border-radius: var(--border-radius);

	@media (width < $size-lg) {
		flex-direction: column;

		> *:not(:first-child) {
			border-top: 1px solid var(--ui-02);
		}
	}

	@media (width >= $size-lg) {
		flex-direction: row;

		> * {
			flex: 1;
		}

		> *:not(:last-child) {
			border-right: 1px solid var(--ui-02);
		}
	}

	> * {
		padding: 1.5em;
		margin: 0 !important;
	}
}

.field-row {
	display: flex;

	> * {
		flex: 1;
	}

	> *:not(:first-child) {
		margin-left: 10px;
	}
}

.overview {
	display: flex;
	margin-bottom: 20px;

	@media (width < $size-lg) {
		flex-direction: column;

		> *:not(:first-child) {
			margin-top: 5px;
		}
	}

	@media (width >= $size-lg) {
		flex-direction: row;

		> * {
			flex: 1;
			flex-basis: 0;
		}

		&__code > pre {
			max-width: 400px;
		}

		&__component {
			> * {
				margin-right: 20px;
			}
		}
	}

	&__component {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	&__component-value {
		span {
			font-family: monospace;
			word-break: break-word;
		}
	}

	&__code > pre {
		height: 150px;
		margin: 0;
		overflow: scroll;
	}
}
</style>
