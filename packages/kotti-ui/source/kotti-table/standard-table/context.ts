import { inject, provide, type Ref } from 'vue'

import type { KottiTable } from '../table/types'
import type { AnyRow } from '../table/types'

import type { KottiStandardTable } from './types'

export type StandardTableContext<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = Ref<{
	internal: {
		columns: KottiTable.Column<ROW, COLUMN_IDS>[]
		filters: KottiStandardTable.Filter[]
		getFilter: (
			id: KottiStandardTable.Filter['id'],
		) => KottiStandardTable.Filter | null
		isLoading: boolean
		pageSizeOptions: number[]
		paginationType: KottiStandardTable.PaginationType
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
