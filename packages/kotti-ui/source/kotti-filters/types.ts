import { Kotti } from '../types'
import { SpecifyRequiredProps } from '../types/utilities'

export namespace KottiFilters {
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
		export enum Boolean {
			EQUAL = 'EQUAL',
			IS_EMPTY = 'IS_EMPTY',
		}

		export enum DateRange {
			IN_RANGE = 'IN_RANGE',
			IS_EMPTY = 'IS_EMPTY',
		}

		export enum MultiEnum {
			IS_EMPTY = 'IS_EMPTY',
			ONE_OF = 'ONE_OF', // OR
		}

		export enum Number {
			EQUAL = 'EQUAL',
			GREATER_THAN = 'GREATER_THAN',
			GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
			IS_EMPTY = 'IS_EMPTY',
			LESS_THAN = 'LESS_THAN',
			LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
		}

		export enum Search {
			CONTAINS = 'CONTAINS',
		}

		export enum SingleEnum {
			EQUAL = 'EQUAL',
			IS_EMPTY = 'IS_EMPTY',
		}

		export enum String {
			CONTAINS = 'CONTAINS',
			EQUAL = 'EQUAL',
			IS_EMPTY = 'IS_EMPTY',
		}

		export type Any =
			| Operation.Boolean
			| Operation.DateRange
			| Operation.MultiEnum
			| Operation.Number
			| Operation.SingleEnum
			| Operation.String
	}

	export namespace Column {
		export type Common = {
			key: string
			label: string
		}

		export type Boolean<
			OPERATION extends Operation.Boolean = Operation.Boolean
		> = Common & {
			operations: OPERATION[]
			type: FilterType.BOOLEAN
		}

		export type DateRange<
			OPERATION extends Operation.DateRange = Operation.DateRange
		> = Common & {
			operations: OPERATION[]
			type: FilterType.DATE_RANGE
		}

		export type MultiEnum<
			OPERATION extends Operation.MultiEnum = Operation.MultiEnum
		> = Common & {
			operations: OPERATION[]
			options: Kotti.FieldMultiSelect.Props['options']
			type: FilterType.MULTI_ENUM
		}

		export type Number<
			OPERATION extends Operation.Number = Operation.Number
		> = Common & {
			operations: OPERATION[]
			type: FilterType.NUMBER
		}

		export type Search = Common & {
			placeholder?: string | null
			type: FilterType.SEARCH
		}

		export type SingleEnum<
			OPERATION extends Operation.SingleEnum = Operation.SingleEnum
		> = Common & {
			operations: OPERATION[]
			options: Kotti.FieldSingleSelect.Props['options']
			type: FilterType.SINGLE_ENUM
		}

		export type String<
			OPERATION extends Operation.String = Operation.String
		> = Common & {
			operations: OPERATION[]
			type: FilterType.STRING
		}

		export type Any =
			| Column.Boolean
			| Column.DateRange
			| Column.MultiEnum
			| Column.Number
			| Column.Search
			| Column.SingleEnum
			| Column.String
	}

	export type FilterValue =
		| Kotti.FieldDateRange.Value
		| Kotti.FieldMultiSelect.Value
		| Kotti.FieldNumber.Value
		| Kotti.FieldSingleSelect.Value
		| Kotti.FieldText.Value
		| Kotti.FieldToggle.Value

	export type InternalFilter = {
		key: Column.Any['key']
		operation: Operation.Any
		value: FilterValue
	}

	export type Filter = SpecifyRequiredProps<
		InternalFilter,
		'key' | 'operation' | 'value'
	>

	export type Value = Filter[]

	export type InternalProps = {
		columns: Column.Any[]
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
