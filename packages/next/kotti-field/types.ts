import { Ref } from '@vue/composition-api'

import { FORM_KEY_NONE } from './constants'

export namespace KottiField {
	export namespace Validation {
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

	/**
	 * When adding a new prop, please make sure that no KtFormField
	 * already uses a prop with the same name, to avoid conflicts
	 */
	export interface Props<DATA_TYPE extends any> {
		/**
		 * Specifies that the data KtFormContext[formKey]
		 * If formKey is "NONE", it is treated as an explicit opt-out
		 * of the context-based behavior
		 */
		formKey: typeof FORM_KEY_NONE | string | null

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

	export interface Returns<DATA_TYPE extends any> {
		currentValue: Ref<DATA_TYPE>
		isDisabled: Ref<boolean>
		isOptional: Ref<boolean>
		label: Ref<string | null>
		setValue: Ref<(newValue: DATA_TYPE) => void>
		hideValidation: Ref<boolean>
		validation: Ref<KottiField.Validation.Result>
	}
}
