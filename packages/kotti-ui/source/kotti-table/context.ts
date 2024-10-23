import type { Table } from '@tanstack/table-core'
import type { Ref } from 'vue'

import { type AnyRow } from './types'

export const getTableContextKey = (id: string): string => `kt-table-${id}`

export type TableContext<T extends AnyRow> = Ref<{
	internal: {
		table: Ref<Table<T>>
	}
}>
