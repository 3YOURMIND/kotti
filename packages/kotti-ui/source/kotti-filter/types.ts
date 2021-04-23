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
				operations: Operation.String[]
				placeholder?: string | null
				type: FilterType.SEARCH
		  }
		| {
				operations: Operation.String[]
				type: FilterType.STRING
		  }
		| {
				operations: Operation.Number[]
				type: FilterType.NUMBER
		  }
		| {
				operations: Operation.Boolean[]
				type: FilterType.BOOLEAN
		  }
		| {
				operations: Operation.DateRange[]
				type: FilterType.DATE_RANGE
		  }
		| {
				operations: Operation.SingleEnum[]
				options: Kotti.FieldSingleSelect.Props['options']
				type: FilterType.SINGLE_ENUM
		  }
		| {
				operations: Operation.MultiEnum[]
				options: Kotti.FieldMultiSelect.Props['options']
				type: FilterType.MULTI_ENUM
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
		| Kotti.FieldDateRange.Value
		| Kotti.FieldMultiSelect.Value
		| Kotti.FieldNumber.Value
		| Kotti.FieldSingleSelect.Value
		| Kotti.FieldText.Value
		| Kotti.FieldToggle.Value

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
		isLoading: boolean
		value: Value
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
		unsetLabel: string
		whereLabel: string
	}
}
