import { z } from 'zod'

import { KottiFieldDateRange } from '../../kotti-field-date/types'
import { KottiFieldNumber } from '../../kotti-field-number/types'
import {
	KottiFieldMultiSelect,
	KottiFieldSingleSelect,
} from '../../kotti-field-select/types'
import { KottiFieldText } from '../../kotti-field-text/types'
import { KottiFieldToggle } from '../../kotti-field-toggle/types'
import { KottiTable } from '../table/types'

import {
	DEFAULT_PAGE_SIZE,
	DEFAULT_PAGE_SIZE_OPTIONS,
	MIN_PAGE_SIZE,
} from './constants'

export namespace KottiStandardTable {
	export enum FilterType {
		BOOLEAN = 'BOOLEAN',
		DATE_RANGE = 'DATE_RANGE',
		MULTI_SELECT = 'MULTI_SELECT',
		NUMBER_RANGE = 'NUMBER_RANGE',
		SINGLE_SELECT = 'SINGLE_SELECT',
	}

	export enum PaginationType {
		LOCAL = 'LOCAL',
		REMOTE = 'REMOTE',
	}

	const sharedFilterSchema = z.object({
		dataTest: z.string().optional(),
		id: z.string(),
		isPopupFilter: z.boolean().default(false),
		label: z.string(),
	})

	const booleanFilterSchema = sharedFilterSchema.extend({
		defaultValue: KottiFieldToggle.valueSchema.optional(),
		slotLabels: z.tuple([z.string(), z.string()]).optional(),
		type: z.literal(FilterType.BOOLEAN),
	})

	const dateRangeFilterSchema = sharedFilterSchema.extend({
		defaultValue: KottiFieldDateRange.valueSchema.optional(),
		type: z.literal(FilterType.DATE_RANGE),
	})

	const multiSelectFilterSchema = sharedFilterSchema.extend({
		defaultValue: KottiFieldMultiSelect.valueSchema.optional(),
		isUnsorted: KottiFieldMultiSelect.propsSchema.shape.isUnsorted,
		options: KottiFieldMultiSelect.propsSchema.shape.options,
		type: z.literal(FilterType.MULTI_SELECT),
	})

	const numberRangeFilterSchema = sharedFilterSchema.extend({
		decimalPlaces: KottiFieldNumber.propsSchema.shape.decimalPlaces,
		defaultValue: z
			.tuple([KottiFieldNumber.valueSchema, KottiFieldNumber.valueSchema])
			.optional(),
		type: z.literal(FilterType.NUMBER_RANGE),
		unit: KottiFieldNumber.propsSchema.shape.prefix,
	})

	const singleSelectFilterSchema = sharedFilterSchema.extend({
		defaultValue: KottiFieldSingleSelect.valueSchema.optional(),
		isUnsorted: KottiFieldSingleSelect.propsSchema.shape.isUnsorted,
		options: KottiFieldSingleSelect.propsSchema.shape.options,
		type: z.literal(FilterType.SINGLE_SELECT),
	})

	export const filterSchema = z.discriminatedUnion('type', [
		booleanFilterSchema,
		dateRangeFilterSchema,
		multiSelectFilterSchema,
		numberRangeFilterSchema,
		singleSelectFilterSchema,
	])
	export type Filter = z.input<typeof filterSchema>

	export const filterValueSchema = z.union([
		KottiFieldToggle.valueSchema,
		KottiFieldDateRange.valueSchema,
		KottiFieldMultiSelect.valueSchema,
		z.tuple([KottiFieldNumber.valueSchema, KottiFieldNumber.valueSchema]),
		KottiFieldSingleSelect.valueSchema,
	])
	export type FilterValue = z.input<typeof filterValueSchema>

	// TODO: add operation?
	export const appliedFilterSchema = z.object({
		id: sharedFilterSchema.shape.id,
		value: filterValueSchema,
	})
	export type AppliedFilter = z.input<typeof appliedFilterSchema>

	const sharedPaginationSchema = z.object({
		pageIndex: z.number().int().finite().min(0),
		pageSize: z.number().int().finite().gt(0),
		pageSizeOptions: z.array(z.number().int().finite().min(MIN_PAGE_SIZE)),
		rowCount: z.number().int().finite().min(0),
	})

