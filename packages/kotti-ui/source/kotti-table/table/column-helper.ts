import type { VNode } from 'vue'

import type { KottiI18n } from '../../kotti-i18n/types'

type DisplayOptionBoolean = { type: 'boolean' }
type DisplayOptionCustom<DATA> = {
	align: 'center' | 'left' | 'right'
	formatter: (
		data: DATA,
	) => DATA extends 'please provide a generic parameter for your expected data type if you use type custom'
		? DATA
		: string | null
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
type DisplayOption<DATA> =
	| DisplayOptionBoolean
	| DisplayOptionCustom<DATA>
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

export const getDisplay = <
	DATA = 'please provide a generic parameter for your expected data type if you use type custom',
	OPTION extends DisplayOption<DATA> = DisplayOption<DATA>,
>(
	param: OPTION,
): Display<
	DATA extends 'please provide a generic parameter for your expected data type if you use type custom'
		? {
				boolean: boolean | null
				custom: never
				date: Date | null
				'date-time': Date | null
				integer: number | null
				numerical: number | null
				text: string | null
			}[OPTION['type']]
		: DATA
> => {
	switch (param.type) {
		case 'boolean': {
			throw new Error('Not implemented yet: "boolean" case')
		}
		case 'custom': {
			throw new Error('Not implemented yet: "custom" case')
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

// getDisplay()
// getCustomDisplay()

// eslint-disable-next-line sonarjs/no-use-of-empty-return-value -- sonar pls wtf
const display1 = getDisplay({ type: 'numerical' })
// eslint-disable-next-line sonarjs/no-use-of-empty-return-value -- sonar pls wtf
const display2 = getDisplay({ type: 'text' })
// eslint-disable-next-line sonarjs/no-use-of-empty-return-value -- sonar pls wtf
const display3 = getDisplay({ type: 'integer' })
// eslint-disable-next-line sonarjs/no-use-of-empty-return-value -- sonar pls wtf
const display4 = getDisplay<string>({
	align: 'center',
	formatter: (ineedastringpls) => 'wow such string, thank you',
	isNumeric: false,
	type: 'custom',
})
// eslint-disable-next-line sonarjs/no-use-of-empty-return-value -- sonar pls wtf
const display5 = getDisplay({
	align: 'center',
	formatter: (ineedastringpls) =>
		'please provide a generic parameter for your expected data type if you use type custom',
	// ineedastringpls + 'wow such string, thank you',
	isNumeric: false,
	type: 'custom',
})

/**
 * This is the column passed to `useKottiTable`’s `columns`
 */
type MappedColumn = {}

export const createColumn = <COLUMN_ID extends string, DATA_TYPE>(options: {
	display: Display<DATA_TYPE>
	getData: () => DATA_TYPE
	id: COLUMN_ID
	isSortable?: boolean
	label: string
}): MappedColumn => {
	throw new Error('Not implemented yet')
}
