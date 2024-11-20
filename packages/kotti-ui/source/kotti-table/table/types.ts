import type { VNode } from 'vue'
import { z } from 'zod'

import { KottiI18n } from '../../kotti-i18n/types'

// TODO: move somewhere else
export type AnyRow = Record<string, unknown>

/**
 * @see {@link ./hooks.ts paramsSchema}
 */
export type GetRowBehavior<
	ROW extends AnyRow,
	ROW_BEHAVIOR_CLICK_COMPONENT extends string = string,
> = (params: { row: ROW; rowIndex: number }) => {
	classes?: string[]
	click?:
		| {
				/**
				 * For example for opening drawers. Should not be used for navigation. Also consider using normal link with
				 * a query parameter instead.
				 */
				component: null
				onClick: () => Promise<void> | void
		  }
		| 'expand'
		| ({
				/**
				 * This should be used in most use cases and would usually be a `router-link`
				 */
				component: ROW_BEHAVIOR_CLICK_COMPONENT
				on?: Record<string, unknown>
		  } & (ROW_BEHAVIOR_CLICK_COMPONENT extends 'a'
				? {
						props: {
							[k: string]: unknown
							href: string
						}
					}
				: { props?: Record<string, unknown> }))
	disable?: {
		// actions/canHover: { icon: Yoco.Icon; onClick: () => Promise<void> | void }[]
		click: boolean
		expand: boolean
		select: boolean
	}
	id: string
}

export module KottiTable {
	/**
	 * Keep in sync with its type expression
	 * @see DataDisplay
	 */
	export const columnDisplaySchema = z.discriminatedUnion('type', [
		// TODO: consider not exporting schemas
		// TODO: truncate text, ask how default behavior
		// TODO (nice-to-have): attachments, needs design
		// TODO (nice-to-have): image, array of urls as data, needs render functions
		// TODO (nice-to-have): tuples with separator (e.g. "1234 x 23")
		z
			.object({
				align: z.enum(['center', 'left', 'right']),
				disableCellClick: z.boolean(),
				formatter: z
					.function()
					.args(
						z.unknown(),
						z
							.object({
								numberFormat: KottiI18n.numberFormatSchema,
								options: z.object({}).passthrough(),
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
			// TODO: getData should understand display.type
			getData: z.function().args(z.any()).returns(z.unknown()),
			id: z.string(),
			isSortable: z.boolean().default(false),
			label: z.string(),
		})
		.strict()

	/**
	 * Keep in sync with its schema
	 * @see columnDisplaySchema
	 */
	type DataDisplay<ROW extends AnyRow> =
		| {
				display: {
					align: 'center' | 'left' | 'right'
					disableCellClick: boolean
					formatter?: unknown
					isNumeric: boolean
					type: 'custom'
				}
				getData: (row: ROW) => VNode | string | null
		  }
		| {
				display: { type: 'boolean' }
				getData: (row: ROW) => boolean
		  }
		| {
				display: { type: 'date' } | { type: 'date-time' } | { type: 'text' }
				getData: (row: ROW) => string
		  }
		| {
				display:
					| { decimalPlaces: number; type: 'numerical' }
					| { type: 'integer' }
				getData: (row: ROW) => number
		  }

	export type Column<
		ROW extends AnyRow,
		COLUMN_IDS extends string = string,
	> = DataDisplay<ROW> & {
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
			emptyText: z.string().default('No data'), // TODO translate
			isLoading: z.boolean().default(false),
			// TODO: desired?
			// TODO: bug: can lead to header cells wrapping content
			isNotScrollable: z.boolean().default(false),
			tableId: z.string(),
		})
		.strict()

	export enum PaginationType {
		LOCAL = 'LOCAL',
		REMOTE = 'REMOTE',
	}

	export const paginationSchema = z.discriminatedUnion('type', [
		z.object({
			state: z.object({
				pageIndex: z.number().int().finite().min(0),
				pageSize: z.number().int().finite().gt(0),
			}),
			type: z.literal(PaginationType.LOCAL),
		}),
		z.object({
			rowCount: z.number().int().finite().min(0),
			state: z.object({
				pageIndex: z.number().int().finite().min(0),
				pageSize: z.number().int().finite().gt(0),
			}),
			type: z.literal(PaginationType.REMOTE),
		}),
	])
	export type Pagination = z.output<typeof paginationSchema>
}
