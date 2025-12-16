import { nanoid } from 'nanoid'

import { validateFile } from '../kotti-field-file-upload/validators'

import { KottiFileUpload } from './types'

export const buildFileInfo = ({
	extensions,
	file,
	maxFileSize,
}: {
	extensions: KottiFileUpload.PropsInternal['extensions']
	file: File
	maxFileSize: KottiFileUpload.PropsInternal['maxFileSize']
}): Pick<KottiFileUpload.FileInfo, 'id' | 'name' | 'size' | 'status'> & {
	validation: KottiFileUpload.Validation
} => {
	const validation = validateFile({
		extensions,
		fileName: file.name,
		fileSize: file.size,
		maxFileSize,
	})

	return {
		id: nanoid(),
		name: file.name,
		size: file.size,
		status:
			validation === KottiFileUpload.Validation.SUCCESS
				? KottiFileUpload.Status.NOT_STARTED
				: KottiFileUpload.Status.ERROR,
		validation,
	}
}
