import dayjs from 'dayjs'
import { h, type VNode } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import type { KottiI18n } from '../../kotti-i18n/types'

import type { KottiTable } from './types'

// TODO: truncate text, ask how default behavior
// TODO (nice-to-have): attachments, needs design
// TODO (nice-to-have): image, array of urls as data
// TODO (nice-to-have): tuples with separator (e.g. "1234 x 23")

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

type ResolvedDisplayType<OPTION extends DisplayOption = DisplayOption> =
	KottiTable.Display<
		{
			boolean: boolean | null
			date: Date | null
			'date-time': Date | null
			integer: number | null
			numerical: number | null
			text: string | null
		}[OPTION['type']]
	>

export const getDisplay = <OPTION extends DisplayOption = DisplayOption>(
	param: OPTION,
): KottiTable.Display<
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
			} as ResolvedDisplayType<OPTION>
		}
		case 'date':
		case 'date-time': {
			return {
				align: 'left',
				disableCellClick: false,
				isNumeric: true,
				render: (value: Date | null) =>
					value === null ? null : dayjs(value).format(param.formatString),
			} as ResolvedDisplayType<OPTION>
		}
		case 'integer': {
			return {
				align: 'right',
				disableCellClick: false,
				isNumeric: true,
				render: (value: number | null) =>
					value === null ? null : String(Math.round(value)),
			} as ResolvedDisplayType<OPTION>
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
			} as ResolvedDisplayType<OPTION>
		}
		case 'text': {
			return {
				align: 'left',
				disableCellClick: false,
				isNumeric: false,
				render: (value: string | null) => value,
			} as ResolvedDisplayType<OPTION>
		}
	}
}

export const getCustomDisplay = <
	DATA = 'please provide a generic parameter for your expected data type if you use type custom',
>(
	param: DisplayOptionCustom<DATA>,
): KottiTable.Display<DATA> => {
	return param
}

export const createColumn = <
	ROW extends KottiTable.AnyRow,
	const COLUMN_ID extends string,
	DATA_TYPE,
>(options: {
	display: KottiTable.Display<DATA_TYPE>
	getData: (row: ROW) => DATA_TYPE
	id: COLUMN_ID
	isSortable?: boolean
	label: string
}): KottiTable.Column<ROW, COLUMN_ID, DATA_TYPE> => {
	return options
}
