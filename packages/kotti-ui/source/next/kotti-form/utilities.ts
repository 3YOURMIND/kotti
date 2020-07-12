import { KottiField } from '../kotti-field/types'

import { KottiForm } from './types'

export const getValidationSummary = (
	validations: ReadonlyArray<KottiField.Validation.Result>,
) =>
	validations.reduce<KottiForm.ValidationSummary>(
		(accumulator, validation) => {
			switch (validation.type) {
				case 'error':
					return {
						...accumulator,
						errors: [...accumulator.errors, validation],
					}

				case 'success':
					return {
						...accumulator,
						successes: [...accumulator.successes, validation],
					}

				case 'warning':
					return {
						...accumulator,
						warnings: [...accumulator.warnings, validation],
					}

				case null:
					return accumulator
			}
		},
		{
			errors: [],
			successes: [],
			warnings: [],
		},
	)
