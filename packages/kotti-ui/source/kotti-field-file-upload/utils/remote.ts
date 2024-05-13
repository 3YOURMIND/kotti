import shortid from 'shortid'

import { KottiFieldFileUploadRemote, Shared } from '../types'
import { validateFile } from '../validators'

/**
 * Builds a File Item element for the field.value array.
 * Called when selecting a file via the input picker or drag & drop.
 * @param file The raw file
 * @returns The File Item
 */
export const buildFileItem = (
	file: File,
): KottiFieldFileUploadRemote.ValueInternal[0] => ({
	file,
	id: shortid(),
	status: KottiFieldFileUploadRemote.Status.NOT_STARTED,
})

/**
 * Builds a File Info object
 * @param param0.extensions The allowed file extensions
 * @param param0.fileItem The file item element from the field.value array
 * @param param0.isUploaded Whether the file has been uploaded successfully
 * @param param0.maxFileSize The maximum file size allowed
 * @param param0.progress The upload progress (0 to 1)
 * @returns The File Info object
 */
export const buildFileInfo = ({
	extensions,
	fileItem,
	isUploaded,
	maxFileSize,
	progress,
}: {
	extensions: KottiFieldFileUploadRemote.PropsInternal['extensions']
	fileItem: KottiFieldFileUploadRemote.ValueInternal[0]
	isUploaded: boolean
	maxFileSize: KottiFieldFileUploadRemote.PropsInternal['maxFileSize']
	progress: KottiFieldFileUploadRemote.Payload[0]['progress']
}): KottiFieldFileUploadRemote.FileInfo => {
	const fileName = 'file' in fileItem ? fileItem.file.name : fileItem.name
	const fileSize = 'file' in fileItem ? fileItem.file.size : fileItem.size
	const validation = validateFile({
		extensions,
		fileName,
		fileSize,
		maxFileSize,
	})

	const status: KottiFieldFileUploadRemote.Status = (() => {
		if (isUploaded)
			return validation === Shared.Validation.SUCCESS
				? KottiFieldFileUploadRemote.Status.UPLOADED
				: KottiFieldFileUploadRemote.Status.UPLOADED_WITH_ERROR

		/**
		 * If the File Item is already UPLOADED and there is
		 * no validation errors, keep the UPLOADED status.
		 */
		if (
			fileItem.status === KottiFieldFileUploadRemote.Status.UPLOADED &&
			validation === Shared.Validation.SUCCESS
		)
			return KottiFieldFileUploadRemote.Status.UPLOADED

		return validation === Shared.Validation.SUCCESS
			? KottiFieldFileUploadRemote.Status.UPLOADING
			: KottiFieldFileUploadRemote.Status.INVALID
	})()

	return {
		downloadUrl: 'downloadUrl' in fileItem ? fileItem.downloadUrl : undefined,
		id: fileItem.id,
		isInternal: 'isInternal' in fileItem ? fileItem.isInternal : undefined,
		name: fileName,
		progress,
		size: fileSize,
		status:
			fileItem.status === KottiFieldFileUploadRemote.Status.CANCELED ||
			fileItem.status === KottiFieldFileUploadRemote.Status.ERROR
				? fileItem.status
				: status,
		validation,
		viewUrl: 'viewUrl' in fileItem ? fileItem.viewUrl : undefined,
	}
}

/**
 * Builds a PreUploaded File Info object
 * @param param0.extensions The allowed file extensions
 * @param param0.fileItem The file item element from the field.value array
 * @param param0.maxFileSize The maximum file size allowed
 * @returns The File Info object
 */
export const buildPreUploadedFileInfo = ({
	extensions,
	fileItem,
	maxFileSize,
}: {
	extensions: KottiFieldFileUploadRemote.PropsInternal['extensions']
	fileItem: KottiFieldFileUploadRemote.ValueInternal[0]
	maxFileSize: KottiFieldFileUploadRemote.PropsInternal['maxFileSize']
}): KottiFieldFileUploadRemote.FileInfo => {
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
		isInternal: 'isInternal' in fileItem ? fileItem.isInternal : undefined,
		name: fileName,
		size: fileSize,
		status:
			validation === Shared.Validation.SUCCESS
				? KottiFieldFileUploadRemote.Status.UPLOADED
				: KottiFieldFileUploadRemote.Status.UPLOADED_WITH_ERROR,
		validation,
		viewUrl: 'viewUrl' in fileItem ? fileItem.viewUrl : undefined,
	}
}
