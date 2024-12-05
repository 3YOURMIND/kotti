import type { VNode } from 'vue'
import { z } from 'zod'

import type { yocoIconSchema } from '@3yourmind/yoco'

// TODO: move somewhere else
export type AnyRow = Record<string, unknown>

/**
 * @see {@link ./hooks.ts paramsSchema}
 */
export type GetRowBehavior<
	ROW extends AnyRow,
	ROW_BEHAVIOR_CLICK_COMPONENT extends string = string,
> = (params: { row: ROW; rowIndex: number }) => {
	actions?: {
		dataTest?: string
		icon: z.input<typeof yocoIconSchema>
		isDisabled?: boolean
		onClick: () => Promise<void> | void
	}[]
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
		actions: boolean
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
	export const columnDisplaySchema =
		// TODO: consider not exporting schemas
		// TODO: truncate text, ask how default behavior
		// TODO (nice-to-have): attachments, needs design
		// TODO (nice-to-have): image, array of urls as data
		// TODO (nice-to-have): tuples with separator (e.g. "1234 x 23")
		z
			.object({
				align: z.enum(['center', 'left', 'right']),
				disableCellClick: z.boolean(),
				isNumeric: z.boolean(),
				render: z
					.function()
					.args(
						z.unknown(),
						z
							.object({
								// TODO: add schema?
								i18n: z.any(),
							})
							.strict(),
					)
					.returns(z.unknown())
					.nullable(),
			})
			.strict()
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
	type DataDisplay<ROW extends AnyRow, DATA = unknown> =
		| {
				display: {
					align: 'center' | 'left' | 'right'
					disableCellClick: boolean
					formatter: (args: DATA) => VNode | string | null
					isNumeric: boolean
					type: 'custom'
				}
				getData: (row: ROW) => DATA
		  }
		| {
				display: { type: 'boolean' }
				getData: (row: ROW) => boolean | null
		  }
		| {
				display: { type: 'date' } | { type: 'date-time' } | { type: 'text' }
				getData: (row: ROW) => string | null
		  }
		| {
				display:
					| { decimalPlaces: number; type: 'numerical' }
					| { type: 'integer' }
				getData: (row: ROW) => number | null
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

	export type Ordering<COLUMN_ID extends string = string> = {
		id: COLUMN_ID
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

	export type Translations = {
		no: string
		noItems: string
		yes: string
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
