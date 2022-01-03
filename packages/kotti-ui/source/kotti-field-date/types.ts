import dayjs from 'dayjs'
import { z } from 'zod'

import { KottiField } from '../kotti-field/types'

import { DATE_FORMAT_REGEX, DATE_TIME_FORMAT_REGEX } from './constants'

export namespace Shared {
	export const dateShortcutSchema = z.object({
		keepOpen: z.boolean().optional(),
		label: z.string(),
		value: z.string().regex(DATE_FORMAT_REGEX),
	})
	export const dateTimeShortcutSchema = Shared.dateShortcutSchema.extend({
		value: z.string().regex(DATE_TIME_FORMAT_REGEX),
	})

	export const valueSchema = z.string().nullable()
	/**
	 * ISO8601
	 */
	export type Value = z.output<typeof valueSchema>

	export const propsSchema = KottiField.propsSchema.extend({
		maximumDate: z
			.string()
			.refine((value) => dayjs(value).format('YYYY-MM-DD') === value)
			.nullable()
			.default(null),
		minimumDate: z
			.string()
			.refine((value) => dayjs(value).format('YYYY-MM-DD') === value)
			.nullable()
			.default(null),
		shortcuts: z.array(dateShortcutSchema).default(() => []),
		placeholder: z.string().nullable().default(null),
		value: valueSchema.default(null),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>

	export namespace Range {
		export const dateShortcutSchema = Shared.dateShortcutSchema.extend({
			value: z.tuple([
				z.string().regex(DATE_FORMAT_REGEX),
				z.string().regex(DATE_FORMAT_REGEX),
			]),
		})
		export const dateTimeShortcutSchema = Shared.dateShortcutSchema.extend({
			value: z.tuple([
				z.string().regex(DATE_TIME_FORMAT_REGEX),
				z.string().regex(DATE_TIME_FORMAT_REGEX),
			]),
		})

		export const valueSchema = z.tuple([
			z.string().nullable(),
			z.string().nullable(),
		])

		/**
		 * [ ISO8601, ISO8601 ]
		 */
		export type Value = z.output<typeof valueSchema>

		export const propsSchema = Shared.propsSchema.extend({
			placeholder: z
				.tuple([z.string().nullable(), z.string().nullable()])
				.default([null, null]),
			shortcuts: z.array(Range.dateShortcutSchema).default(() => []),
			value: Range.valueSchema.default([null, null]),
		})
		export type Props = z.input<typeof Range.propsSchema>
		export type PropsInternal = z.output<typeof Range.propsSchema>
	}
}

export namespace KottiFieldDate {
	export type Value = Shared.Value

	export const propsSchema = Shared.propsSchema
	export type Props = Shared.Props
	export type PropsInternal = Shared.PropsInternal
}

export namespace KottiFieldDateRange {
	export type Value = Shared.Range.Value

	export const propsSchema = Shared.Range.propsSchema
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiFieldDateTime {
	export type Value = Shared.Value

	export const propsSchema = Shared.propsSchema.extend({
		shortcuts: z.array(Shared.dateTimeShortcutSchema).default(() => []),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}

export namespace KottiFieldDateTimeRange {
	export type Value = Shared.Range.Value

	export const propsSchema = Shared.Range.propsSchema.extend({
		shortcuts: z.array(Shared.Range.dateTimeShortcutSchema).default(() => []),
	})
	export type Props = z.input<typeof propsSchema>
	export type PropsInternal = z.output<typeof propsSchema>
}
