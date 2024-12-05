import type { VNode } from 'vue'

import type { KottiI18n } from '../../kotti-i18n/types'

import type { AnyRow } from './types'

type DisplayOptionBoolean = { type: 'boolean' }
type DisplayOptionCustom<DATA> = {
	align: 'center' | 'left' | 'right'
	formatter: (data: DATA) => string | null
	// formatter: (
	// 	data: DATA,
	// ) => DATA extends 'please provide a generic parameter for your expected data type if you use type custom'
	// 	? DATA
	// 	: string | null
	isNumeric: boolean
	type: 'custom'
}
type DisplayOptionDate = { type: 'date' }
type DisplayOptionDateTime = { type: 'date-time' }
type DisplayOptionInteger = { type: 'integer' }
type DisplayOptionNumerical = {
	decimalPlaces?: number
	type: 'numerical'
}
type DisplayOptionText = { type: 'text' }
type DisplayOption =
	| DisplayOptionBoolean
	// | DisplayOptionCustom<DATA>
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
		context: { numberFormat: KottiI18n.NumberFormat },
	) => VNode | string | null
}

// OPTION['type'] extends 'custom' // { formatter: (arg: infer DATA) => unknown; type: 'custom' }
// 	? 'Display<DATA>'
// 	: Display<DisplayResultMap[OPTION['type']]>
//

export const getDisplay = <OPTION extends DisplayOption = DisplayOption>(
	param: OPTION,
): Display<
	{
		boolean: boolean | null
		date: Date | null
		'date-time': Date | null
		integer: number | null
		numerical: number | null
		text: string | null
	}[OPTION['type']]
> => {
	switch (param.type) {
		case 'boolean': {
			throw new Error('Not implemented yet: "boolean" case')
		}
		case 'date': {
			throw new Error('Not implemented yet: "date" case')
		}
		case 'date-time': {
			throw new Error('Not implemented yet: "date-time" case')
		}
		case 'integer': {
			throw new Error('Not implemented yet: "integer" case')
		}
		case 'numerical': {
			throw new Error('Not implemented yet: "numerical" case')
		}
		case 'text': {
			throw new Error('Not implemented yet: "text" case')
		}
	}
}

export const getCustomDisplay = <
	DATA = 'please provide a generic parameter for your expected data type if you use type custom',
>(
	param: DisplayOptionCustom<DATA>,
): Display<DATA> => {
	throw new Error('Not implemented yet: "custom" case')
}

const x = getCustomDisplay({
	align: 'center',
	formatter: (ineedastringpls) => 'wow',
	// ineedastringpls + 'wow such string, thank you',
	isNumeric: false,
	type: 'custom',
})

// getDisplay()
// getCustomDisplay()

const display1 = getDisplay({ type: 'numerical' })
const display2 = getDisplay({ type: 'text' })
const display3 = getDisplay({ type: 'integer' })
const display4 = getCustomDisplay({
	align: 'center',
	formatter: (ineedastringpls) => 'wow such string, thank you',
	isNumeric: false,
	type: 'custom',
})
const display5 = getCustomDisplay({
	align: 'center',
	formatter: (ineedastringpls) =>
		'please provide a generic parameter for your expected data type if you use type custom',
	// ineedastringpls + 'wow such string, thank you',
	isNumeric: false,
	type: 'custom',
})

type DataDisplay<ROW extends AnyRow, DATA = unknown> =
	| {
			display: {
				align: 'center' | 'left' | 'right'
				disableCellClick: boolean
				formatter: (args: DATA) => VNode | string | null
				isNumeric: boolean
				type: 'custom'
			}
			getData: (row: ROW) => DATA
	  }
	| {
			display: { type: 'boolean' }
			getData: (row: ROW) => boolean | null
	  }
	| {
			display: { type: 'date' } | { type: 'date-time' } | { type: 'text' }
			getData: (row: ROW) => string | null
	  }
	| {
			display:
				| { decimalPlaces: number; type: 'numerical' }
				| { type: 'integer' }
			getData: (row: ROW) => number | null
	  }

/**
 * This is the column passed to `useKottiTable`’s `columns`
 */
type MappedColumn<
	ROW extends AnyRow,
	COLUMN_IDS extends string = string,
> = DataDisplay<ROW> & {
	id: COLUMN_IDS
	isSortable?: boolean
	label: string
}

export const createColumn = <
	ROW extends AnyRow,
	COLUMN_ID extends string,
	DATA_TYPE,
>(options: {
	display: Display<DATA_TYPE>
	getData: () => DATA_TYPE
	id: COLUMN_ID
	isSortable?: boolean
	label: string
}): MappedColumn<ROW, COLUMN_ID> => {
	throw new Error('Not implemented yet')
}
