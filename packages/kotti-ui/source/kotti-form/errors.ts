import type { KottiField } from '../kotti-field/types'

import type { KottiForm } from './types'

const createOnSubmitErrorMessage = (messages: string[]) =>
	`KottiForm(onSubmit): ${messages.join('\n')}`

class UnexpectedValidationStateError extends Error {
	constructor(_props: KottiForm.Props) {
		super(
			createOnSubmitErrorMessage(['Encountered Unexpected Validation State']),
		)
		this.name = 'UnexpectedValidationStateError'
	}
}

class ValidationError extends Error {
	constructor(
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
		this.name = 'ValidationError'
	}
}

export const ktFormErrors = {
	UnexpectedValidationStateError,
	ValidationError,
}
