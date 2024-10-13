import type { Ref } from 'vue'

import type { KottiField } from '../kotti-field/types'

export module KottiForm {
	export interface Context<
		CONTEXT_TYPE extends ContextType = ContextType,
		T extends keyof CONTEXT_TYPE = keyof CONTEXT_TYPE,
	> {
		fieldInheritableProps: Ref<KottiField.InheritablePropsInternal>

		formPath: Ref<ReadonlyArray<number | string>>

		onAddField: <DATA_TYPE>(toAdd: KottiField.Hook.Returns<DATA_TYPE>) => void
		onRemoveField: <DATA_TYPE>(
			toRemove: KottiField.Hook.Returns<DATA_TYPE>,
		) => void

		setValue: (formKey: T, newValue: CONTEXT_TYPE[T]) => void
		validators: Ref<Record<string, KottiField.Validation.Function>>
		values: Ref<CONTEXT_TYPE>
	}

	export interface SubmitContext {
		isLoading: Ref<boolean>
		isValid: Ref<boolean>
		validationSummary: Ref<KottiForm.ValidationSummary>
	}

	export type ContextType = Record<string, unknown>

	export type Props = KottiField.InheritablePropsInternal & {
		/**
		 * Form Identifier
		 * defaults to sequential identifier
		 * can otherwise be provided
		 * current use-case: for computed dataTest prop
		 * can be useful otherwise
		 */
		formId: string

		/**
		 * @default warning
		 * error: prevent if errors.length > 0
		 * warning: prevent if [...errors, ...warnings].length > 0
		 * NEVER: allow submission, regardless of validation status
		 */
		preventSubmissionOn: 'error' | 'NEVER' | 'warning'

		validators: Record<string, KottiField.Validation.Function>

		value: ContextType
	}

	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface AdditionalContext {
		// TODO: notReallyFormKey: Array<string | number>
	}

	export interface ValidationSummary {
		errors: Array<AdditionalContext & KottiField.Validation.Error>
		successes: Array<AdditionalContext & KottiField.Validation.Success>
		warnings: Array<AdditionalContext & KottiField.Validation.Warning>
	}

	export module Events {
		export interface Submit<CONTEXT_TYPE extends ContextType = ContextType> {
			validationSummary: KottiForm.ValidationSummary
			values: CONTEXT_TYPE
		}
	}
}
