import { inject, provide, type Ref } from 'vue'

import type { KottiFieldText } from '../../kotti-field-text/types'
import { type MappedColumn } from '../table/column-helper'
import type { AnyRow } from '../table/types'

import type { KottiStandardTable } from './types'

export type StandardTableContext<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = Ref<{
	internal: {
		appliedFilters: KottiStandardTable.AppliedFilter[]
		columns: MappedColumn<ROW, COLUMN_IDS>[]
		filters: KottiStandardTable.FilterInternal[]
		getFilter: (
			id: KottiStandardTable.FilterInternal['id'],
		) => KottiStandardTable.FilterInternal | null
		isLoading: boolean
		options?: KottiStandardTable.Options
		pageSizeOptions: number[]
		paginationType: KottiStandardTable.PaginationType
		searchValue: KottiFieldText.Value
		setAppliedFilters: (value: KottiStandardTable.AppliedFilter[]) => void
		setSearchValue: (value: KottiFieldText.Value) => void
	}
}>

const getStandardTableContextKey = (id: string): string =>
	`kt-standard-table-${id}`

export const useProvideStandardTableContext = <ROW extends AnyRow>(
	id: string,
	standardTableContext: StandardTableContext<ROW>,
): void => {
	provide<StandardTableContext<ROW>>(
		getStandardTableContextKey(id),
		standardTableContext,
	)
}

export const useStandardTableContext = <ROW extends AnyRow>(
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
