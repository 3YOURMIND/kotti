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

			/**
			 * Useful for checking validation on required fields
			 */
			isEmpty: (value: DATA_TYPE) => boolean
			props: KottiField.Props<DATA_TYPE>
			supports: KottiField.Supports
		}

		export type Returns<DATA_TYPE = unknown> = UnwrapRef<
			KottiField.Hook.ReturnsWithRefs<DATA_TYPE>
		>

		export interface ReturnsWithRefs<DATA_TYPE extends unknown> {
			currentValue: Ref<KottiField.Props<DATA_TYPE>['value']>
			helpText: Ref<KottiField.Props<DATA_TYPE>['helpText']>
			hideClear: Ref<KottiField.Props<DATA_TYPE>['hideClear']>
			hideValidation: KottiForm.Context['hideValidation']
			inputProps: Ref<
				/**
				 * Native HTML Props should have lowercase keys
				 */
				Readonly<{
					'data-test': string
					disabled: boolean
					tabindex: KottiField.Props<DATA_TYPE>['tabIndex']
				}>
			>
			isDisabled: Ref<KottiField.Props<DATA_TYPE>['isDisabled']>
			isEmpty: Ref<boolean>
			isLoading: Ref<KottiForm.Props['isLoading']>
			isOptional: Ref<KottiField.Props<DATA_TYPE>['isOptional']>
			isSmall: Ref<KottiField.Props<DATA_TYPE>['isSmall']>
			label: Ref<KottiField.Props<DATA_TYPE>['label']>
			leftIcon: Ref<KottiField.Props<DATA_TYPE>['leftIcon']>
			placeholder: Ref<KottiField.Props<DATA_TYPE>['placeholder']>
			prefix: Ref<KottiField.Props<DATA_TYPE>['prefix']>
			rightIcon: Ref<KottiField.Props<DATA_TYPE>['rightIcon']>
			setValue: Ref<(newValue: DATA_TYPE) => void>
			suffix: Ref<KottiField.Props<DATA_TYPE>['suffix']>
			validation: Ref<KottiField.Validation.Result>
		}
	}

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
		isSmall: boolean
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

	/**
	 * Object that explicitly specifies which of the KtField.Props are
	 * supported, since it may not always make sense to have some of
	 * the props on certain fields.
	 */
	export type Supports = {
		/**
		 * In some fields, having a clear button would be nonsensical (e.g. KtFieldCheckbox)
		 */
		clear: boolean

		/**
		 * Affects all decoration properties like icons and affixes.
		 * These aren’t supported on e.g. the KtFieldCheckboxGroup
		 */
		decoration: boolean

		/**
		 * E.g. KtFieldCheckbox can’t have a reasonable implementation for a placeholder text
		 */
		placeholder: boolean

		/**
		 * Some third-party components do not support passing a custom tabIndex
		 */
		tabIndex: boolean
	}

	export namespace Validation {
		export type Empty = {
			type: null
		}

		export type Error = {
			type: 'error'
			text: string | null
		}

		export type Success = {
			type: 'success'
			text: string | null
		}

		export type Warning = {
			type: 'warning'
			text: string | null
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
