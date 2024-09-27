import { nanoid } from 'nanoid'
import { KottiFileUpload } from './types'
import { validateFile } from '../kotti-field-file-upload/validators'

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
