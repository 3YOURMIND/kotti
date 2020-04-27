import { CustomError } from 'ts-custom-error'

import { KottiField } from '../kotti-field/types'

import { KottiForm } from './types'

const createOnSubmitErrorMessage = (messages: string[]) =>
	`KottForm(onSubmit): ${messages.join('\n')}`

class UnexpectedValidationState extends CustomError {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public constructor(props: KottiForm.Props) {
		super(
			createOnSubmitErrorMessage(['Encountered Unexpected Validation State']),
		)
	}
}

class ValidationError extends CustomError {
	public constructor(
		props: KottiForm.Props,
		type: Extract<KottiForm.Props['preventSubmissionOn'], 'error' | 'warning'>,
		validations: KottiField.Validation.Result[],
	) {
		super(
			createOnSubmitErrorMessage([
				`Encountered validation with type “${type}” onSubmit:`,
				JSON.stringify(validations, null, '\t'),
				`Preventing submission according to preventSubmissionOn="${props.preventSubmissionOn}".`,
			]),
		)
	}
}

export const KtFormErrors = {
	UnexpectedValidationState,
	ValidationError,
}
