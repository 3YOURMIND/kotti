import { KottiFilters } from './types'

const isNonEmptyString = (value: unknown): value is string =>
	typeof value === 'string' && value.length > 0

const isValueInEnum = <KEY extends string>(
	value: string,
	enumObject: Record<KEY, string>,
): boolean => Object.values(enumObject).includes(value)

const areValidOperations = (
	operations: KottiFilters.Operation.Any[],
	filterType: KottiFilters.FilterType,
): boolean => {
	switch (filterType) {
		case KottiFilters.FilterType.BOOLEAN:
			return operations.every((operation) =>
				isValueInEnum<KottiFilters.Operation.Boolean>(
					operation,
					KottiFilters.Operation.Boolean,
				),
			)
		case KottiFilters.FilterType.CURRENCY:
			return operations.every((operation) =>
				isValueInEnum<KottiFilters.Operation.Currency>(
					operation,
					KottiFilters.Operation.Currency,
				),
			)
		case KottiFilters.FilterType.DATE_RANGE:
			return operations.every((operation) =>
				isValueInEnum<KottiFilters.Operation.DateRange>(
					operation,
					KottiFilters.Operation.DateRange,
				),
			)
		case KottiFilters.FilterType.FLOAT:
			return operations.every((operation) =>
				isValueInEnum<KottiFilters.Operation.Float>(
					operation,
					KottiFilters.Operation.Float,
				),
			)
		case KottiFilters.FilterType.INTEGER:
			return operations.every((operation) =>
				isValueInEnum<KottiFilters.Operation.Integer>(
					operation,
					KottiFilters.Operation.Integer,
				),
			)
		case KottiFilters.FilterType.MULTI_ENUM:
			return operations.every((operation) =>
				isValueInEnum<KottiFilters.Operation.MultiEnum>(
					operation,
					KottiFilters.Operation.MultiEnum,
				),
			)
		case KottiFilters.FilterType.SINGLE_ENUM:
			return operations.every((operation) =>
				isValueInEnum<KottiFilters.Operation.SingleEnum>(
					operation,
					KottiFilters.Operation.SingleEnum,
				),
			)
		case KottiFilters.FilterType.STRING:
			return operations.every((operation) =>
				isValueInEnum<KottiFilters.Operation.String>(
					operation,
					KottiFilters.Operation.String,
				),
			)
		default:
			return false
	}
}

export const isValidColumn = (
	column: KottiFilters.Column.Any,
): column is KottiFilters.Column.Any => {
	const isValidKey = isNonEmptyString(column.key)
	const isValidLabel = isNonEmptyString(column.label)
	if (column.type === KottiFilters.FilterType.SEARCH)
		return isValidKey && isValidLabel
	return (
		isValidKey &&
		isValidLabel &&
		Array.isArray(column.operations) &&
		column.operations.length > 0 &&
		areValidOperations(column.operations, column.type)
	)
}
