import { isYocoIcon } from '../validators'

import { KottiField } from './types'

export const KOTTI_FIELD_INHERITABLE_PROPS = {
	hideClear: { default: false, type: Boolean },
	hideValidation: { default: false, type: Boolean },
	isDisabled: { default: false, type: Boolean },
	isLoading: { default: false, type: Boolean },
	size: {
		default: null,
		type: String,
		validator: (value: unknown): value is KottiField.Props<unknown>['size'] =>
			value === null ||
			(typeof value === 'string' &&
				['small', 'medium', 'large'].includes(value)),
	},
}

/**
 * Default Props for Fields implementing KtField
 * ensures compatibility with the useField hook
 * @see {@link ./types.ts}
 */
export const KOTTI_FIELD_PROPS = {
	...KOTTI_FIELD_INHERITABLE_PROPS,
	formKey: { default: null, type: String },
	helpDescription: { default: null, type: String },
	helpText: { default: null, type: String },
	isOptional: { default: false, type: Boolean },
	label: { default: null, type: String },
	leftIcon: { default: null, type: String, validator: isYocoIcon },
	prefix: { default: null, type: String },
	rightIcon: { default: null, type: String, validator: isYocoIcon },
	suffix: { default: null, type: String },
	tabIndex: { default: 0, type: Number },
	validator: { default: null, type: Function },
	validatorKey: { default: null, type: String },
	value: { default: null }, // gets overwritten by implementations
}

/**
 * Explicitly opt-out of using formKey within a KtFormContext
 */
export const FORM_KEY_NONE = 'NONE'
