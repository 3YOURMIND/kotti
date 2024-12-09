import type { VNode } from 'vue'
import { z } from 'zod'

import type { yocoIconSchema } from '@3yourmind/yoco'

import type { KottiI18n } from '../../kotti-i18n/types'

/**
 * @see {@link ./hooks.ts paramsSchema}
 */
export type GetRowBehavior<
	ROW extends KottiTable.AnyRow,
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
	export type Display<DATA_TYPE> = {
		align: 'center' | 'left' | 'right'
		disableCellClick: boolean
		isNumeric: boolean
		render: (
			value: DATA_TYPE,
			context: { i18n: KottiI18n.ContextInternal },
		) => VNode | string | null
	}

	/**
	 * This is the column passed to `useKottiTable`’s `columns`
	 */
	export type Column<
		ROW extends AnyRow,
		COLUMN_IDS extends string = string,
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		DATA = any,
	> = {
		display: Display<DATA>
		getData: (row: ROW) => DATA
		id: COLUMN_IDS
		isSortable?: boolean
		label: string
	}

	export type Ordering<COLUMN_ID extends string = string> = {
		id: COLUMN_ID
		value: 'ascending' | 'descending'
	}

	export type AnyRow = Record<string, unknown>

	export const propsSchema = z
		.object({
			emptyText: z.string().nullable().default(null),
			isLoading: z.boolean().default(false),
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
