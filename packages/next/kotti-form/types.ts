import { Ref } from '@vue/composition-api'

import { KottiField } from '../kotti-field/types'

export namespace KottiForm {
	export interface Context<
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		CONTEXT_TYPE extends Record<string, any> = Record<string, any>
	> {
		setValue: <T extends keyof CONTEXT_TYPE>(
			formKey: T,
			newValue: CONTEXT_TYPE[T],
		) => void
		hideValidation: Ref<boolean>
		isLoading: Ref<boolean>
		validators: Ref<Record<string, KottiField.Validation.Function>>
		values: Ref<CONTEXT_TYPE>
	}
}
