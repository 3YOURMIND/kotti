import { KottiField } from '../kotti-field/types'

export enum ErrorCodes {
	NotAllowedError = 'NotAllowedError',
	NotFoundError = 'NotFoundError',
	NotSupportedError = 'NotSupportedError',
}

export const KOTTI_FIELD_FILE_UPLOAD_SUPPORTS: KottiField.Supports = {
	clear: false,
	decoration: false,
	placeholder: false,
	tabIndex: true,
}
