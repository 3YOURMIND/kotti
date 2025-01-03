import type { KottiField } from '../kotti-field/types'

import type { KottiForm } from './types'

export const getValidationSummary = (
	validations: ReadonlyArray<KottiField.Validation.Result>,
): KottiForm.ValidationSummary =>
	validations.reduce<KottiForm.ValidationSummary>(
		(accumulator, validation) => {
			switch (validation.type) {
				case 'empty':
					return accumulator

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
			}
		},
		{
			errors: [],
			successes: [],
			warnings: [],
		},
	)
