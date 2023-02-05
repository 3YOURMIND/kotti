import { KottiFieldFileUpload } from './types'

export const isSelectingMultipleFilesWhenNotAllowed = (
	allowMultiple: boolean,
	selectionSize: number,
): boolean => !allowMultiple && selectionSize > 1

const isValidFileSize = (fileSize: number, maxFileSize: number): boolean =>
	fileSize < maxFileSize

const isValidFileExtension = (
	fileName: string,
	validFileExtensions: Array<string>,
): boolean => {
	if (validFileExtensions.length === 0) return true

	const fileExtension = (fileName.split('.').pop() ?? '').trim().toUpperCase()

	if (!fileExtension) return false

	return validFileExtensions
		.map((extension) => extension.trim().toUpperCase())
		.includes(fileExtension)
}

export const isValidUploadedFileStatus = (
	valueItem: KottiFieldFileUpload.ValueInternal[0],
) =>
	valueItem.status === KottiFieldFileUpload.Status.Common.INVALID ||
	valueItem.status === KottiFieldFileUpload.Status.Common.UPLOADED

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
}): KottiFieldFileUpload.Validation => {
	if (!isValidFileExtension(fileName, extensions))
		return KottiFieldFileUpload.Validation.INVALID_EXTENSION

	if (!isValidFileSize(fileSize, maxFileSize))
		return KottiFieldFileUpload.Validation.MAX_SIZE_EXCEEDED

	return KottiFieldFileUpload.Validation.SUCCESS
}
