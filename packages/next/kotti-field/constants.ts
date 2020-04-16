export const ktFieldProps = {
	formKey: { default: null, type: String },
	isDisabled: { default: false, type: Boolean },
	validator: { default: () => () => true, type: Function },
	validatorKey: { default: null, type: String },

	// FIXME: These should exist at some point
	// label: { default: null, type: String },
	// required: { default: false, type: Boolean },
}
