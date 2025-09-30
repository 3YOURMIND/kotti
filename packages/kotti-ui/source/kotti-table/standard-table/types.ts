import type { Ref } from 'vue'
import { z } from 'zod'

import { KottiFieldDateRange } from '../../kotti-field-date/types'
import { KottiFieldNumber } from '../../kotti-field-number/types'
import {
	KottiFieldMultiSelect,
	KottiFieldSingleSelect,
} from '../../kotti-field-select/types'
import { KottiFieldToggle } from '../../kotti-field-toggle/types'
import { KottiPopover } from '../../kotti-popover/types'
import type { KottiTable } from '../table/types'

const DEFAULT_PAGE_SIZE = 10
// eslint-disable-next-line no-magic-numbers
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 25, 50, 100]
const MIN_PAGE_SIZE = 5

export type FilterInfo = Pick<
	KottiStandardTable.FilterInternal,
	'operations' | 'type'
>

export namespace KottiStandardTable {
	export enum FilterType {
		BOOLEAN = 'BOOLEAN',
		DATE_RANGE = 'DATE_RANGE',
		MULTI_SELECT = 'MULTI_SELECT',
		NUMBER_RANGE = 'NUMBER_RANGE',
		SINGLE_SELECT = 'SINGLE_SELECT',
	}
	export namespace FilterOperation {
		export enum Boolean {
			EQUAL = 'EQUAL',
		}

		export enum DateRange {
			IN_RANGE = 'IN_RANGE',
		}

		export enum MultiEnum {
			ONE_OF = 'ONE_OF', // OR
		}

		export enum NumberRange {
			IN_RANGE = 'IN_RANGE',
		}

		export enum SingleEnum {
			EQUAL = 'EQUAL',
		}

		export const schema = z.union([
			z.nativeEnum(Boolean),
			z.nativeEnum(DateRange),
			z.nativeEnum(MultiEnum),
			z.nativeEnum(NumberRange),
			z.nativeEnum(SingleEnum),
		])
	}

	const sharedFilterSchema = z.object({
		dataTest: z.string().optional(),
		displayInline: z.boolean().default(false),
		id: z.string(),
		label: z.string(),
	})

	const booleanFilterSchema = sharedFilterSchema.extend({
		defaultValue: KottiFieldToggle.valueSchema.optional(),
		operations: z
			.nativeEnum(FilterOperation.Boolean)
			.array()
			.nonempty()
			.default([FilterOperation.Boolean.EQUAL]),
		slotLabels: z.tuple([z.string(), z.string()]).optional(),
		type: z.literal(FilterType.BOOLEAN),
	})

	const dateRangeFilterSchema = sharedFilterSchema.extend({
		defaultValue: KottiFieldDateRange.valueSchema.optional(),
		operations: z
			.nativeEnum(FilterOperation.DateRange)
			.array()
			.nonempty()
			.default([FilterOperation.DateRange.IN_RANGE]),
		type: z.literal(FilterType.DATE_RANGE),
	})

	const multiSelectFilterSchema = sharedFilterSchema
		.merge(
			KottiFieldMultiSelect.propsSchema.pick({
				isUnsorted: true,
				options: true,
			}),
		)
		.extend({
			defaultValue: KottiFieldMultiSelect.valueSchema.optional(),
			operations: z
				.nativeEnum(FilterOperation.MultiEnum)
				.array()
				.nonempty()
				.default([FilterOperation.MultiEnum.ONE_OF]),
			type: z.literal(FilterType.MULTI_SELECT),
		})

	const numberRangeFilterSchema = sharedFilterSchema
		.merge(
			KottiFieldNumber.propsSchema.pick({
				decimalPlaces: true,
			}),
		)
		.extend({
			defaultValue: z
				.tuple([KottiFieldNumber.valueSchema, KottiFieldNumber.valueSchema])
				.optional(),
			operations: z
				.nativeEnum(FilterOperation.NumberRange)
				.array()
				.nonempty()
				.default([FilterOperation.NumberRange.IN_RANGE]),
			type: z.literal(FilterType.NUMBER_RANGE),
			unit: KottiFieldNumber.propsSchema.shape.prefix,
		})

