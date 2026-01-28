import { inject, provide, type Ref } from 'vue'

import type { KottiFieldText } from '../../kotti-field-text/types'
import type { KottiTable } from '../table/types'

import type { KottiStandardTable } from './types'

export type StandardTableContext<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string = string,
> = Ref<{
	internal: {
		appliedFilters: KottiStandardTable.AppliedFilter[]
		columnOrder: COLUMN_ID[]
		columns: KottiTable.Column<ROW, COLUMN_ID>[]
		filters: KottiStandardTable.FilterInternal[]
		getFilter: (
			id: KottiStandardTable.FilterInternal['id'],
		) => KottiStandardTable.FilterInternal | null
		hasDragAndDrop: boolean
		isLoading: boolean
		options?: KottiStandardTable.Options
		pageSizeOptions: number[]
		pagination: { pageIndex: number; pageSize: number }
		rowCount: number | null
		searchValue: KottiFieldText.ModelValue
		selectMode: 'global' | 'single-page' | null
		setAppliedFilters: (value: KottiStandardTable.AppliedFilter[]) => void
		setColumnSelection: (value: COLUMN_ID[]) => void
		setPageIndex: (value: number) => void
		setPageSize: (value: number) => void
		setSearchValue: (value: KottiFieldText.ModelValue) => void
	}
}>

const getStandardTableContextKey = (id: string): string =>
	`kt-standard-table-${id}`

export const useProvideStandardTableContext = <
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
>(
	id: string,
	standardTableContext: StandardTableContext<ROW, COLUMN_ID>,
): void => {
	provide<StandardTableContext<ROW, COLUMN_ID>>(
		getStandardTableContextKey(id),
		standardTableContext,
	)
}

export const useStandardTableContext = <ROW extends KottiTable.AnyRow>(
	id: string,
): StandardTableContext<ROW> => {
	const context = inject<StandardTableContext<ROW>>(
		getStandardTableContextKey(id),
	)

	if (!context) {
		throw new Error(`KtStandardTable: could not find context for “${id}”`)
	}

	return context
}
