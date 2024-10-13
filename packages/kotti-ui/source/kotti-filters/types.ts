import type { KottiFieldCurrency } from '../kotti-field-currency/types'
import type { KottiFieldDateRange } from '../kotti-field-date/types'
import type { KottiFieldNumber } from '../kotti-field-number/types'
import type {
	KottiFieldMultiSelect,
	KottiFieldSingleSelect,
} from '../kotti-field-select/types'
import type { KottiFieldText } from '../kotti-field-text/types'
import type { KottiFieldToggle } from '../kotti-field-toggle/types'
import type { SpecifyRequiredProps } from '../types/utilities'

export module KottiFilters {
	export enum ButtonLinkType {
		DANGER = 'danger',
		PRIMARY = 'primary',
	}

	export enum FilterType {
		BOOLEAN = 'BOOLEAN',
		CURRENCY = 'CURRENCY',
		DATE_RANGE = 'DATE_RANGE',
		FLOAT = 'FLOAT',
		INTEGER = 'INTEGER',
		MULTI_ENUM = 'MULTI_ENUM',
		SEARCH = 'SEARCH',
		SINGLE_ENUM = 'SINGLE_ENUM',
		STRING = 'STRING',
	}

	export module Operation {
		export enum Boolean {
			EQUAL = 'EQUAL',
			IS_EMPTY = 'IS_EMPTY',
		}

		export enum Currency {
			EQUAL = 'EQUAL',
			GREATER_THAN = 'GREATER_THAN',
			GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
			IS_EMPTY = 'IS_EMPTY',
			LESS_THAN = 'LESS_THAN',
			LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
		}

		export enum DateRange {
			IN_RANGE = 'IN_RANGE',
			IS_EMPTY = 'IS_EMPTY',
		}

		export enum Float {
			EQUAL = 'EQUAL',
			GREATER_THAN = 'GREATER_THAN',
			GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
			IS_EMPTY = 'IS_EMPTY',
			LESS_THAN = 'LESS_THAN',
			LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
		}

		export enum Integer {
			EQUAL = 'EQUAL',
			GREATER_THAN = 'GREATER_THAN',
			GREATER_THAN_OR_EQUAL = 'GREATER_THAN_OR_EQUAL',
			IS_EMPTY = 'IS_EMPTY',
			LESS_THAN = 'LESS_THAN',
			LESS_THAN_OR_EQUAL = 'LESS_THAN_OR_EQUAL',
		}

		export enum MultiEnum {
			IS_EMPTY = 'IS_EMPTY',
			ONE_OF = 'ONE_OF', // OR
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
			| Operation.Currency
			| Operation.DateRange
			| Operation.Float
			| Operation.Integer
			| Operation.MultiEnum
			| Operation.Search
			| Operation.SingleEnum
			| Operation.String
	}

	export module Column {
		export type Common = {
			key: string
			label: string
		}

		export type Boolean<
			OPERATION extends Operation.Boolean = Operation.Boolean,
		> = Common & {
			operations: OPERATION[]
			type: FilterType.BOOLEAN
		}

		export type Currency<
			OPERATION extends Operation.Currency = Operation.Currency,
		> = Common & {
			currency: KottiFieldCurrency.Props['currency']
			operations: OPERATION[]
			type: FilterType.CURRENCY
		}

		export type DateRange<
			OPERATION extends Operation.DateRange = Operation.DateRange,
		> = Common &
			Pick<
				KottiFieldDateRange.Props,
				'maximumDate' | 'minimumDate' | 'shortcuts'
			> & {
				operations: OPERATION[]
				type: FilterType.DATE_RANGE
			}

		export type Float<OPERATION extends Operation.Float = Operation.Float> =
			Common &
				Pick<
					KottiFieldNumber.Props,
					'decimalPlaces' | 'maximum' | 'minimum' | 'prefix' | 'step' | 'suffix'
				> & {
					operations: OPERATION[]
					type: FilterType.FLOAT
				}

		export type Integer<
			OPERATION extends Operation.Integer = Operation.Integer,
		> = Common &
			Pick<
				KottiFieldNumber.Props,
				'maximum' | 'minimum' | 'prefix' | 'suffix'
			> & {
				operations: OPERATION[]
				type: FilterType.INTEGER
			}

		export type MultiEnum<
			OPERATION extends Operation.MultiEnum = Operation.MultiEnum,
		> = Common & {
			operations: OPERATION[]
			options: KottiFieldMultiSelect.Props['options']
			type: FilterType.MULTI_ENUM
		}

		export type Search = Common & {
			placeholder?: string | null
			type: FilterType.SEARCH
		}

		export type SingleEnum<
			OPERATION extends Operation.SingleEnum = Operation.SingleEnum,
		> = Common & {
			operations: OPERATION[]
			options: KottiFieldSingleSelect.Props['options']
			type: FilterType.SINGLE_ENUM
		}

		export type String<OPERATION extends Operation.String = Operation.String> =
			Common & {
				operations: OPERATION[]
				type: FilterType.STRING
			}

		export type Any =
			| Column.Boolean
			| Column.Currency
			| Column.DateRange
			| Column.Float
			| Column.Integer
			| Column.MultiEnum
			| Column.Search
			| Column.SingleEnum
			| Column.String
	}

	export type FilterValue =
		| KottiFieldCurrency.Value
		| KottiFieldDateRange.Value
		| KottiFieldMultiSelect.Value
		| KottiFieldNumber.Value
		| KottiFieldSingleSelect.Value
		| KottiFieldText.Value
		| KottiFieldToggle.Value

	export type InternalFilter = {
		key: Column.Any['key']
		operation: Operation.Any
		value: FilterValue
	}

	export type InternalFilterSearch = {
		key: Column.Search['key']
		operation: Operation.Search
		value: KottiFieldText.Value
	}

	export type Filter = SpecifyRequiredProps<
		InternalFilter,
		'key' | 'operation' | 'value'
	>

	export type Value = Filter[]

	export type PropsInternal = {
		columns: Column.Any[]
		dataTest: string | null
		isLoading: boolean
		value: Value
	}

	export type Props = SpecifyRequiredProps<PropsInternal, 'columns' | 'value'>

	export module Events {
		export type UpdateColumns = PropsInternal['columns']

		export type UpdateValue = PropsInternal['value']
	}

	export type Translations = {
		addFilterLabel: string
		andLabel: string
		boolean: Record<Operation.Boolean, string>
		clearAllLabel: string
		currency: Record<Operation.Currency, string>
		dateRange: Record<Operation.DateRange, string>
		emptyListLabel: string
		filterLabel: string
		filtersLabel: string
		float: Record<Operation.Float, string>
		integer: Record<Operation.Integer, string>
		multiEnum: Record<Operation.MultiEnum, string>
		searchLabel: string
		singleEnum: Record<Operation.SingleEnum, string>
		string: Record<Operation.String, string>
		unsetLabel: string
		whereLabel: string
	}
}
