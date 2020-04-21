import { ComponentPropsOptions } from '@vue/composition-api/dist/component/componentProps'

/**
 * Default Props for Fields implementing KtField
 * ensures compatibility with the useField hook
 */
export const ktFieldProps: ComponentPropsOptions = {
	formKey: { default: null, type: String },
	helpText: { default: null, type: String },
	isDisabled: { default: false, type: Boolean },
	isOptional: { default: false, type: Boolean },
	label: { default: null, type: String },
	validator: { default: null, type: Function },
	validatorKey: { default: null, type: String },
	value: { default: null },
}

export const FORM_KEY_NONE = 'NONE'
