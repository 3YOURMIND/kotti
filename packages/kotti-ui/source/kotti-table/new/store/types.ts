import { KottiTable } from '../../types'

import { RowKeyProp } from './utils'

type Getter<T> = (
	state: KottiTableStoreState,
	tableProps: KottiTable.Props,
) => T

type Mutation<Arg> = Arg extends undefined
	? (state: KottiTableStore) => void
	: (state: KottiTableStore, arg: Arg) => void

export type KottiTableStoreState = {
	enabledRows: KottiTable.Row.Props[]
	expandedRows: KottiTable.Row.Props[]
	hiddenColumns: KottiTable.Column.Hidden[]
	isAllRowsDisabled: boolean
	rows: KottiTable.Row.Props[]
	rowKey: RowKeyProp
	selectedRows: KottiTable.Row.Props[]
}

export type KottiTableStoreGetters = {
	areAllRowsDisabled: Getter<boolean>
	enabledRows: Getter<KottiTable.Row.Props[]>
	getIndexByRow: Getter<(row: KottiTable.Row.Props) => number>
	getRowKey: Getter<(row: KottiTable.Row.Props) => number | string>
	getRowByVisibleIndex: Getter<(index: number) => KottiTable.Row.Props>
	isAllSelected: Getter<boolean>
	isExpanded: Getter<(row: KottiTable.Row.Props) => boolean>
	isSelected: Getter<(row: KottiTable.Row.Props) => boolean>
}

export type KottiTableStoreMutations = {
	cleanSelection: Mutation<undefined>
	clearSelection: Mutation<undefined>
	expandRow: Mutation<KottiTable.Row.Props>
	hideColumn: Mutation<{ column: KottiTable.Column.Hidden; isHidden?: boolean }>
	selectRow: Mutation<{
		row: KottiTable.Row.Props
		selected?: boolean
	}>
	setHiddenColumns: Mutation<KottiTable.Column.Props[]>
	setSelected: Mutation<KottiTable.Row.Props[]>
	showAll: Mutation<undefined>
	toggleAllSelection: Mutation<undefined>
	updateColumns: Mutation<
		{ emitChange?: boolean; refreshColumnArray?: boolean } | undefined
	>
	updateDisabledRows: Mutation<undefined>
}

export type KottiTableEmit = {
	expandChange: KottiTable.Row.Props[]
	hiddenChange: KottiTable.Column.Hidden[]
	select: KottiTable.Row.Props[]
	selectAll: KottiTable.Row.Props[]
	selectionChange: KottiTable.Row.Props[]
}

export type KottiTableStore = {
	state: KottiTableStoreState
	getters: KottiTableStoreGetters
	mutations: KottiTableStoreMutations
	tableProps: KottiTable.Props
	commit: <MUTATION extends keyof KottiTableStoreMutations>(
		mutation: MUTATION,
		...arg: undefined extends Parameters<KottiTableStoreMutations[MUTATION]>[1]
			? [payload?: Parameters<KottiTableStoreMutations[MUTATION]>[1]]
			: [payload: Parameters<KottiTableStoreMutations[MUTATION]>[1]]
	) => void
	get: <GETTER extends keyof KottiTableStoreGetters>(
		getter: GETTER,
	) => ReturnType<KottiTableStoreGetters[GETTER]>
	emit: <EMIT extends keyof KottiTableEmit>(
		emit: EMIT,
		arg: KottiTableEmit[EMIT],
		...rest: unknown[]
	) => void
}
