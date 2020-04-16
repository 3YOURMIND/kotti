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
		isValid: Ref<boolean>
		setValue: Ref<(newValue: DATA_TYPE) => void>
	}
}
