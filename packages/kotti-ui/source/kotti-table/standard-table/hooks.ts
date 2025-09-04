import isEqual from 'lodash/isEqual.js'
import isNil from 'lodash/isNil.js'
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
import { type FilterInfo, KottiStandardTable } from './types'

const OPERATION_MAP = {
	[KottiStandardTable.FilterType.BOOLEAN]:
		KottiStandardTable.FilterOperation.Boolean.EQUAL,
	[KottiStandardTable.FilterType.DATE_RANGE]:
		KottiStandardTable.FilterOperation.DateRange.IN_RANGE,
	[KottiStandardTable.FilterType.MULTI_SELECT]:
		KottiStandardTable.FilterOperation.MultiEnum.ONE_OF,
	[KottiStandardTable.FilterType.NUMBER_RANGE]:
		KottiStandardTable.FilterOperation.NumberRange.IN_RANGE,
	[KottiStandardTable.FilterType.SINGLE_SELECT]:
		KottiStandardTable.FilterOperation.SingleEnum.EQUAL,
}

type KottiStandardTableParameters<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
> = Ref<{
	filters?: KottiStandardTable.Filter[]
	id: string
	isLoading?: boolean
	options?: KottiStandardTable.Options
	paginationOptions: KottiStandardTable.Pagination
	selectMode?: 'global' | 'single-page' | null
	storageAdapter: KottiStandardTableStorage | null
	table: Omit<KottiTableParameter<ROW, COLUMN_ID>, 'id' | 'isSelectable'>
}>

const paramsSchema = z.object({
	filters: KottiStandardTable.filterSchema.array().default(() => []),
	id: z.string(),
	isLoading: z.boolean().default(false),
	options: KottiStandardTable.optionsSchema.optional(),
	paginationOptions: KottiStandardTable.paginationSchema,
	selectMode: z.enum(['global', 'single-page']).nullable().default(null),
	/**
	 * Need to use z.any because there is currently no way in zod to ensure a class extends an interface.
	 */
	storageAdapter: z.any(),
	table: KottiTableHookParamsSchema.omit({
		id: true,
		isSelectable: true,
	}),
})

type KottiStandardTableHook<
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
> = {
	api: KottiStandardTable.Hook.Returns<COLUMN_ID>
	context: StandardTableContext<ROW, COLUMN_ID>
}

export const useKottiStandardTable = <
	ROW extends KottiTable.AnyRow,
	COLUMN_ID extends string,
>(
	_params: KottiStandardTableParameters<ROW, COLUMN_ID>,
): KottiStandardTableHook<ROW, COLUMN_ID> => {
	const params = computed(() => paramsSchema.parse(_params.value))

	const filterInfo = computed<Map<string, FilterInfo>>(
		() =>
			new Map(
				params.value.filters.map((filter) => {
					const { id, operations, type } = filter

					return [id, { operations, type }]
				}),
			),
	)

	const rowCount = computed(() =>
		params.value.paginationOptions.type === 'local'
			? params.value.table.data.length
			: params.value.paginationOptions.rowCount,
	)

	// refs exposed on return/api
	const searchValue = ref<string | null>(null)

	// FIXME: This useComputedRef right now assumes that the filters provdided via params
	// does not change. If a user would change it, it will lead to unintended behavior
	const appliedFilters = useComputedRef<KottiStandardTable.AppliedFilter[]>({
		get: (value) => value,
		set(value) {
			return value.filter((filter) => {
				const meta = filterInfo.value.get(filter.id)
				if (!meta) return false

				switch (meta.type) {
					case KottiStandardTable.FilterType.BOOLEAN: {
						return KottiStandardTable.appliedBooleanSchema.safeParse(filter)
							.success
					}
					case KottiStandardTable.FilterType.DATE_RANGE: {
						return KottiStandardTable.appliedDateRangeSchema.safeParse(filter)
							.success
					}
					case KottiStandardTable.FilterType.MULTI_SELECT:
						return KottiStandardTable.appliedMultiEnumSchema.safeParse(filter)
							.success

					case KottiStandardTable.FilterType.NUMBER_RANGE:
						return KottiStandardTable.appliedNumberRangeSchema.safeParse(filter)
							.success

					case KottiStandardTable.FilterType.SINGLE_SELECT:
						return KottiStandardTable.appliedSingleEnumSchema.safeParse(filter)
							.success

					default:
						return false
				}
			})
		},
		value: ref(
			(() => {
				const filtersWithDefaultValue: KottiStandardTable.AppliedFilter[] = []

				for (const filter of params.value.filters) {
					if (isNil(filter.defaultValue)) continue

					const appliedFilter = {
						id: filter.id,
						operation: OPERATION_MAP[filter.type],
						value: filter.defaultValue,
					} as KottiStandardTable.AppliedFilter

					filtersWithDefaultValue.push(appliedFilter)
				}

				return filtersWithDefaultValue
			})(),
		),
	})

	// FIXME: This useComputedRef right now assumes that the pageSize provdided via params
	// does not change. If a user would change it, it will lead to unintended behavior
	const pagination = useComputedRef<{ pageIndex: number; pageSize: number }>({
		get: (value) => value,
		set: ({ pageIndex, pageSize: _pageSize }) => {
			const pageSize = (() => {
				const { pageSizeOptions } = params.value.paginationOptions
				if (pageSizeOptions.includes(_pageSize)) return _pageSize

				for (let i = pageSizeOptions.length - 1; i >= 0; i -= 1) {
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					if (pageSizeOptions[i]! < _pageSize) {
						// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
						return pageSizeOptions[i]!
					}
				}
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				return pageSizeOptions[0]!
			})()
			const pageFirstRowIndex = pageIndex * pageSize
			return {
				pageIndex:
					pageIndex < 0 ||
					(rowCount.value !== null && pageFirstRowIndex > rowCount.value)
						? 0
						: pageIndex,
				pageSize,
			}
		},
		value: ref({
			pageIndex: 0,
			pageSize: params.value.paginationOptions.pageSize,
		}),
	})

	const data = computed(() => {
		if (params.value.paginationOptions.type === 'remote')
			return params.value.table.data

		const sliceStart = pagination.value.pageIndex * pagination.value.pageSize
		const sliceEnd = sliceStart + pagination.value.pageSize
		return params.value.table.data.slice(sliceStart, sliceEnd)
	})

	const storageAdapter = computed(
		() => params.value.storageAdapter ?? new DummyStorageAdapter(),
	)

	const tableHook = useKottiTable<ROW, COLUMN_ID>(
		computed(() => ({
			...(params.value.table as Omit<
				KottiTableParameter<ROW, COLUMN_ID>,
				'id'
			>),
			data: data.value,
			id: params.value.id,
			isSelectable: params.value.selectMode !== null,
		})),
	)

	const storageOperationContext = computed(
		(): StorageOperationContext => ({
			columnIds: params.value.table.columns.map((x) => x.id),
			filterInfo: filterInfo.value,
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
				pageSizeOptions: params.value.paginationOptions.pageSizeOptions,
				pagination: pagination.value,
				rowCount: rowCount.value,
				searchValue: searchValue.value,
				selectMode: params.value.selectMode,
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
		() => pagination.value,
		() => {
			if (params.value.selectMode === 'single-page') {
				tableHook.api.selectedRows.value = {}
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
