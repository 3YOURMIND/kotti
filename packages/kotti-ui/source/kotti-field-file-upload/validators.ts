import {
	KottiFieldFileUpload,
	KottiFieldFileUploadRemote,
	Shared,
} from './types'

export const isSelectingMultipleFilesWhenNotAllowed = (
	allowMultiple: boolean,
	selectionSize: number,
): boolean => !allowMultiple && selectionSize > 1

const isValidFileSize = (fileSize: number, maxFileSize: number): boolean =>
	fileSize <= maxFileSize

const isValidFileExtension = (
	fileName: string,
	validFileExtensions: Array<string>,
): boolean => {
	if (validFileExtensions.length === 0) return true

	const fileExtension = fileName.split('.').pop() ?? null

	if (fileExtension === null) return false

	return validFileExtensions.some(
		(extension) =>
			extension.localeCompare(fileExtension.trim(), undefined, {
				sensitivity: 'accent',
			}) === 0,
	)
}

/**
 * Validates a File Item
 * @param param0.extensions Allowed file extensions
 * @param param0.fileName The name of the file (muss include file extension)
 * @param param0.fileSize The size of the file in bytes
 * @param param0.maxFileSize The maximum file size allowed in bytes
 * @returns Validation.SUCCESS if the file is valid, else either
 * Validation.INVALID_EXTENSION or Validation.MAX_SIZE_EXCEEDED.
 * Validation.INVALID_EXTENSION has higher priority.
 */
export const validateFile = ({
	extensions,
	fileName,
	fileSize,
	maxFileSize,
}: {
	extensions: KottiFieldFileUpload.PropsInternal['extensions']
	fileName: string
	fileSize: number
	maxFileSize: KottiFieldFileUpload.PropsInternal['maxFileSize']
}): Shared.Validation => {
	if (!isValidFileExtension(fileName, extensions))
		return Shared.Validation.INVALID_EXTENSION

	if (!isValidFileSize(fileSize, maxFileSize))
		return Shared.Validation.MAX_SIZE_EXCEEDED

	return Shared.Validation.SUCCESS
}

/**
 * Checks whether Value is valid
 * @param value The value to evaluate
 * @returns true if at least one selected file is valid, else false
 */
export const isValidValue = <
	T extends
		| KottiFieldFileUpload.ValueInternal
		| KottiFieldFileUploadRemote.ValueInternal,
>(
	value: T,
	type: T extends KottiFieldFileUpload.ValueInternal ? 'NonRemote' : 'Remote',
): boolean =>
	type === 'NonRemote'
		? isValidValueNonRemote(value as KottiFieldFileUpload.ValueInternal)
		: isValidValueRemote(value as KottiFieldFileUploadRemote.ValueInternal)

const isValidValueNonRemote = (
	value: KottiFieldFileUpload.ValueInternal,
): boolean =>
	value.some(
		(fileItem) =>
			fileItem.status === KottiFieldFileUpload.Status.READY_TO_UPLOAD ||
			fileItem.status === KottiFieldFileUpload.Status.UPLOADED,
	)

const isValidValueRemote = (
	value: KottiFieldFileUploadRemote.ValueInternal,
): boolean =>
	value.some(
		(fileItem) =>
			fileItem.status === KottiFieldFileUploadRemote.Status.UPLOADED ||
			fileItem.status === KottiFieldFileUploadRemote.Status.UPLOADING,
	)
