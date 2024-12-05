import dayjs from 'dayjs'
import { h, type VNode } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import type { KottiI18n } from '../../kotti-i18n/types'

import type { AnyRow } from './types'

type DisplayOptionBoolean = {
	mode: 'icon' | 'text'
	type: 'boolean'
}
type DisplayOptionCustom<DATA> = {
	align: 'center' | 'left' | 'right'
	disableCellClick: boolean
	isNumeric: boolean
	render: (
		data: DATA,
		context: { i18n: KottiI18n.ContextInternal },
	) => VNode | string | null
}
type DisplayOptionDate = {
	formatString: string
	type: 'date'
}
type DisplayOptionDateTime = {
	formatString: string
	type: 'date-time'
}
type DisplayOptionInteger = { type: 'integer' }
type DisplayOptionNumerical = {
	decimalPlaces?: number
	type: 'numerical'
}
type DisplayOptionText = { type: 'text' }
type DisplayOption =
	| DisplayOptionBoolean
	| DisplayOptionDate
	| DisplayOptionDateTime
	| DisplayOptionInteger
	| DisplayOptionNumerical
	| DisplayOptionText

type Display<DATA_TYPE> = {
	align: 'center' | 'left' | 'right'
	disableCellClick: boolean
	isNumeric: boolean
	render: (
		value: DATA_TYPE,
		context: { i18n: KottiI18n.ContextInternal },
	) => VNode | string | null
}

export function getDisplay(param: DisplayOptionBoolean): Display<boolean | null>
export function getDisplay(
	param: DisplayOptionDate | DisplayOptionDateTime,
): Display<Date | null>
export function getDisplay(
	param: DisplayOptionInteger | DisplayOptionNumerical,
): Display<number | null>
export function getDisplay(param: DisplayOptionText): Display<string | null>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function getDisplay(param: DisplayOption): Display<any> {
	switch (param.type) {
		case 'boolean': {
			return {
				align: param.mode === 'text' ? 'left' : 'center',
				disableCellClick: false,
				isNumeric: false,
				render: (value: boolean | null, { i18n }) => {
					if (value === null) return null

					if (param.mode === 'text') {
						return value ? i18n.messages.KtTable.yes : i18n.messages.KtTable.no
					}

					const [color, icon] = value
						? ['var(--support-success)', Yoco.Icon.CHECK]
						: ['var(--support-error)', Yoco.Icon.CIRCLE_CROSS]

					return h(
						'i',
						{
							class: 'yoco',
							style: { color: color, fontSize: '1rem' },
						},
						icon,
					)
				},
			}
		}
		case 'date':
		case 'date-time': {
			return {
				align: 'left',
				disableCellClick: false,
				isNumeric: true,
				render: (value: Date | null) =>
					value === null ? null : dayjs(value).format(param.formatString),
			}
		}
		case 'integer': {
			return {
				align: 'right',
				disableCellClick: false,
				isNumeric: true,
				render: (value: number | null) =>
					value === null ? null : String(Math.round(value)),
			}
		}
		case 'numerical': {
			return {
				align: 'right',
				disableCellClick: false,
				isNumeric: true,
				render: (value: number | null, { i18n }) =>
					value === null
						? null
						: value
								.toFixed(param.decimalPlaces ?? 2)
								.replace('.', i18n.numberFormat.decimalSeparator),
			}
		}
		case 'text': {
			return {
				align: 'left',
				disableCellClick: false,
				isNumeric: false,
				render: (value: string | null) => value,
			}
		}
	}
}

export const getCustomDisplay = <
	DATA = 'please provide a generic parameter for your expected data type if you use type custom',
>(
	param: DisplayOptionCustom<DATA>,
): Display<DATA> => {
	return param
}

// const x = getCustomDisplay({
// 	align: 'center',
// 	disableCellClick: false,
// 	isNumeric: false,
// 	render: (_ineedastringpls: string) => 'wow',
// 	type: 'custom',
// })

// getDisplay()
// getCustomDisplay()

// const display1 = getDisplay({ type: 'numerical' })
// const display2 = getDisplay({ type: 'text' })
// const display3 = getDisplay({ type: 'integer' })
// const display4 = getCustomDisplay<{ c: string; d: number }>({
// 	align: 'center',
// 	disableCellClick: false,
// 	isNumeric: false,
// 	render: (ineedastringpls) => 'wow such string, thank you',
// 	type: 'custom',
// })
// const display5 = getCustomDisplay({
// 	align: 'center',
// 	disableCellClick: false,
// 	isNumeric: false,
// 	render: (ineedastringpls) =>
// 		'please provide a generic parameter for your expected data type if you use type custom',
// 	// ineedastringpls + 'wow such string, thank you',
// 	type: 'custom',
// })

/**
 * This is the column passed to `useKottiTable`’s `columns`
 */
export type MappedColumn<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	DATA = any,
> = {
	display: Display<DATA>
	getData: (row: ROW) => DATA
	id: COLUMN_IDS
	isSortable?: boolean
	label: string
}

export const createColumn = <
	ROW extends AnyRow,
	const COLUMN_ID extends string,
	DATA_TYPE,
>(options: {
	display: Display<DATA_TYPE>
	getData: (row: ROW) => DATA_TYPE
	id: COLUMN_ID
	isSortable?: boolean
	label: string
}): MappedColumn<ROW, COLUMN_ID, DATA_TYPE> => {
	return options
}

// usage example
// const columnsPassedToHook = [
// 	createColumn({
// 		display: display2,
// 		getData: (row) => row.b,
// 		id: 'my-column-1', // FIXME: potentially needing as const for this might be an issue, let's hope it isn't
// 		label: 'My Column',
// 	}),
// 	createColumn({
// 		display: display1,
// 		getData: (row) => 42,
// 		id: 'my-column-1', // FIXME: potentially needing as const for this might be an issue, let's hope it isn't
// 		label: 'My Column',
// 	}),
// 	createColumn({
// 		display: display4,
// 		getData: (row) => ({ c: row.b, d: 420 }),
// 		id: 'my-column-1', // FIXME: potentially needing as const for this might be an issue, let's hope it isn't
// 		label: 'My Column',
// 	}),
// ] //satisfies MappedColumn<{ a: boolean; b: string }, infer S, infer K>[]

export const createColumnContext = <ROW extends AnyRow>(): {
	createColumn: <COLUMN_ID extends string, DATA_TYPE>(options: {
		display: Display<DATA_TYPE>
		getData: (row: ROW) => DATA_TYPE
		id: COLUMN_ID
		isSortable?: boolean
		label: string
	}) => MappedColumn<ROW, COLUMN_ID, DATA_TYPE>
} => {
	return {
		createColumn: (options) => options,
	}
}

// const ctx = createColumnContext<{ a: boolean; b: string }>()

// const _columnsPassedToHook2 = [
// 	ctx.createColumn({
// 		display: display2,
// 		getData: (row) => row.b,
// 		id: 'my-column-1', // FIXME: potentially needing as const for this might be an issue, let's hope it isn't
// 		label: 'My Column',
// 	}),
// 	ctx.createColumn({
// 		display: display1,
// 		getData: (row) => 42,
// 		id: 'my-column-2', // FIXME: potentially needing as const for this might be an issue, let's hope it isn't
// 		label: 'My Column',
// 	}),
// 	ctx.createColumn({
// 		display: display4,
// 		getData: (row) => ({ c: row.b, d: 420 }),
// 		id: 'my-column-3', // FIXME: potentially needing as const for this might be an issue, let's hope it isn't
// 		label: 'My Column',
// 	}),
// ] satisfies MappedColumn<{ a: boolean; b: string }>[]
