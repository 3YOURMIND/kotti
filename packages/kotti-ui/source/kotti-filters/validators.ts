import { Kotti } from '../types'

const isNonEmptyString = (value: unknown): value is string =>
	typeof value === 'string' && value.length > 0

const isValueInEnum = <KEY extends string>(
	value: string,
	enumObject: Record<KEY, string>,
): boolean => Object.values(enumObject).includes(value)

const areValidOperations = (
	operations: Kotti.Filters.Operation.Any[],
	filterType: Kotti.Filters.FilterType,
): boolean => {
	switch (filterType) {
		case Kotti.Filters.FilterType.BOOLEAN:
			return operations.every((operation) =>
				isValueInEnum<Kotti.Filters.Operation.Boolean>(
					operation,
					Kotti.Filters.Operation.Boolean,
				),
			)
		case Kotti.Filters.FilterType.CURRENCY:
			return operations.every((operation) =>
				isValueInEnum<Kotti.Filters.Operation.Currency>(
					operation,
					Kotti.Filters.Operation.Currency,
				),
			)
		case Kotti.Filters.FilterType.DATE_RANGE:
			return operations.every((operation) =>
				isValueInEnum<Kotti.Filters.Operation.DateRange>(
					operation,
					Kotti.Filters.Operation.DateRange,
				),
			)
		case Kotti.Filters.FilterType.INTEGER:
			return operations.every((operation) =>
				isValueInEnum<Kotti.Filters.Operation.Integer>(
					operation,
					Kotti.Filters.Operation.Integer,
				),
			)
		case Kotti.Filters.FilterType.MULTI_ENUM:
			return operations.every((operation) =>
				isValueInEnum<Kotti.Filters.Operation.MultiEnum>(
					operation,
					Kotti.Filters.Operation.MultiEnum,
				),
			)
		case Kotti.Filters.FilterType.SINGLE_ENUM:
			return operations.every((operation) =>
				isValueInEnum<Kotti.Filters.Operation.SingleEnum>(
					operation,
					Kotti.Filters.Operation.SingleEnum,
				),
			)
		case Kotti.Filters.FilterType.STRING:
			return operations.every((operation) =>
				isValueInEnum<Kotti.Filters.Operation.String>(
					operation,
					Kotti.Filters.Operation.String,
				),
			)
		default:
			return false
	}
}

export const isValidColumn = (
	column: Kotti.Filters.Column.Any,
): column is Kotti.Filters.Column.Any => {
	const isValidKey = isNonEmptyString(column.key)
	const isValidLabel = isNonEmptyString(column.label)
	if (column.type === Kotti.Filters.FilterType.SEARCH)
		return isValidKey && isValidLabel
	return (
		isValidKey &&
		isValidLabel &&
		Array.isArray(column.operations) &&
		column.operations.length > 0 &&
		areValidOperations(column.operations, column.type)
	)
}
