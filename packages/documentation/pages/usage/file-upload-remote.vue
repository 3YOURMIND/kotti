<template>
	<div>
		<h1>File Upload Remote</h1>

		<KtFieldFileUploadRemote
			v-model="files"
			allowMultiple
			isOptional
			label="Label"
			v-bind="{
				payload,
				actions,
			}"
		>
			Default Slot
		</KtFieldFileUploadRemote>
		<KtModal :isOpen="isOpen" @close="onCancel">
			<template #body>
				Do you want to make the files to be Internal? Click outside to cancel
			</template>
			<template #footer>
				<KtButton type="secondary" @click="onProceed(false)">No</KtButton>
				<KtButton type="primary" @click="onProceed(true)">Yes</KtButton>
			</template>
		</KtModal>
	</div>
</template>

<script lang="ts">
import { Kotti } from '@3yourmind/kotti-ui'
import { computed, defineComponent, ref } from '@vue/composition-api'

class MockBackend {
	public static readonly upload = async (
		file: File,
		onProgress: (progress: number, total: number) => void,
		onSuccess: () => void,
		onError: () => void,
		setCancelHandler: (cancelHandler: () => void) => void,
	): Promise<void> => {
		const total = 100
		let loaded = 0

		return new Promise((resolve, reject) => {
			const interval = setInterval(() => {
				loaded += Math.random() * 6 + 2
				onProgress(loaded, total)

				if (loaded >= total) {
					clearInterval(interval)
					if (file.name.includes('error')) {
						onError()
						reject()
					} else {
						onSuccess()
						resolve()
					}
				}
			}, 100)
			setCancelHandler(() => {
				reject()
				clearInterval(interval)
			})
		})
	}
}

export default defineComponent({
	setup() {
		const payload = ref<Kotti.FieldFileUploadRemote.Payload>({})
		const files = ref<Kotti.FieldFileUploadRemote.Value>([
			{
				name: 'file1.pdf',
				id: '1',
				isInternal: true,
				size: 10000,
				status: Kotti.FieldFileUploadRemote.Status.UPLOADED,
			},
			{
				name: 'file2.pdf',
				id: '2',
				isInternal: false,
				size: 10000,
				status: Kotti.FieldFileUploadRemote.Status.UPLOADED,
			},
		])
		const mappingForIsInternal = ref<Map<string | number, boolean>>(new Map())
		const cancelHandlers = ref<Record<string | number, () => void>>({})
		const interceptedFiles = ref(
			new Set<Kotti.FieldFileUploadRemote.FileInfo['id']>(),
		)
		const isOpen = ref(false)

		const uploadFile = (fileId: string | number) => {
			if (!interceptedFiles.value.has(fileId)) {
				isOpen.value = true
				return
			}

			const file = files.value.find((file) => file.id === fileId)

			if (!file || !('file' in file)) return

			return MockBackend.upload(
				file.file,
				(progress, total) => {
					const fileStatus = payload.value[fileId]
					const newProgress = progress / total
					payload.value = {
						...payload.value,
						[fileId]: {
							...fileStatus,
							progress: Math.min(
								1,
								Math.max(newProgress, fileStatus.progress ?? 0),
							),
							status: Kotti.FieldFileUploadRemote.Status.UPLOADING,
						},
					}
				},
				() => {
					delete payload.value[fileId]
					files.value = files.value.map((file) =>
						file.id !== fileId
							? file
							: {
									...file,
									isInternal: mappingForIsInternal.value.get(fileId) ?? false,
									status: Kotti.FieldFileUploadRemote.Status.UPLOADED,
							  },
					)
				},
				() => {
					const fileStatus = payload.value[fileId]
					payload.value = {
						...payload.value,
						[fileId]: {
							...fileStatus,
							status: Kotti.FieldFileUploadRemote.Status.ERROR,
						},
					}
				},
				(cancelHandler: () => void) =>
					(cancelHandlers.value[fileId] = cancelHandler),
			)
		}

		return {
			actions: computed<Kotti.FieldFileUploadRemote.Actions>(() => ({
				onCancel: (fileId) => {
					cancelHandlers.value[fileId]?.()
					const fileStatus = payload.value[fileId]
					payload.value = {
						...payload.value,
						[fileId]: {
							...fileStatus,
							status: Kotti.FieldFileUploadRemote.Status.CANCELED,
						},
					}
				},
				onDelete: (fileId) => {
					delete payload.value[fileId]
					files.value = files.value.filter((file) => file.id !== fileId)
				},
				onRetry: uploadFile,
				onUpload: (fileId) => {
					if (!interceptedFiles.value.has(fileId)) {
						const fileStatus = payload.value[fileId]
						payload.value = {
							...payload.value,
							[fileId]: {
								...fileStatus,
								status: Kotti.FieldFileUploadRemote.Status.HIDDEN,
							},
						}
					}
					uploadFile(fileId)
				},
			})),
			files,
			isOpen,
			payload,
			onCancel: () => {
				const nonInterceptedFiles = files.value
					.filter((file) => !interceptedFiles.value.has(file.id))
					.map((file) => file.id)
				nonInterceptedFiles.forEach((fileId) => {
					delete payload.value[fileId]
					files.value = files.value.filter((file) => file.id !== fileId)
				})
				isOpen.value = false
			},
			onProceed: (isInternal: boolean) => {
				const nonInterceptedFiles = files.value
					.filter((file) => !interceptedFiles.value.has(file.id))
					.map((file) => file.id)
				interceptedFiles.value = new Set([
					...interceptedFiles.value,
					...nonInterceptedFiles,
				])
				nonInterceptedFiles.forEach((fileId) => uploadFile(fileId))
				mappingForIsInternal.value = new Map([
					...Object.entries(mappingForIsInternal.value),
					...nonInterceptedFiles.map((fileId) => [fileId, isInternal] as const),
				])
				isOpen.value = false
			},
		}
	},
})
</script>
