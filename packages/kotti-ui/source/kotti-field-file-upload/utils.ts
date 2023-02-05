import { v4 as uuidv4 } from 'uuid'

import { KottiFieldFileUpload } from './types'
import { validateFile } from './validators'

/**
 * Builds a valid string for the HTML file input's accept attribute
 * @param extensions Array of allowed file extensions
 * @returns Accept string, e.g.: ".jpg,.jpeg,.jp2,.png"
 */
export const buildAcceptString = (
	extensions: Array<string>,
): HTMLInputElement['accept'] | undefined =>
	extensions.length
		? extensions
				.map((extension) => `.${extension.replace(/\./g, '').trim()}`)
				.join(',')
				.toLowerCase()
		: undefined

export const buildFileInfo = ({
	extensions,
	fileItem,
	isRemoteUpload,
	isUploaded,
	maxFileSize,
	progress,
}: {
	extensions: KottiFieldFileUpload.PropsInternal['extensions']
	fileItem: KottiFieldFileUpload.ValueInternal[0]
	isRemoteUpload: boolean
	isUploaded: boolean
	maxFileSize: KottiFieldFileUpload.PropsInternal['maxFileSize']
	progress: KottiFieldFileUpload.Remote.Payload[0]['progress']
}): KottiFieldFileUpload.FileInfo => {
	const fileName = 'file' in fileItem ? fileItem.file.name : fileItem.name
	const fileSize = 'file' in fileItem ? fileItem.file.size : fileItem.size
	const validation = validateFile({
		extensions,
		fileName,
		fileSize,
		maxFileSize,
	})

	const status: KottiFieldFileUpload.Status.All = (() => {
		if (validation !== KottiFieldFileUpload.Validation.SUCCESS)
			return KottiFieldFileUpload.Status.Common.INVALID

		if (isUploaded) return KottiFieldFileUpload.Status.Common.UPLOADED

		return isRemoteUpload
			? KottiFieldFileUpload.Status.Remote.UPLOADING
			: KottiFieldFileUpload.Status.NonRemote.READY_TO_UPLOAD
	})()

	return {
		downloadUrl: 'downloadUrl' in fileItem ? fileItem.downloadUrl : undefined,
		id: fileItem.id,
		name: fileName,
		progress,
		size: fileSize,
		status:
			fileItem.status === KottiFieldFileUpload.Status.Remote.CANCELED ||
			fileItem.status === KottiFieldFileUpload.Status.Remote.ERROR
				? fileItem.status
				: status,
		validation,
		viewUrl: 'viewUrl' in fileItem ? fileItem.viewUrl : undefined,
	}
}

export const buildFileItem = (
	file: File,
): KottiFieldFileUpload.ValueInternal[0] => ({
	file,
	id: uuidv4(),
	status: KottiFieldFileUpload.Status.Common.NOT_STARTED,
})

export const buildPreUploadedFileInfo = ({
	extensions,
	fileItem,
	maxFileSize,
}: {
	extensions: KottiFieldFileUpload.PropsInternal['extensions']
	fileItem: KottiFieldFileUpload.ValueInternal[0]
	maxFileSize: KottiFieldFileUpload.PropsInternal['maxFileSize']
}): KottiFieldFileUpload.FileInfo => {
	const fileName = 'file' in fileItem ? fileItem.file.name : fileItem.name
	const fileSize = 'file' in fileItem ? fileItem.file.size : fileItem.size
	const validation = validateFile({
		extensions,
		fileName,
		fileSize,
		maxFileSize,
	})

	return {
		downloadUrl: 'downloadUrl' in fileItem ? fileItem.downloadUrl : undefined,
		id: fileItem.id,
		name: fileName,
		size: fileSize,
		status:
			validation === KottiFieldFileUpload.Validation.SUCCESS
				? KottiFieldFileUpload.Status.Common.UPLOADED
				: KottiFieldFileUpload.Status.Common.UPLOADED_WITH_ERROR,
		validation,
		viewUrl: 'viewUrl' in fileItem ? fileItem.viewUrl : undefined,
	}
}
