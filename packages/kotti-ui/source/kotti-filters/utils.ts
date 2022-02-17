import { KottiFieldSingleSelect } from '../kotti-field-select/types'
import { useTranslationNamespace } from '../kotti-i18n/hooks'

import { KottiFilters } from './types'

export const getFilterEmptyValue = (
	type: KottiFilters.Column.Any['type'],
): null | [null, null] | [] => {
	switch (type) {
		case KottiFilters.FilterType.BOOLEAN:
		case KottiFilters.FilterType.CURRENCY:
		case KottiFilters.FilterType.FLOAT:
		case KottiFilters.FilterType.INTEGER:
		case KottiFilters.FilterType.SINGLE_ENUM:
		case KottiFilters.FilterType.STRING:
			return null
		case KottiFilters.FilterType.DATE_RANGE:
			return [null, null]
		case KottiFilters.FilterType.MULTI_ENUM:
			return []
		default:
			throw new Error('Invalid Filter Type')
	}
}

const getFilterInitialOperation = (
	operations: KottiFilters.Operation.Any[],
	defaultOperation: KottiFilters.Operation.Any,
): KottiFilters.Operation.Any => {
	if (!Array.isArray(operations) || operations.length === 0)
		throw new Error('Invalid Filter Operations')
	return operations.includes(defaultOperation)
		? defaultOperation
		: operations[0]
}

export const getFilterInitialState = (
	columnKey: KottiFilters.Column.Any['key'],
	columns: KottiFilters.Column.Any[],
): KottiFilters.InternalFilter => {
	const column = columns.find((columnItem) => columnItem.key === columnKey)
	switch (column?.type) {
		case KottiFilters.FilterType.BOOLEAN:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					KottiFilters.Operation.Boolean.EQUAL,
				),
				value: null,
			}
		case KottiFilters.FilterType.CURRENCY:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					KottiFilters.Operation.Currency.EQUAL,
				),
				value: null,
			}
		case KottiFilters.FilterType.DATE_RANGE:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					KottiFilters.Operation.DateRange.IN_RANGE,
				),
				value: [null, null],
			}
		case KottiFilters.FilterType.FLOAT:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					KottiFilters.Operation.Float.EQUAL,
				),
				value: null,
			}
		case KottiFilters.FilterType.INTEGER:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					KottiFilters.Operation.Integer.EQUAL,
				),
				value: null,
			}
		case KottiFilters.FilterType.MULTI_ENUM:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					KottiFilters.Operation.MultiEnum.ONE_OF,
				),
				value: [],
			}
		case KottiFilters.FilterType.SINGLE_ENUM:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					KottiFilters.Operation.SingleEnum.EQUAL,
				),
				value: null,
			}
		case KottiFilters.FilterType.STRING:
			return {
				key: columnKey,
				operation: getFilterInitialOperation(
					column.operations,
					KottiFilters.Operation.String.CONTAINS,
				),
				value: null,
			}
		default:
			throw new Error('Invalid Filter Type: initial state not found')
	}
}

export const getOperationOptions = (
	column: KottiFilters.Column.Any,
): KottiFieldSingleSelect.Props['options'] => {
	const translations = useTranslationNamespace('KtFilters')
	switch (column.type) {
		case KottiFilters.FilterType.BOOLEAN:
			return column.operations.map((operation) => ({
				label: translations.value.boolean[operation],
				value: operation,
			}))
		case KottiFilters.FilterType.CURRENCY:
			return column.operations.map((operation) => ({
				label: translations.value.currency[operation],
				value: operation,
			}))
		case KottiFilters.FilterType.DATE_RANGE:
			return column.operations.map((operation) => ({
				label: translations.value.dateRange[operation],
				value: operation,
			}))
		case KottiFilters.FilterType.FLOAT:
			return column.operations.map((operation) => ({
				label: translations.value.float[operation],
				value: operation,
			}))
		case KottiFilters.FilterType.INTEGER:
			return column.operations.map((operation) => ({
				label: translations.value.integer[operation],
				value: operation,
			}))
		case KottiFilters.FilterType.MULTI_ENUM:
			return column.operations.map((operation) => ({
				label: translations.value.multiEnum[operation],
				value: operation,
			}))
		case KottiFilters.FilterType.SINGLE_ENUM:
			return column.operations.map((operation) => ({
				label: translations.value.singleEnum[operation],
				value: operation,
			}))
		case KottiFilters.FilterType.STRING:
			return column.operations.map((operation) => ({
				label: translations.value.string[operation],
				value: operation,
			}))
		default:
			throw new Error('Invalid Column Type: filter operations not found')
	}
}

export const getSearchFilterInitialState = (
	searchColumn: KottiFilters.Column.Search,
): KottiFilters.InternalFilter => ({
	key: searchColumn.key,
	operation: KottiFilters.Operation.Search.CONTAINS,
	value: null,
})

export const getValueComponent = (
	filterType: KottiFilters.FilterType,
): string => {
	switch (filterType) {
		case KottiFilters.FilterType.BOOLEAN:
			return 'KtFieldToggle'
		case KottiFilters.FilterType.CURRENCY:
			return 'KtFieldCurrency'
		case KottiFilters.FilterType.FLOAT:
		case KottiFilters.FilterType.INTEGER:
			return 'KtFieldNumber'
		case KottiFilters.FilterType.DATE_RANGE:
			return 'KtFieldDateRange'
		case KottiFilters.FilterType.MULTI_ENUM:
			return 'KtFieldMultiSelect'
		case KottiFilters.FilterType.SINGLE_ENUM:
			return 'KtFieldSingleSelect'
		case KottiFilters.FilterType.STRING:
			return 'KtFieldText'
		default:
			throw new Error('Invalid Filter Type: value component not found')
	}
}

export const isEmptyOperation = (
	filterOperation: KottiFilters.InternalFilter['operation'],
	filterType: KottiFilters.FilterType,
): boolean => {
	switch (filterType) {
		case KottiFilters.FilterType.BOOLEAN:
			return filterOperation === KottiFilters.Operation.Boolean.IS_EMPTY
		case KottiFilters.FilterType.CURRENCY:
			return filterOperation === KottiFilters.Operation.Currency.IS_EMPTY
		case KottiFilters.FilterType.DATE_RANGE:
			return filterOperation === KottiFilters.Operation.DateRange.IS_EMPTY
		case KottiFilters.FilterType.FLOAT:
			return filterOperation === KottiFilters.Operation.Float.IS_EMPTY
		case KottiFilters.FilterType.INTEGER:
			return filterOperation === KottiFilters.Operation.Integer.IS_EMPTY
		case KottiFilters.FilterType.MULTI_ENUM:
			return filterOperation === KottiFilters.Operation.MultiEnum.IS_EMPTY
		case KottiFilters.FilterType.SINGLE_ENUM:
			return filterOperation === KottiFilters.Operation.SingleEnum.IS_EMPTY
		case KottiFilters.FilterType.STRING:
			return filterOperation === KottiFilters.Operation.String.IS_EMPTY
		default:
			return false
	}
}
