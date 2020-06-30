import { isYocoIcon } from '../validators'

/**
 * Default Props for Fields implementing KtField
 * ensures compatibility with the useField hook
 * @see {@link ./types.ts}
 */
export const KOTTI_FIELD_PROPS = {
	formKey: { default: null, type: String },
	helpDescription: { default: null, type: String },
	helpText: { default: null, type: String },
	hideClear: { default: false, type: Boolean },
	isDisabled: { default: false, type: Boolean },
	isLoading: { default: false, type: Boolean },
	isOptional: { default: false, type: Boolean },
	label: { default: null, type: String },
	leftIcon: { default: null, type: String, validator: isYocoIcon },
	prefix: { default: null, type: String },
	size: { default: 'medium', type: String },
	rightIcon: { default: null, type: String, validator: isYocoIcon },
	suffix: { default: null, type: String },
	tabIndex: { default: 0, type: Number },
	validator: { default: null, type: Function },
	validatorKey: { default: null, type: String },
	value: { default: null },
}

/**
 * Explicitly opt-out of using formKey within a KtFormContext
 */
export const FORM_KEY_NONE = 'NONE'
