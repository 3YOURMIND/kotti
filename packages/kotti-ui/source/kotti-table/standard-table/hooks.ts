import isEqual from 'lodash/isEqual.js'
import type { Ref } from 'vue'
import { computed, onBeforeMount, ref, watch } from 'vue'
import { z } from 'zod'

import type { KottiFieldText } from '../../kotti-field-text/types'
import type { KottiTableParameter } from '../table/hooks'
import {
	paramsSchema as KottiTableHookParamsSchema,
	useKottiTable,
} from '../table/hooks'
import type { KottiTable } from '../table/types'
import { useComputedRef } from '../table/use-computed-ref'

import type { StandardTableContext } from './context'
import { useProvideStandardTableContext } from './context'
import type { StorageOperationContext } from './storage'
import {
	DummyStorageAdapter,
	type KottiStandardTableStorage,
	serializableStateSchema,
} from './storage'
import { KottiStandardTable } from './types'

type KottiStandardTableParameters<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
> = Ref<{
	filters?: KottiStandardTable.Filter[]
	id: string
	initialPagination: KottiStandardTable.Pagination
	isLoading?: boolean
	options?: KottiStandardTable.Options
	storageAdapter: KottiStandardTableStorage | null
	table: Omit<KottiTableParameter<ROW, COLUMN_ID>, 'id'>
}>

const _paramsSchema = z.object({
	filters: KottiStandardTable.filterSchema.array().default(() => []),
	id: z.string(),
	initialPagination: KottiStandardTable.paginationSchema,
	isLoading: z.boolean().default(false),
	options: KottiStandardTable.optionsSchema.optional(),
	storageAdapter: z
		.object({
			load: z.any(),
			save: z.any(),
		})
		.nullable(),
	table: KottiTableHookParamsSchema.omit({
		id: true,
	}),
})

export const useKottiStandardTable = <
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
>(
	_params: KottiStandardTableParameters<ROW, COLUMN_ID>,
): {
	api: KottiStandardTable.Hook.Returns<COLUMN_ID>
	context: StandardTableContext<ROW, COLUMN_ID>
} => {
	const params = computed(() => _paramsSchema.parse(_params.value))

	const filterIdSet = computed<Set<string>>(
		() => new Set(params.value.filters.map((f) => f.id)),
	)

	const rowCount = computed(() =>
		params.value.initialPagination.type === 'local'
			? params.value.table.data.length
			: params.value.initialPagination.rowCount,
	)

	// refs exposed on return/api
	const searchValue = ref<KottiFieldText.Value>(null)

	const appliedFilters = useComputedRef<KottiStandardTable.AppliedFilter[]>({
		get: (value) => value,
		set(value) {
			return value.filter((filter) => filterIdSet.value.has(filter.id))
		},
		value: ref([]),
	})

	// FIXME: This useComputedRef right now assumes that the pageSize provdided via params
	// does not change. If a user would change it, it will lead to unintended behavior
	const pagination = useComputedRef<{ pageIndex: number; pageSize: number }>({
		get: (value) => value,
		set: (value) => {
			const currentRow = value.pageIndex * value.pageSize
			if (currentRow > rowCount.value) {
				return {
					...value,
					pageIndex: 0,
				}
			}
			return value
		},
		value: ref({
			pageIndex: 0,
			pageSize: params.value.initialPagination.pageSize,
		}),
	})

	const data = computed(() => {
		if (params.value.initialPagination.type === 'remote')
			return params.value.table.data

		const sliceStart = pagination.value.pageIndex * pagination.value.pageSize
		const sliceEnd = sliceStart + pagination.value.pageSize
		return params.value.table.data.slice(sliceStart, sliceEnd)
	})

	// go

	const storageAdapter = computed(
		() => params.value.storageAdapter ?? new DummyStorageAdapter(),
	)

	const tableHook = useKottiTable<ROW, COLUMN_ID>(
		computed(() => ({
			..._params.value.table,
			data: data.value,
			id: params.value.id,
		})),
	)

	const storageOperationContext = computed(
		(): StorageOperationContext => ({
			columnIds: params.value.table.columns.map((x) => x.id),
		}),
	)

	// eslint-disable-next-line @typescript-eslint/no-misused-promises
	onBeforeMount(async () => {
		const rawState = await storageAdapter.value.load(
			storageOperationContext.value,
		)

		if (!rawState) {
			return
		}

		const state = serializableStateSchema.parse(rawState)

		tableHook.api.columnOrder.value = state.columnOrder as COLUMN_ID[]
		tableHook.api.hiddenColumns.value = new Set(
			state.hiddenColumns as COLUMN_ID[],
		)
		tableHook.api.ordering.value =
			state.ordering as KottiTable.Ordering<COLUMN_ID>[]
		appliedFilters.value = state.appliedFilters
		pagination.value = state.pagination
		searchValue.value = state.searchValue
	})

	const standardTableContext: StandardTableContext<ROW, COLUMN_ID> = computed(
		() => ({
			internal: {
				appliedFilters: appliedFilters.value,
				columns: _params.value.table.columns,
				filters: params.value.filters,
				getFilter: (id) =>
					params.value.filters.find((filter) => filter.id === id) ?? null,
				isLoading: params.value.isLoading,
				options: params.value.options,
				pageSizeOptions: params.value.initialPagination.pageSizeOptions,
				pagination: pagination.value,
				rowCount: rowCount.value,
				searchValue: searchValue.value,
				setAppliedFilters: (filters: KottiStandardTable.AppliedFilter[]) => {
					appliedFilters.value = filters
				},
				setPageIndex: (pageIndex: number) => {
					pagination.value = {
						...pagination.value,
						pageIndex,
					}
				},
				setPageSize: (pageSize: number) => {
					pagination.value = {
						pageIndex: 0,
						pageSize,
					}
				},
				setSearchValue: (search: KottiFieldText.Value) => {
					searchValue.value = search
				},
			},
			tableInternal: tableHook.tableContext.value.internal,
		}),
	)
	useProvideStandardTableContext(params.value.id, standardTableContext)

	watch(
		computed(() => ({
			appliedFilters: appliedFilters.value,
			columnOrder: tableHook.api.columnOrder.value,
			hiddenColumns: tableHook.api.hiddenColumns.value,
			ordering: tableHook.api.ordering.value,
			pagination: pagination.value,
			searchValue: searchValue.value,
		})),
		async (newState, oldState) => {
			if (isEqual(newState, oldState)) return

			await storageAdapter.value.save(
				{
					...newState,
					hiddenColumns: Array.from(newState.hiddenColumns),
				},
				storageOperationContext.value,
			)
		},
	)

	watch(
		() => pagination,
		(newPagination, oldPagination) => {
			const old = oldPagination.value
			const current = newPagination.value
			if (current.pageSize === old.pageSize) return

			const newPageIndex = (old.pageSize * old.pageIndex) / current.pageSize
			pagination.value = {
				pageIndex: newPageIndex,
				pageSize: current.pageIndex,
			}
		},
	)

	return {
		api: {
			...tableHook.api,
			appliedFilters,
			pagination,
			searchValue,
		},
		context: standardTableContext,
	}
}
