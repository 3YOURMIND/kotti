import { Ref } from 'vue'
import { Table } from '@tanstack/table-core'

import { type AnyRow } from './types'

export const getTableContextKey = (id: string): string => `kt-table-${id}`

export type TableContext<T extends AnyRow> = Ref<{
	internal: {
		table: Ref<Table<T>>
	}
}>
