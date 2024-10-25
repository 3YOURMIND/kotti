import type { ColumnMeta } from '@tanstack/table-core'
import {
	type CellContext,
	createColumnHelper,
	getCoreRowModel,
	type HeaderContext,
} from '@tanstack/table-core'
import { computed, h, provide, type Ref } from 'vue'
import { Dashes } from '@metatypes/typography'

import ToggleInner from '../shared-components/toggle-inner/ToggleInner.vue'

import { getTableContextKey, type TableContext } from './context'
import { useVueTable } from './tanstack-table'
import type { AnyRow } from './types'
import { KottiI18n } from '../kotti-i18n/types'
import { useI18nContext } from '../kotti-i18n/hooks'

type ResolvedColumnDisplay<C extends Record<string, unknown>> = {
	align: 'center' | 'left' | 'right'
	formatter:
		| ((
				value: unknown,
				context: { numberFormat: KottiI18n.NumberFormat; options: C },
		  ) => string | null)
		| null
	isNumeric: boolean
}

type Display =
	// TODO: getData should understand display.type
	// TODO: truncate text, ask how default behavior
	// TODO: attachments, needs design
	// TODO: image, array of urls as data, needs render functions
	// TODO: tuples with separator (e.g. "1234 x 23")
	| { type: 'boolean' | 'date' | 'datetime' | 'integer' | 'text' }
	| { type: 'numerical'; decimalPlaces?: number }
	| {
			type: 'custom'
			align: 'center' | 'left' | 'right'
			formatter:
				| ((
						value: unknown,
						context: {
							numberFormat: KottiI18n.NumberFormat
							options: unknown
						},
				  ) => string | null)
				| null
			isNumeric: boolean
	  }

type KottiTableParameter<ROW extends AnyRow> = {
	columns: Ref<
		{
			display: Display
			getData: (row: ROW) => unknown /* TODO: <DATA> */
			id: string /* number | symbol */
			label: string
		}[]
	>
	data: Ref<ROW[]>
	id: string
	selection?: {
		getRowId: (row: ROW) => string // maybe needed in other places?
		onSelectionUpdate: (updated: Record<string, boolean>) => void
		selectedRows: Ref<Record<string, boolean>>
	}
}

const boolean: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	// TODO: ask how boolean should be displayed
	formatter: (value: unknown) => (value ? 'TRUE' : 'FALSE'),
	isNumeric: true,
}

const date: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => value as string,
	isNumeric: true,
}

const datetime: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => (value as string).replace('T', ' '),
	isNumeric: true,
}

const integer: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'right',
	formatter: (value: unknown) =>
		value === null ? null : String(Math.round(value as number)),
	isNumeric: true,
}

const numerical: ResolvedColumnDisplay<{ decimalPlaces?: number }> = {
	align: 'right',
	formatter: (value, context) =>
		value === null
			? null
			: (value as number)
					.toFixed(context.options.decimalPlaces ?? 2)
					.replace('.', context.numberFormat.decimalSeparator),
	isNumeric: true,
}

const text: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => value as string,
	isNumeric: false,
}

const columnDisplayMap = {
	boolean,
	date,
	datetime,
	integer,
	numerical,
	text,
}

const resolveColumnDisplay = <C extends Record<string, unknown>>(
	display: Display,
): ResolvedColumnDisplay<C> => {
	if (display.type === 'custom') return display

	return columnDisplayMap[display.type] as ResolvedColumnDisplay<C>
}

export const useKottiTable = <ROW extends AnyRow>(
	params: KottiTableParameter<ROW>,
): {
	tableContext: TableContext<ROW>
} => {
	const columnHelper = createColumnHelper<ROW>()
	const i18nContext = useI18nContext()

	const table = useVueTable(
		computed(() => ({
			columns: [
				...(params.selection
					? [
							columnHelper.display({
								cell: ({ row }: CellContext<ROW, unknown>) =>
									h(
										'div',
										{
											class: 'kt-table-selection',
											on: {
												click: () => {
													row.toggleSelected(!row.getIsSelected())
												},
											},
										},
										[
											h(ToggleInner, {
												props: {
													component: 'div',
													inputProps: {
														// TODO: pass data-test
														// TODO: disable when row is disabled
														disabled: !row.getCanSelect(),
													},
													isDisabled: !row.getCanSelect(),
													value: row.getIsSelected(),
												},
											}),
										],
									),
								header: ({ table }: HeaderContext<ROW, unknown>) =>
									h(
										'div',
										{
											on: {
												click: () => {
													table.toggleAllRowsSelected(
														!table.getIsAllRowsSelected(),
													)
												},
											},
										},
										[
											h(ToggleInner, {
												props: {
													component: 'div',
													inputProps: {
														// TODO: pass data-test
													},
													isDisabled: false,
													value: table.getIsAllRowsSelected(),
												},
											}),
										],
									),
								id: `${params.id}-inner-select`,
								meta: {
									cellClasses: 'kt-table-cell',
									headerClasses: 'kt-table-cell',
								},
							}),
						]
					: []),
				...params.columns.value.map((column) => {
					const columnDisplay = resolveColumnDisplay(column.display)
					const alignmentClass: string = Object.entries({
						[`kt-table-cell--is-${columnDisplay.align}-aligned`]: true,
						'kt-table-cell': true,
						'kt-table-cell--displays-number': columnDisplay.isNumeric,
					})
						.filter(([_, isTrue]) => isTrue)
						.map(([className, _]) => className)
						.join(' ')

					return columnHelper.accessor(column.getData, {
						cell: (info) => {
							if (columnDisplay.formatter) {
								return (
									columnDisplay.formatter(info.getValue(), {
										numberFormat: i18nContext.numberFormat,
										options: column.display,
									}) ?? Dashes.EmDash
								)
							}
							return info.getValue() ?? Dashes.EmDash
						},
						header: () => column.label,
						id: column.id,
						meta: {
							cellClasses: alignmentClass,
							headerClasses: alignmentClass,
						} satisfies ColumnMeta<ROW, unknown>,
					})
				}),
			],
			data: params.data.value,
			getCoreRowModel: getCoreRowModel(),
			getRowId: params.selection?.getRowId,
			onRowSelectionChange: (updateOrValue) => {
				if (!params.selection) throw new Error('no selection available')

				const updatedSelection =
					typeof updateOrValue === 'function'
						? updateOrValue(params.selection.selectedRows.value)
						: updateOrValue
				params.selection.selectedRows.value = updatedSelection
			},
			state: {
				rowSelection: params.selection?.selectedRows.value,
			},
		})),
	)

	const tableContext: TableContext<ROW> = computed(() => ({
		internal: {
			table,
		},
	}))
	provide<TableContext<ROW>>(getTableContextKey(params.id), tableContext)

	return {
		tableContext,
	}
}
