import { Ref } from '@vue/composition-api'

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace KottiField {
	// FIXME: Implement Proper Validation with Support for success warning and error messages
	// export type Validation =
	// 	| {
	// 			type: 'success' | 'warning' | 'error'
	// 			text: string
	// 	  }
	// 	| {
	// 			type: null
	// 	  }

	/**
	 * When adding a new prop, please make sure that no KtFormField
	 * already uses a prop with the same name, to avoid conflicts
	 */
	export interface Props<DATA_TYPE extends any> {
		/**
		 * Specifies that the data KtFormContext[formKey]
		 */
		formKey: string | null

		/**
		 * Is the field disabled?
		 * This will e.g. prevent changing the value
		 */
		isDisabled: boolean

		isOptional: boolean

		label: string | null

		validator: (value: any) => string | true

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
		errorMessage: Ref<string | null>
		isDisabled: Ref<boolean>
		isOptional: Ref<boolean>
		isValid: Ref<boolean>
		label: Ref<string | null>
		setValue: Ref<(newValue: DATA_TYPE) => void>
	}
}