	export const paginationSchema = z
		.discriminatedUnion('type', [
			z.object({
				pageSize:
					sharedPaginationSchema.shape.pageSize.default(DEFAULT_PAGE_SIZE),
				pageSizeOptions: sharedPaginationSchema.shape.pageSizeOptions.default(
					() => DEFAULT_PAGE_SIZE_OPTIONS,
				),
				type: z.literal(PaginationType.LOCAL),
			}),
			z.object({
				pageSize:
					sharedPaginationSchema.shape.pageSize.default(DEFAULT_PAGE_SIZE),
				pageSizeOptions: sharedPaginationSchema.shape.pageSizeOptions.default(
					() => DEFAULT_PAGE_SIZE_OPTIONS,
				),
				rowCount: sharedPaginationSchema.shape.rowCount,
				type: z.literal(PaginationType.REMOTE),
			}),
		])
		.default({
			pageSize: DEFAULT_PAGE_SIZE,
			pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
			type: PaginationType.LOCAL,
		})
	export type Pagination = z.input<typeof paginationSchema>

	export const propsSchema = z.object({
		id: z.string().min(1, { message: 'Field cannot be empty' }),
		title: z.string().optional(),
	})
	export type Props = z.input<typeof propsSchema>

	export namespace BooleanFilter {
		export const propsSchema = z.object({
			filter: booleanFilterSchema,
			isLoading: z.boolean().default(false),
			value: KottiFieldToggle.valueSchema.default(null),
		})
	}
	export namespace DateRangeFilter {
		export const propsSchema = z.object({
			filter: dateRangeFilterSchema,
			isLoading: z.boolean().default(false),
			value: KottiFieldDateRange.valueSchema.default([null, null]),
		})
	}
	export namespace MultiSelectFilter {
		export const propsSchema = z.object({
			filter: multiSelectFilterSchema,
			isLoading: z.boolean().default(false),
			value: KottiFieldMultiSelect.valueSchema.default([]),
		})
	}
	export namespace NumberRangeFilter {
		export const propsSchema = z.object({
			filter: numberRangeFilterSchema,
			isLoading: z.boolean().default(false),
			value: z
				.tuple([KottiFieldNumber.valueSchema, KottiFieldNumber.valueSchema])
				.default([null, null]),
		})
	}
	export namespace SingleSelectFilter {
		export const propsSchema = z.object({
			filter: singleSelectFilterSchema,
			isLoading: z.boolean().default(false),
			value: KottiFieldSingleSelect.valueSchema.default(null),
		})
	}

	export namespace TableColumns {
		export const propsSchema = z.object({
			isLoading: z.boolean().default(false),
			options: z
				.object({
					key: z.string(),
					label: z.string(),
				})
				.array(),
			value: z.record(z.string(), z.boolean()),
		})
		export type Props = z.output<typeof propsSchema>
	}

	export namespace TableFilters {
		export const propsSchema = z.object({
			filters: z.array(filterSchema),
			isLoading: z.boolean().default(false),
			value: z.array(appliedFilterSchema),
		})
		export type Props = z.output<typeof propsSchema>
	}

	export namespace TablePageSize {
		export const propsSchema = sharedPaginationSchema
			.pick({
				pageSize: true,
				pageSizeOptions: true,
			})
			.extend({
				isLoading: z.boolean().default(false),
			})
		export type Props = z.output<typeof propsSchema>
	}

	export namespace TablePagination {
		export const propsSchema = sharedPaginationSchema
			.pick({
				pageIndex: true,
				pageSize: true,
				rowCount: true,
			})
			.extend({
				isLoading: z.boolean().default(false),
			})
		export type Props = z.output<typeof propsSchema>
	}

	export namespace TableSearch {
		export const propsSchema = z.object({
			dataTest: z.string().optional(),
			isLoading: z.boolean().default(false),
			placeholder: z.string().optional(),
			value: KottiFieldText.valueSchema.default(null),
		})
		export type Props = z.output<typeof propsSchema>
	}

	export namespace Events {
		const updateDataFetchDependencies = z.object({
			ordering: KottiTable.orderingSchema,
			pagination: sharedPaginationSchema.pick({
				pageIndex: true,
				pageSize: true,
			}),
			search: KottiFieldText.valueSchema,
		})
		export type UpdateDataFetchDependencies = z.output<
			typeof updateDataFetchDependencies
		>
	}

	export type Translations = {
		clearAll: string
		editColumns: string
		editFilters: string
		endDate: string
		lastMonth: string
		lastWeek: string
		lastYear: string
		max: string
		min: string
		moreThan: string
		resultsCounter: string
		rowsPerPage: string
		search: string
		showAll: string
		startDate: string
		today: string
		upTo: string
	}
}
