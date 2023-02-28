import { KottiTable } from '../../types'

export type RowKeyProp = Exclude<KottiTable.Props['rowKey'], undefined>
export type RowIdentifier = (row: KottiTable.Row.Props) => string | number
export type RowEqualAssert = (
	row: KottiTable.Row.Props,
) => (row: KottiTable.Row.Props) => boolean

export const getRowKeyIdentifer =
	(rowKeyProp: RowKeyProp): RowIdentifier =>
	(row) =>
		typeof rowKeyProp === 'function'
			? rowKeyProp(row)
			: (row[rowKeyProp] as string | number)

export const getRowEqualityAssert =
	(identifyFunction: RowIdentifier): RowEqualAssert =>
	(baseRow: KottiTable.Row.Props) => {
		const baseLine = identifyFunction(baseRow)
		return (row) => baseLine === identifyFunction(row)
	}

export const getColumnIndexByProp = <T extends { prop: string }>(
	columns: T[],
	prop: string,
) => columns.findIndex((column) => prop === column.prop)
