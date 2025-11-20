import type { KottiField } from './types'

const createErrorMessage = (
	props: KottiField.PropsInternal,
	messages: string[],
) => `useField(${String(props.formKey ?? props.label)}): ${messages.join('\n')}`

class DisabledSetValueCalledError extends Error {
	constructor(props: KottiField.PropsInternal) {
		super(
			createErrorMessage(props, [
				'Attempted to setValue on a disabled field.',
				'Disabled fields should never call setValue as it causes unexpected behavior.',
			]),
		)
		this.name = 'DisabledSetValueCalledError'
	}
}

class FormKeyNotFoundError extends Error {
	constructor(props: KottiField.PropsInternal) {
		super(
			createErrorMessage(props, [
				'Encountered a KtField without a value for the specified formKey inside a KtForm.',
				'This means that the field will not be able to determine the initial value.',
			]),
		)
		this.name = 'FormKeyNotFoundError'
	}
}

class ImplicitFormKeyNoneError extends Error {
	constructor(props: KottiField.PropsInternal) {
		super(
			createErrorMessage(props, [
				'Encountered a KtField without a formKey inside a KtForm.',
				'This means that the field will not connect itself to the KtForm’s Context Values',
				'If this is not a mistake, please add formKey="NONE" to your field and bind v-model explicitly.',
			]),
		)
		this.name = 'ImplicitFormKeyNoneError'
	}
}

class InvalidPropOutsideOfContextError extends Error {
	constructor(
		props: KottiField.PropsInternal,
		propName: keyof KottiField.PropsInternal,
	) {
		super(
			createErrorMessage(props, [
				`Encountered a KtField with a “${propName}” outside a KtForm.`,
				'This is most likely a mistake and should be removed.',
			]),
		)
		this.name = 'InvalidPropOutsideOfContextError'
	}
}

export const ktFieldErrors = {
	DisabledSetValueCalledError,
	FormKeyNotFoundError,
	ImplicitFormKeyNoneError,
	InvalidPropOutsideOfContextError,
}
