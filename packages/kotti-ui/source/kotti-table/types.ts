import { z } from 'zod'

import { KottiI18n } from '../kotti-i18n/types'

// TODO: move somewhere else
export type AnyRow = Record<string, unknown>

export module KottiTable {
	export const columnDisplaySchema = z.discriminatedUnion('type', [
		// TODO: getData should understand display.type
		// TODO: truncate text, ask how default behavior
		// TODO: attachments, needs design
		// TODO: image, array of urls as data, needs render functions
		// TODO: tuples with separator (e.g. "1234 x 23")
		z
			.object({
				align: z.enum(['center', 'left', 'right']),
				formatter: z
					.function()
					.args(
						z.unknown(),
						z
							.object({
								numberFormat: KottiI18n.numberFormatSchema,
								options: z.object({}).strict(),
							})
							.strict(),
					)
					.returns(z.string().nullable())
					.nullable(),
				isNumeric: z.boolean(),
				type: z.literal('custom'),
			})
			.strict(),
		z
			.object({
				decimalPlaces: z.number().int().finite().min(0).default(2),
				type: z.literal('numerical'),
			})
			.strict(),
		z.object({ type: z.literal('boolean') }).strict(),
		z.object({ type: z.literal('date') }).strict(),
		z.object({ type: z.literal('datetime') }).strict(),
		z.object({ type: z.literal('integer') }).strict(),
		z.object({ type: z.literal('text') }).strict(),
	])
	export type ColumnDisplay = z.input<typeof columnDisplaySchema>

	export const columnSchema = z
		.object({
			display: columnDisplaySchema,
			getData: z.function().args(z.any()).returns(z.unknown()),
			id: z.string(),
			isSortable: z.boolean().optional(),
			label: z.string(),
		})
		.strict()

	export type Column<
		ROW extends AnyRow,
		COLUMN_IDS extends string = string,
		DATA = unknown,
	> = {
		display: ColumnDisplay
		// TODO: make data dependent on type of display or sth
		getData: (row: ROW) => DATA
		id: COLUMN_IDS
		isSortable?: boolean
		label: string
	}

	// TODO: maybe not an export
	export const orderingSchema = z.array(
		z
			.object({
				id: z.string(),
				value: z.enum(['ascending', 'descending']),
			})
			.strict(),
	)

	export type Ordering = {
		id: string
		value: 'ascending' | 'descending'
	}

	export const propsSchema = z
		.object({
			id: z.string(),
			// TODO: desired?
			isNotScrollable: z.boolean().default(false),
		})
		.strict()
}
