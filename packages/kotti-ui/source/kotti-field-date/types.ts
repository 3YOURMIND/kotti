import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

import { DATE_FORMAT_REGEX, DATE_TIME_FORMAT_REGEX } from './constants'

export namespace Shared {
	export const dateShortcutSchema = z.object({
		keepOpen: z.boolean().optional(),
		label: z.string(),
	})

	export const propsSchema = KottiField.propsSchema
		.merge(
			KottiField.potentiallySupportedPropsSchema.pick({
				hideClear: true,
				isBorderless: true,
			}),
		)
		.extend({
			maximumDate: z
				.union([
					z.string().regex(DATE_FORMAT_REGEX),
					z.string().regex(DATE_TIME_FORMAT_REGEX),
				])
				.nullable()
				.default(null),
			minimumDate: z
				.union([
					z.string().regex(DATE_FORMAT_REGEX),
					z.string().regex(DATE_TIME_FORMAT_REGEX),
				])
				.nullable()
				.default(null),
		})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export type Translations = {
		cancelButton: string
		confirmButton: string
		hours: string
		minutes: string
		seconds: string
	}
}

export namespace KottiFieldDate {
	export const modelValueSchema = z.string().regex(DATE_FORMAT_REGEX).nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export const propsSchema = Shared.propsSchema.extend({
		modelValue: modelValueSchema.default(null),
		placeholder: z.string().nullable().default(null),
		shortcuts: z
			.array(
				Shared.dateShortcutSchema.extend({
					value: z.string().regex(DATE_FORMAT_REGEX),
				}),
			)
			.default(() => []),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiFieldDateRange {
	export const modelValueSchema = z.tuple([
		z.string().regex(DATE_FORMAT_REGEX).nullable(),
		z.string().regex(DATE_FORMAT_REGEX).nullable(),
	])
	export type ModelValue = z.output<typeof modelValueSchema>

	export const propsSchema = Shared.propsSchema.extend({
		modelValue: modelValueSchema.default((): [null, null] => [null, null]),
		placeholder: z
			.tuple([z.string().nullable(), z.string().nullable()])
			.default((): [null, null] => [null, null]),
		shortcuts: z
			.array(
				Shared.dateShortcutSchema.extend({
					value: z.tuple([
						z.string().regex(DATE_FORMAT_REGEX),
						z.string().regex(DATE_FORMAT_REGEX),
					]),
				}),
			)
			.default(() => []),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiFieldDateTime {
	export const modelValueSchema = z
		.string()
		.regex(DATE_TIME_FORMAT_REGEX)
		.nullable()
	export type ModelValue = z.output<typeof modelValueSchema>

	export const propsSchema = Shared.propsSchema.extend({
		modelValue: modelValueSchema.default(null),
		placeholder: z.string().nullable().default(null),
		shortcuts: z
			.array(
				Shared.dateShortcutSchema.extend({
					value: z.string().regex(DATE_TIME_FORMAT_REGEX),
				}),
			)
			.default(() => []),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiFieldDateTimeRange {
	export const modelValueSchema = z.tuple([
		z.string().regex(DATE_TIME_FORMAT_REGEX).nullable(),
		z.string().regex(DATE_TIME_FORMAT_REGEX).nullable(),
	])
	export type ModelValue = z.output<typeof modelValueSchema>

	export const propsSchema = Shared.propsSchema.extend({
		modelValue: modelValueSchema.default((): [null, null] => [null, null]),
		placeholder: z
			.tuple([z.string().nullable(), z.string().nullable()])
			.default((): [null, null] => [null, null]),
		shortcuts: z
			.array(
				Shared.dateShortcutSchema.extend({
					value: z.tuple([
						z.string().regex(DATE_TIME_FORMAT_REGEX),
						z.string().regex(DATE_TIME_FORMAT_REGEX),
					]),
				}),
			)
			.default(() => []),
	})

	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
