import { useTranslationNamespace } from '../kotti-translation/hooks'
import { Kotti } from '../types'

export const getFilterEmptyValue = (
	filterKey: Kotti.Filter.Column['type'],
): null | [null, null] | [] => {
	switch (filterKey) {
		case Kotti.Filter.FilterType.BOOLEAN:
		case Kotti.Filter.FilterType.NUMBER:
		case Kotti.Filter.FilterType.SINGLE_ENUM:
		case Kotti.Filter.FilterType.STRING:
			return null
		case Kotti.Filter.FilterType.DATE_RANGE:
			return [null, null]
		case Kotti.Filter.FilterType.MULTI_ENUM:
			return []
		default:
			throw new Error('Invalid Filter Type')
	}
}

const getOperation = (
	operations: Kotti.Filter.FilterOperation[],
	defaultOperation: Kotti.Filter.FilterOperation,
): Kotti.Filter.FilterOperation => {
	if (!Array.isArray(operations) || operations.length === 0)
		throw new Error('Invalid Filter Operations')
	return operations.includes(defaultOperation)
		? defaultOperation
		: operations[0]
}

export const getFilterInitialState = (
	columnKey: Kotti.Filter.Column['key'],
	columns: Kotti.Filter.Column[],
): Kotti.Filter.InternalFilter => {
	const column = columns.find((columnItem) => columnItem.key === columnKey)
	switch (column?.type) {
		case Kotti.Filter.FilterType.BOOLEAN:
			return {
				key: columnKey,
				operation: getOperation(
					column.operations,
					Kotti.Filter.Operation.Boolean.EQUAL,
				),
				value: null,
			}
		case Kotti.Filter.FilterType.DATE_RANGE:
			return {
				key: columnKey,
				operation: getOperation(
					column.operations,
					Kotti.Filter.Operation.DateRange.IN_RANGE,
				),
				value: [null, null],
			}
		case Kotti.Filter.FilterType.MULTI_ENUM:
			return {
				key: columnKey,
				operation: getOperation(
					column.operations,
					Kotti.Filter.Operation.MultiEnum.ONE_OF,
				),
				value: [],
			}
		case Kotti.Filter.FilterType.NUMBER:
			return {
				key: columnKey,
				operation: getOperation(
					column.operations,
					Kotti.Filter.Operation.Number.EQUAL,
				),
				value: null,
			}
		case Kotti.Filter.FilterType.SINGLE_ENUM:
			return {
				key: columnKey,
				operation: getOperation(
					column.operations,
					Kotti.Filter.Operation.SingleEnum.EQUAL,
				),
				value: null,
			}
		case Kotti.Filter.FilterType.STRING:
			return {
				key: columnKey,
				operation: getOperation(
					column.operations,
					Kotti.Filter.Operation.String.CONTAINS,
				),
				value: null,
			}
		default:
			throw new Error('Invalid Filter Type: initial state not found')
	}
}

export const getOperationOptions = (
	column: Kotti.Filter.Column,
): Kotti.FieldSingleSelect.Props['options'] => {
	const translations = useTranslationNamespace('KtFilter')
	switch (column.type) {
		case Kotti.Filter.FilterType.BOOLEAN:
			return column.operations.map((operation) => ({
				label: translations.value.boolean[operation],
				value: operation,
			}))
		case Kotti.Filter.FilterType.DATE_RANGE:
			return column.operations.map((operation) => ({
				label: translations.value.dateRange[operation],
				value: operation,
			}))
		case Kotti.Filter.FilterType.MULTI_ENUM:
			return column.operations.map((operation) => ({
				label: translations.value.multiEnum[operation],
				value: operation,
			}))
		case Kotti.Filter.FilterType.NUMBER:
			return column.operations.map((operation) => ({
				label: translations.value.number[operation],
				value: operation,
			}))
		case Kotti.Filter.FilterType.SINGLE_ENUM:
			return column.operations.map((operation) => ({
				label: translations.value.singleEnum[operation],
				value: operation,
			}))
		case Kotti.Filter.FilterType.STRING:
			return column.operations.map((operation) => ({
				label: translations.value.string[operation],
				value: operation,
			}))
		default:
			throw new Error('Invalid Column Type: filter operations not found')
	}
}

export const getSearchFilterInitialState = (
	searchColumn: Kotti.Filter.Column,
): Kotti.Filter.InternalFilter => ({
	key: searchColumn.key,
	operation: Kotti.Filter.Operation.String.CONTAINS,
	value: null,
})

export const getValueComponent = (
	filterType: Kotti.Filter.FilterType,
): string => {
	switch (filterType) {
		case Kotti.Filter.FilterType.BOOLEAN:
			return 'KtFieldToggle'
		case Kotti.Filter.FilterType.DATE_RANGE:
			return 'KtFieldDateRange'
		case Kotti.Filter.FilterType.MULTI_ENUM:
			return 'KtFieldMultiSelect'
		case Kotti.Filter.FilterType.NUMBER:
			return 'KtFieldNumber'
		case Kotti.Filter.FilterType.SINGLE_ENUM:
			return 'KtFieldSingleSelect'
		case Kotti.Filter.FilterType.STRING:
			return 'KtFieldText'
		default:
			throw new Error('Invalid Filter Type: value component not found')
	}
}

export const isEmptyOperation = (
	filterOperation: Kotti.Filter.InternalFilter['operation'],
	filterType: Kotti.Filter.FilterType,
): boolean => {
	switch (filterType) {
		case Kotti.Filter.FilterType.BOOLEAN:
			return filterOperation === Kotti.Filter.Operation.Boolean.IS_EMPTY
		case Kotti.Filter.FilterType.DATE_RANGE:
			return filterOperation === Kotti.Filter.Operation.DateRange.IS_EMPTY
		case Kotti.Filter.FilterType.MULTI_ENUM:
			return filterOperation === Kotti.Filter.Operation.MultiEnum.IS_EMPTY
		case Kotti.Filter.FilterType.NUMBER:
			return filterOperation === Kotti.Filter.Operation.Number.IS_EMPTY
		case Kotti.Filter.FilterType.SINGLE_ENUM:
			return filterOperation === Kotti.Filter.Operation.SingleEnum.IS_EMPTY
		case Kotti.Filter.FilterType.STRING:
			return filterOperation === Kotti.Filter.Operation.String.IS_EMPTY
		default:
			return false
	}
}
