import { yocoIconSchema } from '@3yourmind/yoco'
import { Ref, SetupContext } from '@vue/composition-api'
import { z } from 'zod'

import { FORM_KEY_NONE } from './constants'

export namespace KottiField {
	export enum Size {
		LARGE = 'large',
		MEDIUM = 'medium',
		SMALL = 'small',
	}

	export namespace Validation {
		export const emptySchema = z.object({
			type: z.literal('empty'),
		})
		export type Empty = z.output<typeof emptySchema>

		export const errorSchema = z.object({
			type: z.literal('error'),
			text: z.string().nullable(),
		})
		export type Error = z.output<typeof errorSchema>

		export const successSchema = z.object({
			type: z.literal('success'),
			text: z.string().nullable(),
		})
		export type Success = z.output<typeof successSchema>

		export const warningSchema = z.object({
			type: z.literal('warning'),
			text: z.string().nullable(),
		})
		export type Warning = z.output<typeof warningSchema>

		export const resultSchema = z.union([
			emptySchema,
			errorSchema,
			successSchema,
			warningSchema,
		])
		export type Result = z.output<typeof resultSchema>

		export const functionSchema = z.function(z.tuple([z.any()]), resultSchema)
		export type Function = z.output<typeof functionSchema>
	}

	export namespace Hook {
		export interface Parameters<DATA_TYPE, PLACEHOLDER_TYPE> {
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
			props: KottiField.Props
			supports: KottiField.Supports
		}

		export type Returns<DATA_TYPE, PLACEHOLDER_TYPE> = Pick<
			KottiField.Props,
			| 'helpDescription'
			| 'helpText'
			| 'hideClear'
			| 'hideValidation'
			| 'isDisabled'
			| 'isLoading'
			| 'isOptional'
			| 'size'
			| 'label'
			| 'leftIcon'
			| 'prefix'
			| 'rightIcon'
			| 'suffix'
		> & {
			currentValue: KottiField.Props['value']
			inputProps: Readonly<{
				/**
				 * Native HTML Props should have lowercase keys
				 */
				'data-test': string
				disabled: boolean
				tabindex: KottiField.Props['tabIndex']
			}>
			isEmpty: boolean
			setValue: (newValue: DATA_TYPE) => void
			validation: Readonly<KottiField.Validation.Result>
		}

		export type ReturnsWithRefs<DATA_TYPE, PLACEHOLDER_TYPE> = {
			[KEY in keyof Returns<DATA_TYPE, PLACEHOLDER_TYPE>]: Ref<
				Returns<DATA_TYPE, PLACEHOLDER_TYPE>[KEY]
			>
		}
	}

	/**
	 * Includes, but is not limited to, properties that are not consumed by the KtForm itself,
	 * but rather just passed-down to all fields inside the form to make common
	 * tasks like disabling the entire form or hiding validation easier.
	 *
	 * These values can be explicitly overriden in the field usage
	 */
	export const inheritablePropsSchema = z.object({
		/**
		 * Is the field disabled?
		 * This will e.g. prevent changing the value
		 */
		isDisabled: z.boolean().default(false),

		/**
		 * Show a skeleton in place of the field
		 */
		isLoading: z.boolean().default(false),

		/**
		 * Should the user have the option to clear the field
		 */
		hideClear: z.boolean().default(false),

		/**
		 * Prevents the validation (e.g. color, text) from being shown
		 */
		hideValidation: z.boolean().default(false),

		/**
		 * Defines the size of the field which influences child styles
		 * to make fields e.g. appear more compact
		 */
		size: z.nativeEnum(Size).nullable().default(null),
	})
	export type InhertiableProps = z.output<typeof inheritablePropsSchema>

	export const propsSchema = inheritablePropsSchema.extend({
		/**
		 * Specifies that the data KtFormContext[formKey]
		 * If formKey is "NONE", it is treated as an explicit opt-out
		 * of the context-based behavior
		 */
		formKey: z
			.union([z.string(), z.literal(FORM_KEY_NONE)])
			.nullable()
			.default(null),

		/**
		 * Adds a small questionmark popover to the label to explain
		 * more complicated forms to the user on-demand
		 */
		helpDescription: z.string().nullable().default(null),
		/**
		 * Adds a description below the label
		 */
		helpText: z.string().nullable().default(null),

		/**
		 * Shows a Yoco icon on the left side of the field
		 */
		leftIcon: yocoIconSchema.nullable().default(null),

		// TODO: Make sure to extend it in on all fields,
		/**
		 * Shown when no value was entered yet
		 *
		 * This is unknown, and specified by each component's schema,
		 * as KtFieldDateRange needs two placeholders [string | null, string | null]
		 */
		placeholder: z.unknown(),

		/**
		 * Shows a Yoco icon on the right side of the field
		 */
		rightIcon: yocoIconSchema.nullable().default(null),

		isOptional: z.boolean().default(false),
		label: z.string().nullable().default(null),

		/**
		 * Show some string before the field
		 */
		prefix: z.string().nullable().default(null),

		/**
		 * Show some string after the field
		 */
		suffix: z.string().nullable().default(null),

		tabIndex: z.number().default(0),

		validator: KottiField.Validation.functionSchema.nullable().default(null),

		/**
		 * @default props.formKey
		 * Explicitly overwrite the used validator in case it differs from the formKey
		 */
		validatorKey: z.string().nullable().default(null),

		// TODO: make sure to extend it on all fields
		/**
		 * v-model value
		 */
		value: z.unknown(),
	})
	export type Props = z.output<typeof propsSchema>

	/**
	 * Object that explicitly specifies which of the KtField.Props are
	 * supported, since it may not always make sense to have some of
	 * the props on certain fields.
	 */
	export const supportsSchema = z.object({
		/**
		 * In some fields, having a clear button would be nonsensical (e.g. KtFieldToggle)
		 */
		clear: z.boolean(),

		/**
		 * Affects all decoration properties like icons and affixes.
		 * These aren’t supported on e.g. the KtFieldToggleGroup
		 */
		decoration: z.boolean(),

		/**
		 * Some components don’t have a well-defined place to put placeholders
		 */
		placeholder: z.boolean(),

		/**
		 * Some third-party components do not support passing a custom tabIndex
		 */
		tabIndex: z.boolean(),
	})
	export type Supports = z.output<typeof supportsSchema>

	export const translationsSchema = z.object({
		optionalLabel: z.string(),
		requiredMessage: z.string(),
	})
	export type Translations = z.output<typeof translationsSchema>
}
