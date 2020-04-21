import { Ref } from '@vue/composition-api'

import { FORM_KEY_NONE } from './constants'

export namespace KottiField {
	/**
	 * When adding a new prop, please make sure that no KtFormField
	 * already uses a prop with the same name, to avoid conflicts
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export interface Props<DATA_TYPE extends any> {
		/**
		 * Specifies that the data KtFormContext[formKey]
		 * If formKey is "NONE", it is treated as an explicit opt-out
		 * of the context-based behavior
		 */
		formKey: typeof FORM_KEY_NONE | string | null

		/**
		 * Adds a small questionmark popover to the label to explain
		 * more complicated forms to the user on-demand
		 */
		helpText: string | null

		/**
		 * Is the field disabled?
		 * This will e.g. prevent changing the value
		 */
		isDisabled: boolean

		isOptional: boolean

		label: string | null

		validator: KottiField.Validation.Function | null

		/**
		 * @default props.formKey
		 * Explicitly overwrite the used validator in case it differs from the formKey
		 * @example
		 * FIXME: Add Example
		 */
		validatorKey: string | null

		/**
		 * v-model value
		 */
		value: DATA_TYPE
	}

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export interface Returns<DATA_TYPE extends any> {
		currentValue: Ref<DATA_TYPE>
		isDisabled: Ref<KottiField.Props<DATA_TYPE>['isDisabled']>
		isOptional: Ref<KottiField.Props<DATA_TYPE>['isOptional']>
		label: Ref<KottiField.Props<DATA_TYPE>['label']>
		helpText: Ref<KottiField.Props<DATA_TYPE>['helpText']>
		setValue: Ref<(newValue: DATA_TYPE) => void>
		hideValidation: Ref<boolean>
		validation: Ref<KottiField.Validation.Result>
	}

	export namespace Validation {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		export type Function = (value: any) => KottiField.Validation.Result

		export type Result =
			| {
					type: 'error' | 'success' | 'warning'
					text: string
			  }
			| {
					type: null
			  }
	}
}
