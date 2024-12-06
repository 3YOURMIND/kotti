import type { Ref } from 'vue'
import { z } from 'zod'

import { yocoIconSchema } from '@3yourmind/yoco'

import type { ReplaceRecordType } from '../types/utilities'
import { createLooseZodEnumSchema } from '../zod-utilities/enums'

import { FORM_KEY_NONE } from './constants'

export module KottiField {
	export enum Size {
		LARGE = 'large',
		MEDIUM = 'medium',
		SMALL = 'small',
	}

	export module Validation {
		export const emptySchema = z.object({
			type: z.literal('empty'),
		})
		export type Empty = z.output<typeof emptySchema>

		export const errorSchema = z.object({
			text: z.string().nullable(),
			type: z.literal('error'),
		})
		export type Error = z.output<typeof errorSchema>

		export const successSchema = z.object({
			text: z.string().nullable(),
			type: z.literal('success'),
		})
		export type Success = z.output<typeof successSchema>

		export const warningSchema = z.object({
			text: z.string().nullable(),
			type: z.literal('warning'),
		})
		export type Warning = z.output<typeof warningSchema>

		export const resultSchema = z.union([
			emptySchema,
			errorSchema,
			successSchema,
			warningSchema,
		])
		export type Result = z.output<typeof resultSchema>

		export const functionSchema = z
			.function()
			.args(z.any())
			.returns(resultSchema)
		export type Function = z.output<typeof functionSchema>
	}

	export module Hook {
		export interface Parameters<DATA_TYPE> {
			emit: (name: 'input', ...args: unknown[]) => void

			/**
			 * Useful for checking validation on required fields
			 */
			isEmpty: (value: DATA_TYPE) => boolean
			props: KottiField.PropsInternal
			supports: KottiField.Supports
		}

		export type Returns<DATA_TYPE> = Pick<
			KottiField.PropsInternal,
			| 'helpDescription'
			| 'helpText'
			| 'hideClear'
			| 'hideValidation'
			| 'isDisabled'
			| 'isLoading'
			| 'isOptional'
			| 'label'
			| 'leftIcon'
			| 'prefix'
			| 'rightIcon'
			| 'showVisibilityToggle'
			| 'size'
			| 'suffix'
		> & {
			currentValue: DATA_TYPE
			inputProps: Readonly<{
				/**
				 * Native HTML Props should have lowercase keys
				 */
				'data-test': string
				disabled: boolean
				id: string
				tabindex: KottiField.PropsInternal['tabIndex']
			}>
			isEmpty: boolean
			setValue(newValue: DATA_TYPE, options?: { forceUpdate: boolean }): void
			validation: Readonly<KottiField.Validation.Result>
		}

		export type ReturnsWithRefs<DATA_TYPE> = {
			[KEY in keyof Returns<DATA_TYPE>]: Ref<Returns<DATA_TYPE>[KEY]>
		}
	}

	export enum AutoComplete {
		OFF = 'off',
		ON = 'on',
	}

	/**
	 * Each attribute on KottiField.Supports maps to one or more
	 * KtField prop, as follows:
	 * {
	 * 	clear: ['hideClear']
	 * 	decoration: ['leftIcon', 'rightIcon', 'prefix', 'suffix']
	 * 	tabIndex: ['tabIndex']
	 * 	placeholder: ['placeholder']
	 * }
	 *
	 * The schema is only concerned with props that would have the same type,
	 * if extended (e.g. decoration props).
	 * Therefore, doesn't include `placeholder` since it is extended
	 * differently per field.
	 */
	export const potentiallySupportedPropsSchema = z.object({
		autoComplete: z
			.union([
				z.literal(AutoComplete.ON),
				z.literal(AutoComplete.OFF),
				z.string(),
			])
			.default(AutoComplete.OFF),
		hideClear: z.boolean().default(false),
		leftIcon: yocoIconSchema.nullable().default(null),
		prefix: z.string().nullable().default(null),
		rightIcon: yocoIconSchema.nullable().default(null),
		showVisibilityToggle: z.boolean().default(false),
		suffix: z.string().nullable().default(null),
		tabIndex: z.number().default(0),
	})

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
		 * Show a skeleton in place of the input area of the field
		 */
		isLoading: z.boolean().default(false),

