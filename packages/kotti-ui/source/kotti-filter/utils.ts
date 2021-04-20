import { useTranslationNamespace } from '../kotti-translation/hooks'
import { Kotti } from '../types'

export const getSearchFilterInitialState = (
	searchColumn: Kotti.Filter.Column,
) => ({
	key: searchColumn.key,
	operation: Kotti.Filter.Operation.String.CONTAINS,
	value: null,
})

export const getFilterInitialState = (
	columnKey: Kotti.Filter.Column['key'],
	columns: Kotti.Filter.Column[],
): Kotti.Filter.InternalFilter => {
	const column = columns.find((columnItem) => columnItem.key === columnKey)
	switch (column?.type) {
		case Kotti.Filter.FilterType.BOOLEAN:
			return {
				key: columnKey,
				operation: Kotti.Filter.Operation.Boolean.EQUAL,
				value: null,
			}
		case Kotti.Filter.FilterType.DATE_RANGE:
			return {
				key: columnKey,
				operation: Kotti.Filter.Operation.DateRange.IN,
				value: [null, null],
			}
		case Kotti.Filter.FilterType.MULTI_ENUM:
			return {
				key: columnKey,
				operation: Kotti.Filter.Operation.MultiEnum.ONE_OF,
				value: [],
			}
		case Kotti.Filter.FilterType.NUMBER:
			return {
				key: columnKey,
				operation: Kotti.Filter.Operation.Number.EQUAL,
				value: null,
			}
		case Kotti.Filter.FilterType.SINGLE_ENUM:
			return {
				key: columnKey,
				operation: Kotti.Filter.Operation.SingleEnum.EQUAL,
				value: null,
			}
		case Kotti.Filter.FilterType.STRING:
			return {
				key: columnKey,
				operation: Kotti.Filter.Operation.String.CONTAINS,
				value: null,
			}
		default:
			throw new Error('Invalid Filter Type: initial state not found')
	}
}

export const getOperationOptions = (
	filterType: Kotti.Filter.FilterType,
): Kotti.FieldSingleSelect.Props['options'] => {
	const translations = useTranslationNamespace('KtFilter')
	switch (filterType) {
		case Kotti.Filter.FilterType.BOOLEAN:
			return Object.values(Kotti.Filter.Operation.Boolean).map((operation) => ({
				label: translations.value.boolean[operation],
				value: operation,
			}))
		case Kotti.Filter.FilterType.DATE_RANGE:
			return Object.values(Kotti.Filter.Operation.DateRange).map(
				(operation) => ({
					label: translations.value.dateRange[operation],
					value: operation,
				}),
			)
		case Kotti.Filter.FilterType.MULTI_ENUM:
			return Object.values(Kotti.Filter.Operation.MultiEnum).map(
				(operation) => ({
					label: translations.value.multiEnum[operation],
					value: operation,
				}),
			)
		case Kotti.Filter.FilterType.NUMBER:
			return Object.values(Kotti.Filter.Operation.Number).map((operation) => ({
				label: translations.value.number[operation],
				value: operation,
			}))
		case Kotti.Filter.FilterType.SINGLE_ENUM:
			return Object.values(Kotti.Filter.Operation.SingleEnum).map(
				(operation) => ({
					label: translations.value.singleEnum[operation],
					value: operation,
				}),
			)
		case Kotti.Filter.FilterType.STRING:
			return Object.values(Kotti.Filter.Operation.String).map((operation) => ({
				label: translations.value.string[operation],
				value: operation,
			}))
		default:
			throw new Error('Invalid Filter Type: filter operations not found')
	}
}

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
