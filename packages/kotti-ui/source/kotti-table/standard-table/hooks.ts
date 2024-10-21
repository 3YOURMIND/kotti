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
	type KottiStandardTableStorage,
	LocalStorageAdapter,
	serializableStateSchema,
} from './storage'
import { KottiStandardTable } from './types'

type KottiStandardTableParameters<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string = string,
> = Ref<{
	filters?: KottiStandardTable.Filter[]
	id: string
	isLoading?: boolean
	options?: KottiStandardTable.Options
	pagination: KottiStandardTable.Pagination
	storageAdapter: KottiStandardTableStorage | null
	table: Omit<KottiTableParameter<ROW, COLUMN_ID>, 'id' | 'pagination'>
}>

const _paramsSchema = z.object({
	filters: KottiStandardTable.filterSchema.array().default(() => []),
	id: z.string(),
	isLoading: z.boolean().default(false),
	options: KottiStandardTable.optionsSchema.optional(),
	pagination: KottiStandardTable.paginationSchema,
	storageAdapter: z
		.object({
			load: z.any(),
			save: z.any(),
		})
		.nullable(),
	table: KottiTableHookParamsSchema.omit({
		id: true,
		pagination: true,
	}),
})

export const useKottiStandardTable = <ROW extends KottiTable.AnyRow>(
	_params: KottiStandardTableParameters<ROW>,
): {
	appliedFilters: Ref<unknown>
	context: StandardTableContext<ROW>
	searchValue: Ref<KottiFieldText.Value>
	tableHook: ReturnType<typeof useKottiTable<ROW, string>>
} => {
	const params = computed(() => _paramsSchema.parse(_params.value))

	const filterIdSet = computed<Set<string>>(
		() => new Set(params.value.filters.map((f) => f.id)),
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

	// go

	const storageAdapter = computed(
		// FIXME: should be new DummyStorageAdapter()
		() => params.value.storageAdapter ?? new LocalStorageAdapter('sample-key'),
	)

	const tableHook = useKottiTable<ROW, string>(
		computed(() => ({
			columns: _params.value.table.columns,
			data: params.value.table.data,
			getRowBehavior: ({ row }: { row: ROW }) => ({
				id: String(row.id),
			}),
			hasDragAndDrop: true,
			id: params.value.id,
			pagination:
				params.value.pagination.type === KottiStandardTable.PaginationType.LOCAL
					? {
							state: {
								pageIndex: 0,
								pageSize: params.value.pagination.pageSize,
							},
							type: KottiStandardTable.PaginationType.LOCAL,
						}
					: {
							rowCount: params.value.pagination.rowCount,
							state: {
								pageIndex: 0,
								pageSize: params.value.pagination.pageSize,
							},
							type: KottiStandardTable.PaginationType.REMOTE,
						},
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
			// eslint-disable-next-line no-console
			console.log('TODO: storage adapter returned no value')
			return
		}

		const state = serializableStateSchema.parse(rawState)

		tableHook.api.columnOrder.value = state.columnOrder
		tableHook.api.hiddenColumns.value = new Set(state.hiddenColumns)
		tableHook.api.ordering.value = state.ordering
		appliedFilters.value = state.appliedFilters
		searchValue.value = state.searchValue
		tableHook.api.pagination.value = state.pagination
	})

	// eslint-disable-next-line no-console
	console.log('TODO: useStandardTable(params)', params.value)

	const standardTableContext: StandardTableContext<ROW> = computed(() => ({
		internal: {
			appliedFilters: appliedFilters.value,
			columns: _params.value.table.columns,
			filters: params.value.filters,
			getFilter: (id) =>
				params.value.filters.find((filter) => filter.id === id) ?? null,
			isLoading: params.value.isLoading,
			options: params.value.options,
			pageSizeOptions: params.value.pagination.pageSizeOptions,
			paginationType: params.value.pagination.type,
			searchValue: searchValue.value,
			setAppliedFilters: (filters: KottiStandardTable.AppliedFilter[]) => {
				appliedFilters.value = filters
			},
			setSearchValue: (search: KottiFieldText.Value) => {
				searchValue.value = search
			},
		},
	}))
	useProvideStandardTableContext(params.value.id, standardTableContext)

	watch(
		computed(() => ({
			appliedFilters: appliedFilters.value,
			columnOrder: tableHook.api.columnOrder.value,
			hiddenColumns: tableHook.api.hiddenColumns.value,
			ordering: tableHook.api.ordering.value,
			pagination: tableHook.api.pagination.value,
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
		() =>
			tableHook.tableContext.value.internal.table.value.getState().pagination
				.pageSize,
		() => {
			tableHook.tableContext.value.internal.table.value.setPageIndex(0)
		},
	)

	return {
		appliedFilters,
		searchValue,
		// paginationParams,
		context: standardTableContext, // TODO: convert to provide/inject
		tableHook: tableHook,
	}
}
