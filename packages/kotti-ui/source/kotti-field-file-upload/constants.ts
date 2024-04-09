import type { KottiField } from '../kotti-field/types'

export enum ErrorCodes {
	NOT_ALLOWED_ERROR = 'NotAllowedError',
	NOT_FOUND_ERROR = 'NotFoundError',
	NOT_SUPPORTED_ERROR = 'NotSupportedError',
}

export const KOTTI_FIELD_FILE_UPLOAD_SUPPORTS: KottiField.Supports = {
	clear: false,
	decoration: false,
	placeholder: false,
	tabIndex: true,
}