		/**
		 * Should the user have the option to clear the field
		 *
		 * This is never by default and specified by component schemas that need it
		 */
		hideClear: z.never(),

		/**
		 * Prevents the validation (e.g. color, text) from being shown
		 */
		hideValidation: z.boolean().default(false),
		showVisibilityToggle: z.boolean().default(false),

		/**
		 * Defines the size of the field which influences child styles
		 * to make fields e.g. appear more compact
		 */
		size: createLooseZodEnumSchema(Size).nullable().default(null),
	})

	export type InheritableProps = z.input<typeof inheritablePropsSchema>
	/**
	 * Warning: All values of type `never` are replaced with `any`
	 */
	export type InheritablePropsInternal = ReplaceRecordType<
		z.output<typeof inheritablePropsSchema>
	>

	export const propsSchema = inheritablePropsSchema.extend({
		/**
		 * Is used as the 'data-test' property
		 * on the input level
		 */
		dataTest: z.string().nullable().default(null),

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
		 *
		 * This is never by default and specified by component schemas that need it.
		 */
		leftIcon: z.never(),

		/**
		 * Shown when no value was entered yet
		 *
		 * This is never by default and specified by component schemas that need it
		 *
		 * The overridden type may differ
		 * e.g. KtFieldDateRange needs two placeholders `[string | null, string | null]`
		 */
		placeholder: z.never(),

		/**
		 * Shows a Yoco icon on the right side of the field
		 *
		 * This is never by default and specified by component schemas that need it
		 */
		isOptional: z.boolean().default(false),

		label: z.string().nullable().default(null),

		rightIcon: z.never(),

		/**
		 * Show some an eye icon on the right side of the field to hide/show the field content
		 *
		 * This is false by default and is meant to be used for KtFieldPassword
		 */
		showVisibilityToggle: z.boolean().default(false),
		/**
		 * Show some string before the field
		 *
		 * This is never by default and specified by component schemas that need it
		 */
		prefix: z.never(),

		/**
		 * Show some string after the field
		 *
		 * This is never by default and specified by component schemas that need it
		 */
		suffix: z.never(),

		/**
		 * This is never by default and specified by component schemas that need it
		 */
		tabIndex: z.never(),

		/**
		 * Without a validator, everything will always default to being valid
		 */
		validator: KottiField.Validation.functionSchema.default(() => ({
			type: 'empty',
		})),

		/**
		 * This is never, and specified by each component's schema
		 * v-model value
		 */
		value: z.never(),
	})
	export type Props = z.input<typeof propsSchema>
	/**
	 * Warning: All keys of type `never` are replaced with `any`
	 */
	export type PropsInternal = ReplaceRecordType<z.output<typeof propsSchema>>

	/**
	 * Object that explicitly specifies which of the KtField.Props are
	 * supported, since it may not always make sense to have some of
	 * the props on certain fields.
	 */
	export type Supports = {
		/**
		 * All fields except KtFieldToggle (checkbox), KtFieldRadioGroup (radio), KtFieldFileUpload,
		 * and KtFieldDate[Range|Time|TimeRange]
		 */
		autoComplete: boolean

		/**
		 * In some fields, having a clear button would be nonsensical (e.g. KtFieldToggle)
		 */
		clear: boolean

		/**
		 * Affects all decoration properties like icons and affixes.
		 * These aren’t supported on e.g. the KtFieldToggleGroup
		 */
		decoration: boolean

		/**
		 * Some components don’t have a well-defined place to put placeholders
		 */
		placeholder: boolean

		/**
		 * Some third-party components do not support passing a custom tabIndex
		 */
		tabIndex: boolean
	}

	export type Translations = {
		optionalLabel: string
		requiredMessage: string
	}
}