	const singleSelectFilterSchema = sharedFilterSchema
		.merge(
			KottiFieldSingleSelect.propsSchema.pick({
				isUnsorted: true,
				options: true,
			}),
		)
		.extend({
			defaultValue: KottiFieldSingleSelect.valueSchema.optional(),
			operations: z
				.nativeEnum(FilterOperation.SingleEnum)
				.array()
				.nonempty()
				.default([FilterOperation.SingleEnum.EQUAL]),
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
	export type FilterInternal = z.output<typeof filterSchema>

	export const filterValueSchema = z.union([
		KottiFieldToggle.valueSchema,
		KottiFieldDateRange.valueSchema,
		KottiFieldMultiSelect.valueSchema,
		z.tuple([KottiFieldNumber.valueSchema, KottiFieldNumber.valueSchema]),
		KottiFieldSingleSelect.valueSchema,
	])
	export type FilterValue = z.output<typeof filterValueSchema>

	export const appliedBooleanSchema = z.object({
		id: z.string(),
		operation: z.nativeEnum(FilterOperation.Boolean),
		value: KottiFieldToggle.valueSchema,
	})
	export const appliedDateRangeSchema = z.object({
		id: z.string(),
		operation: z.nativeEnum(FilterOperation.DateRange),
		value: KottiFieldDateRange.valueSchema,
	})
	export const appliedMultiEnumSchema = z.object({
		id: z.string(),
		operation: z.nativeEnum(FilterOperation.MultiEnum),
		value: KottiFieldMultiSelect.valueSchema,
	})
	export const appliedNumberRangeSchema = z.object({
		id: z.string(),
		operation: z.nativeEnum(FilterOperation.NumberRange),
		value: z.tuple([
			KottiFieldNumber.valueSchema,
			KottiFieldNumber.valueSchema,
		]),
	})
	export const appliedSingleEnumSchema = z.object({
		id: z.string(),
		operation: z.nativeEnum(FilterOperation.SingleEnum),
		value: KottiFieldSingleSelect.valueSchema,
	})

	export const appliedFilterSchema = z.union([
		appliedBooleanSchema,
		appliedDateRangeSchema,
		appliedMultiEnumSchema,
		appliedNumberRangeSchema,
		appliedSingleEnumSchema,
	])
	export type AppliedFilter = z.output<typeof appliedFilterSchema>

	export const optionsSchema = z.object({
		hideControls: z
			.object({
				columns: z.boolean().default(false),
				filters: z.boolean().default(false),
				search: z.boolean().default(false),
			})
			.optional(),
		popoversSize: z
			.object({
				columns: KottiPopover.propsSchema.shape.size,
				filters: KottiPopover.propsSchema.shape.size,
			})
			.optional(),
		searchPlaceholder: z.string().optional(),
	})
	export type Options = z.input<typeof optionsSchema>

	const sharedPaginationSchema = z.object({
		pageIndex: z.number().int().finite().min(0),
		pageSize: z.number().int().finite().gt(0),
		pageSizeOptions: z
			.array(z.number().int().finite().min(MIN_PAGE_SIZE))
			.refine(
				(val) =>
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					val.slice(1).every((entry, entryIndex) => entry > val[entryIndex]!),
				{
					message:
						'Entries in pageSizeOptions must be a strictly increasing sequence',
				},
			),
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
				type: z.literal('local'),
			}),
			z.object({
				pageSize:
					sharedPaginationSchema.shape.pageSize.default(DEFAULT_PAGE_SIZE),
				pageSizeOptions: sharedPaginationSchema.shape.pageSizeOptions.default(
					() => DEFAULT_PAGE_SIZE_OPTIONS,
				),
				rowCount: sharedPaginationSchema.shape.rowCount.nullable(),
				type: z.literal('remote'),
			}),
		])
		.default({
			pageSize: DEFAULT_PAGE_SIZE,
			pageSizeOptions: DEFAULT_PAGE_SIZE_OPTIONS,
			type: 'local',
		})
	export type Pagination = z.input<typeof paginationSchema>

	export const propsSchema = z.object({
		emptyText: z.string().nullable().default(null),
		tableId: z.string().min(1, { message: 'Field cannot be empty' }),
		title: z.string().optional(),
	})
	export type Props = z.input<typeof propsSchema>

	export namespace Events {
		export type UpdateFetchData = {
			filters: AppliedFilter[]
			ordering: { id: string; value: 'ascending' | 'descending' }[]
			pagination: {
				pageIndex: number
				pageSize: number
			}
			search: string | null
		}
	}

	export namespace Hook {
		export type Returns<COLUMN_ID extends string> =
			KottiTable.Hook.Returns<COLUMN_ID> & {
				appliedFilters: Ref<AppliedFilter[]>
				pagination: Ref<{
					pageIndex: number
					pageSize: number
				}>
				searchValue: Ref<string | null>
			}
	}

	export type Translations = {
		clearAll: string
		editColumns: string
		editFilters: string
		endDate: string
		itemsPerPage: string
		lastMonth: string
		lastWeek: string
		lastYear: string
		max: string
		min: string
		moreThan: string
		resultsCounter: string
		search: string
		selectionCount: string
		showAll: string
		startDate: string
		today: string
		upTo: string
	}
}
