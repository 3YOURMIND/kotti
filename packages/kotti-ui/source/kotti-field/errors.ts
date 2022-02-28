import { CustomError } from 'ts-custom-error'

import { KottiField } from './types'

const createErrorMessage = (
	props: KottiField.PropsInternal,
	messages: string[],
) => `useField(${props.formKey ?? props.label}): ${messages.join('\n')}`

class ImplicitFormKeyNone extends CustomError {
	public constructor(props: KottiField.PropsInternal) {
		super(
			createErrorMessage(props, [
				'Encountered a KtField without a “formKey” inside a KtForm.',
				'This means that the field will not connect itself to the KtForm’s Context Values',
				'If this is not a mistake, please add formKey="NONE" to your field and bind v-model explicitly.',
			]),
		)
	}
}

class InvalidPropOutsideOfContext extends CustomError {
	public constructor(
		props: KottiField.PropsInternal,
		propName: keyof KottiField.PropsInternal,
	) {
		super(
			createErrorMessage(props, [
				`Encountered a KtField with a “${propName}” outside a KtForm.`,
				'This is most likely a mistake and should be removed.',
			]),
		)
	}
}

class DisabledSetValueCalled extends CustomError {
	public constructor(props: KottiField.PropsInternal) {
		super(
			createErrorMessage(props, [
				'Attempted to setValue on a disabled field.',
				'Diasbled fields should never call setValue as it causes unexpected behavior.',
			]),
		)
	}
}

export const KtFieldErrors = {
	DisabledSetValueCalled,
	ImplicitFormKeyNone,
	InvalidPropOutsideOfContext,
}
