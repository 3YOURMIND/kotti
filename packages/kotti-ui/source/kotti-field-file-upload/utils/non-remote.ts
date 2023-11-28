import shortid from 'shortid'

import { KottiFieldFileUpload, Shared } from '../types'
import { validateFile } from '../validators'

/**
 * Builds a File Item element for the field.value array.
 * Called when selecting a file via the input picker or drag & drop.
 * @param file The raw file
 * @returns The File Item
 */
export const buildFileItem = (
	file: File,
): KottiFieldFileUpload.ValueInternal[0] => ({
	file,
	id: shortid(),
	status: KottiFieldFileUpload.Status.NOT_STARTED,
})

/**
 * Builds a File Info object
 * @param param0.extensions The allowed file extensions
 * @param param0.fileItem The file item element from the field.value array
 * @param param0.isPreUploaded Whether the file is pre-uploaded or not
 * @param param0.maxFileSize The maximum file size allowed
 * @returns The File Info object
 */
export const buildFileInfo = ({
	extensions,
	fileItem,
	isPreUploaded = false,
	maxFileSize,
}: {
	extensions: KottiFieldFileUpload.PropsInternal['extensions']
	fileItem: KottiFieldFileUpload.ValueInternal[0]
	isPreUploaded?: boolean
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

	const status: KottiFieldFileUpload.Status = (() => {
		if (isPreUploaded)
			return validation === Shared.Validation.SUCCESS
				? KottiFieldFileUpload.Status.UPLOADED
				: KottiFieldFileUpload.Status.UPLOADED_WITH_ERROR

		return validation === Shared.Validation.SUCCESS
			? KottiFieldFileUpload.Status.READY_TO_UPLOAD
			: KottiFieldFileUpload.Status.INVALID
	})()

	return {
		downloadUrl: 'downloadUrl' in fileItem ? fileItem.downloadUrl : undefined,
		id: fileItem.id,
		isInternal: 'isInternal' in fileItem ? fileItem.isInternal : undefined,
		name: fileName,
		size: fileSize,
		status,
		validation,
		viewUrl: 'viewUrl' in fileItem ? fileItem.viewUrl : undefined,
	}
}
