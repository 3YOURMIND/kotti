import { Kotti } from '../types'
import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiFilter {
	export enum ButtonLinkType {
		DANGER = 'danger',
		PRIMARY = 'primary',
	}

	export enum FilterType {
		BOOLEAN = 'BOOLEAN',
		DATE_RANGE = 'DATE_RANGE',
		MULTI_ENUM = 'MULTI_ENUM',
		NUMBER = 'NUMBER',
		SEARCH = 'SEARCH',
		SINGLE_ENUM = 'SINGLE_ENUM',
		STRING = 'STRING',
	}

	export namespace Operation {
		export enum String {
			CONTAINS = 'CONTAINS',
		}

		export enum Number {
			EQUAL = 'EQUAL',
			GREATER_THAN = 'GREATER_THAN',
			GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
			LESS_THAN = 'LESS_THAN',
			LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
		}

		export enum Boolean {
			EQUAL = 'EQUAL',
		}

		export enum DateRange {
			IN = 'IN',
		}

		export enum SingleEnum {
			EQUAL = 'EQUAL',
		}

		export enum MultiEnum {
			ONE_OF = 'ONE_OF', // OR
		}
	}

	export type Column = {
		key: string
		label: string
	} & (
		| {
				type: FilterType.SEARCH
				placeholder?: string | null
		  }
		| {
				type: FilterType.STRING
		  }
		| {
				type: FilterType.NUMBER
		  }
		| {
				type: FilterType.BOOLEAN
		  }
		| {
				type: FilterType.DATE_RANGE
		  }
		| {
				type: FilterType.SINGLE_ENUM
				options: Kotti.FieldSingleSelect.Props['options']
		  }
		| {
				type: FilterType.MULTI_ENUM
				options: Kotti.FieldMultiSelect.Props['options']
		  }
	)

	export type FilterOperation =
		| Operation.Boolean
		| Operation.DateRange
		| Operation.MultiEnum
		| Operation.Number
		| Operation.SingleEnum
		| Operation.String

	export type FilterValue =
		| boolean
		| Kotti.FieldDateRange.Value
		| Kotti.FieldMultiSelect.Value
		| Kotti.FieldSingleSelect.Value
		| number
		| string

	export type InternalFilter = {
		key: Column['key']
		operation: FilterOperation
		value: FilterValue
	}

	export type Filter = SpecifyRequiredProps<
		InternalFilter,
		'key' | 'operation' | 'value'
	>

	export type Value = Filter[]

	export type InternalProps = {
		columns: Column[]
		value: Value
		isLoading: boolean
	}

	export type Props = SpecifyRequiredProps<InternalProps, 'columns' | 'value'>

	export namespace Events {
		export type UpdateColumns = InternalProps['columns']

		export type UpdateValue = InternalProps['value']
	}

	export type Translations = {
		addFilterLabel: string
		andLabel: string
		boolean: Record<Operation.Boolean, string>
		clearAllLabel: string
		dateRange: Record<Operation.DateRange, string>
		disabledLabel: string
		emptyListLabel: string
		enabledLabel: string
		filterLabel: string
		filtersLabel: string
		multiEnum: Record<Operation.MultiEnum, string>
		number: Record<Operation.Number, string>
		searchLabel: string
		singleEnum: Record<Operation.SingleEnum, string>
		string: Record<Operation.String, string>
		whereLabel: string
	}
}

/*
    ✅ Filters joined by AND (default behaviour)
    ✅ Clear all filters at once
    ✅ Filter types: search, string, number, boolean, date range, single enum, multi enum
    ✅ String - contains operation
    ✅ Number - eq, lt, lte, gt, gte operations
    ✅ Boolean - equal operation
    ✅ DateRange - is in range (inclusive) operation 
    ✅ SingleEnum (single-choice) - equals operation
    ✅ MultiEnum (multiple-choice) - one of operation
    ⏳ String - case sensitive filtering. Future support?
    ⏳ String - equal, start with, end with operations. Future support?
    ⏳ Group options by section in select dropdown. Future support?
	⏳ NOT operator. Future support?
    ⏳ Combine logical operators (AND, OR). Future support?
*/
