import { Ref } from '@vue/composition-api'

import { KottiField } from '../kotti-field/types'

export namespace KottiForm {
	export interface Context<
		CONTEXT_TYPE extends ContextType = ContextType,
		T extends keyof CONTEXT_TYPE = keyof CONTEXT_TYPE
	> {
		setValue: (formKey: T, newValue: CONTEXT_TYPE[T]) => void
		hideValidation: Ref<boolean>
		isLoading: Ref<boolean>
		onAddField: <DATA_TYPE>(toAdd: KottiField.Returns<DATA_TYPE>) => void
		onRemoveField: <DATA_TYPE>(toRemove: KottiField.Returns<DATA_TYPE>) => void
		validators: Ref<Record<string, KottiField.Validation.Function>>
		values: Ref<CONTEXT_TYPE>
	}

	export type ContextType = Record<string, unknown>
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface AdditionalContext {
		// TODO: notReallyFormKey: Array<string | number>
	}

	export interface ValidationSummary {
		errors: Array<KottiField.Validation.Error & AdditionalContext>
		successes: Array<KottiField.Validation.Success & AdditionalContext>
		warnings: Array<KottiField.Validation.Warning & AdditionalContext>
	}

	export namespace Events {
		export interface Submit<CONTEXT_TYPE extends ContextType = ContextType> {
			validationSummary: KottiForm.ValidationSummary
			values: CONTEXT_TYPE
		}
	}
}
