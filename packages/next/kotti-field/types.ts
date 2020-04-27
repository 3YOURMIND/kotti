import { Ref, SetupContext } from '@vue/composition-api'
import { UnwrapRef } from '@vue/composition-api/dist/reactivity'

import { KottiForm } from '../kotti-form/types'
import { Yoco } from '../types'

import { FORM_KEY_NONE } from './constants'

export namespace KottiField {
	export namespace Hook {
		export interface Parameters<DATA_TYPE> {
			emit: SetupContext['emit']

			/**
			 * This is a function that will be called when the value of
			 * the field changes to ensure that the data type is correct
			 */
			isCorrectDataType: (value: unknown) => value is DATA_TYPE
			props: KottiField.Props<DATA_TYPE>
		}

		export type Returns<DATA_TYPE = unknown> = UnwrapRef<
			KottiField.Hook.ReturnsWithRefs<DATA_TYPE>
		>

		export interface ReturnsWithRefs<DATA_TYPE extends unknown> {
			classes: Ref<KottiField.Props<DATA_TYPE>['classes']>
			currentValue: Ref<DATA_TYPE>
			helpText: Ref<KottiField.Props<DATA_TYPE>['helpText']>
			hideClear: Ref<KottiField.Props<DATA_TYPE>['hideClear']>
			hideValidation: KottiForm.Context['hideValidation']
			isDisabled: Ref<KottiField.Props<DATA_TYPE>['isDisabled']>
			isLoading: KottiForm.Context['isLoading']
			isOptional: Ref<KottiField.Props<DATA_TYPE>['isOptional']>
			label: Ref<KottiField.Props<DATA_TYPE>['label']>
			leftIcon: Ref<KottiField.Props<DATA_TYPE>['leftIcon']>
			placeholder: Ref<KottiField.Props<DATA_TYPE>['placeholder']>
			prefix: Ref<KottiField.Props<DATA_TYPE>['prefix']>
			rightIcon: Ref<KottiField.Props<DATA_TYPE>['rightIcon']>
			setValue: Ref<(newValue: DATA_TYPE) => void>
			suffix: Ref<KottiField.Props<DATA_TYPE>['suffix']>
			tabIndex: Ref<KottiField.Props<DATA_TYPE>['tabIndex']>
			validation: Ref<KottiField.Validation.Result>
		}
	}

	/**
	 * When adding a new prop, please make sure that no KtFormField
	 * already uses a prop with the same name, to avoid conflicts
	 */
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	export interface Props<DATA_TYPE extends any> {
		classes: {
			/**
			 * Adds custom classes to the main part of the input field
			 */
			field?: string

			/**
			 * Adds custom classes to the grouping wrapper around the main part of the input field
			 */
			group?: string

			/**
			 * Adds custom classes to the label of the field
			 */
			label?: string

			/**
			 * Adds custom classes to the left icon of the field. This is mostly useful for coloring
			 */
			leftIcon?: string

			/**
			 * Adds custom classes to the right icon of the field. This is mostly useful for coloring
			 */
			rightIcon?: string

			/**
			 * Adds custom classes to the wrapper around the field
			 */
			wrapper?: string
		}

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
		 * Shows a Yoco icon on the left side of the field
		 */
		leftIcon: Yoco.Icon | null

		/**
		 * Shows a Yoco icon on the right side of the field
		 */
		rightIcon: Yoco.Icon | null

		/**
		 * Is the field disabled?
		 * This will e.g. prevent changing the value
		 */
		isDisabled: boolean
		isLoading: boolean
		isOptional: boolean
		label: string | null
		placeholder: string | null

		/**
		 * Show some string before the field
		 */
		prefix: string | null

		/**
		 * Show some string after the field
		 */
		suffix: string | null
		tabIndex: number
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

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		export type Function = (value: any) => KottiField.Validation.Result
	}
}
