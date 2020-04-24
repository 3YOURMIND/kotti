import { Ref } from '@vue/composition-api'
import { UnwrapRef } from '@vue/composition-api/dist/reactivity'

import { KottiForm } from '../kotti-form/types'

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
		 * Should the user have the option to clear the field
		 */
		hideClear: boolean

		/**
		 * Is the field disabled?
		 * This will e.g. prevent changing the value
		 */
		isDisabled: boolean

		isLoading: boolean
		isOptional: boolean

		label: string | null

		placeholder: string | null

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

	export interface ReturnsWithRefs<DATA_TYPE extends unknown> {
		currentValue: Ref<DATA_TYPE>
		helpText: Ref<KottiField.Props<DATA_TYPE>['helpText']>
		hideClear: Ref<KottiField.Props<DATA_TYPE>['hideClear']>
		hideValidation: KottiForm.Context['hideValidation']
		isDisabled: Ref<KottiField.Props<DATA_TYPE>['isDisabled']>
		isLoading: KottiForm.Context['isLoading']
		isOptional: Ref<KottiField.Props<DATA_TYPE>['isOptional']>
		label: Ref<KottiField.Props<DATA_TYPE>['label']>
		placeholder: Ref<KottiField.Props<DATA_TYPE>['placeholder']>
		setValue: Ref<(newValue: DATA_TYPE) => void>
		validation: Ref<KottiField.Validation.Result>
	}

	export type Returns<DATA_TYPE = unknown> = UnwrapRef<
		KottiField.ReturnsWithRefs<DATA_TYPE>
	>

	export namespace Validation {
		export type Empty = {
			type: null
		}

		export type Error = {
			type: 'error'
			text: string
		}

		export type Success = {
			type: 'success'
			text: string
		}

		export type Warning = {
			type: 'warning'
			text: string
		}

		export type Result =
			| KottiField.Validation.Empty
			| KottiField.Validation.Error
			| KottiField.Validation.Success
			| KottiField.Validation.Warning

		export type Function = (value: unknown) => KottiField.Validation.Result
	}
}
