export const ktFieldProps = {
	formKey: { default: null, type: String },
	isDisabled: { default: false, type: Boolean },
	isOptional: { default: false, type: Boolean },
	label: { default: null, type: String },
	validator: { default: () => () => true, type: Function },
	validatorKey: { default: null, type: String },
	value: { default: null },
}
