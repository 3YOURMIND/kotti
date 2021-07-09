import { useTranslationNamespace } from '../kotti-translation/hooks'
import { Kotti } from '../types'

export const getFilterEmptyValue = (
	type: Kotti.Filters.Column.Any['type'],
): null | [null, null] | [] => {
	switch (type) {
		case Kotti.Filters.FilterType.BOOLEAN:
		case Kotti.Filters.FilterType.CURRENCY:
		case Kotti.Filters.FilterType.FLOAT:
		case Kotti.Filters.FilterType.INTEGER:
		case Kotti.Filters.FilterType.SINGLE_ENUM:
		case Kotti.Filters.FilterType.STRING:
			return null
		case Kotti.Filters.FilterType.DATE_RANGE:
			return [null, null]
		case Kotti.Filters.FilterType.MULTI_ENUM:
			return []
		default:
			throw new Error('Invalid Filter Type')
	}
}

const getFilterInitialOperation = (
	operations: Kotti.Filters.Operation.Any[],
	defaultOperation: Kotti.Filters.Operation.Any,
): Kotti.Filters.Operation.Any => {
	if (!Array.isArray(operations) || operations.length === 0)
		throw new Error('Invalid Filter Operations')
	return operations.includes(defaultOperation)
		? defaultOperation
		: operations[0]
}

export const getFilterInitialState = (
	columnKey: Kotti.Filters.Column.Any['key'],
	columns: Kotti.Filters.Column.Any[],
): Kotti.Filters.InternalFilter => {
	const column = columns.find((columnItem) => columnItem.key === columnKey)
	switch (column?.type) {
		case Kotti.Filters.FilterType.BOOLEAN:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					Kotti.Filters.Operation.Boolean.EQUAL,
				),
				value: null,
			}
		case Kotti.Filters.FilterType.CURRENCY:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					Kotti.Filters.Operation.Currency.EQUAL,
				),
				value: null,
			}
		case Kotti.Filters.FilterType.DATE_RANGE:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					Kotti.Filters.Operation.DateRange.IN_RANGE,
				),
				value: [null, null],
			}
		case Kotti.Filters.FilterType.FLOAT:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					Kotti.Filters.Operation.Float.EQUAL,
				),
				value: null,
			}
		case Kotti.Filters.FilterType.INTEGER:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					Kotti.Filters.Operation.Integer.EQUAL,
				),
				value: null,
			}
		case Kotti.Filters.FilterType.MULTI_ENUM:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					Kotti.Filters.Operation.MultiEnum.ONE_OF,
				),
				value: [],
			}
		case Kotti.Filters.FilterType.SINGLE_ENUM:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					Kotti.Filters.Operation.SingleEnum.EQUAL,
				),
				value: null,
			}
		case Kotti.Filters.FilterType.STRING:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					Kotti.Filters.Operation.String.CONTAINS,
				),
				value: null,
			}
		default:
			throw new Error('Invalid Filter Type: initial state not found')
	}
}

export const getOperationOptions = (
	column: Kotti.Filters.Column.Any,
): Kotti.FieldSingleSelect.Props['options'] => {
	const translations = useTranslationNamespace('KtFilters')
	switch (column.type) {
		case Kotti.Filters.FilterType.BOOLEAN:
			return column.operations.map((operation) => ({
				label: translations.value.boolean[operation],
				value: operation,
			}))
		case Kotti.Filters.FilterType.CURRENCY:
			return column.operations.map((operation) => ({
				label: translations.value.currency[operation],
				value: operation,
			}))
		case Kotti.Filters.FilterType.DATE_RANGE:
			return column.operations.map((operation) => ({
				label: translations.value.dateRange[operation],
				value: operation,
			}))
		case Kotti.Filters.FilterType.FLOAT:
			return column.operations.map((operation) => ({
				label: translations.value.float[operation],
				value: operation,
			}))
		case Kotti.Filters.FilterType.INTEGER:
			return column.operations.map((operation) => ({
				label: translations.value.integer[operation],
				value: operation,
			}))
		case Kotti.Filters.FilterType.MULTI_ENUM:
			return column.operations.map((operation) => ({
				label: translations.value.multiEnum[operation],
				value: operation,
			}))
		case Kotti.Filters.FilterType.SINGLE_ENUM:
			return column.operations.map((operation) => ({
				label: translations.value.singleEnum[operation],
				value: operation,
			}))
		case Kotti.Filters.FilterType.STRING:
			return column.operations.map((operation) => ({
				label: translations.value.string[operation],
				value: operation,
			}))
		default:
			throw new Error('Invalid Column Type: filter operations not found')
	}
}

export const getSearchFilterInitialState = (
	searchColumn: Kotti.Filters.Column.Search,
): Kotti.Filters.InternalFilter => ({
	key: searchColumn.key,
	operation: Kotti.Filters.Operation.String.CONTAINS,
	value: null,
})

export const getValueComponent = (
	filterType: Kotti.Filters.FilterType,
): string => {
	switch (filterType) {
		case Kotti.Filters.FilterType.BOOLEAN:
			return 'KtFieldToggle'
		case Kotti.Filters.FilterType.CURRENCY:
		case Kotti.Filters.FilterType.FLOAT:
		case Kotti.Filters.FilterType.INTEGER:
			return 'KtFieldNumber'
		case Kotti.Filters.FilterType.DATE_RANGE:
			return 'KtFieldDateRange'
		case Kotti.Filters.FilterType.MULTI_ENUM:
			return 'KtFieldMultiSelect'
		case Kotti.Filters.FilterType.SINGLE_ENUM:
			return 'KtFieldSingleSelect'
		case Kotti.Filters.FilterType.STRING:
			return 'KtFieldText'
		default:
			throw new Error('Invalid Filter Type: value component not found')
	}
}

export const isEmptyOperation = (
	filterOperation: Kotti.Filters.InternalFilter['operation'],
	filterType: Kotti.Filters.FilterType,
): boolean => {
	switch (filterType) {
		case Kotti.Filters.FilterType.BOOLEAN:
			return filterOperation === Kotti.Filters.Operation.Boolean.IS_EMPTY
		case Kotti.Filters.FilterType.CURRENCY:
			return filterOperation === Kotti.Filters.Operation.Currency.IS_EMPTY
		case Kotti.Filters.FilterType.DATE_RANGE:
			return filterOperation === Kotti.Filters.Operation.DateRange.IS_EMPTY
		case Kotti.Filters.FilterType.FLOAT:
			return filterOperation === Kotti.Filters.Operation.Float.IS_EMPTY
		case Kotti.Filters.FilterType.INTEGER:
			return filterOperation === Kotti.Filters.Operation.Integer.IS_EMPTY
		case Kotti.Filters.FilterType.MULTI_ENUM:
			return filterOperation === Kotti.Filters.Operation.MultiEnum.IS_EMPTY
		case Kotti.Filters.FilterType.SINGLE_ENUM:
			return filterOperation === Kotti.Filters.Operation.SingleEnum.IS_EMPTY
		case Kotti.Filters.FilterType.STRING:
			return filterOperation === Kotti.Filters.Operation.String.IS_EMPTY
		default:
			return false
	}
}
