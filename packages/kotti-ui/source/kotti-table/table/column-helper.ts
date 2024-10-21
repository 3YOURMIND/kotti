import dayjs from 'dayjs'
import { h } from 'vue'

import { Yoco } from '@3yourmind/yoco'

import { ISO8601, ISO8601_SECONDS } from '../../constants'

import type { KottiTable } from './types'

// FIXME: some other often repeated patterns that can potentially be standardized here:
//  - truncate text, needs clarification on default behavior
//  - (nice-to-have) attachments, needs design
//  - (nice-to-have) image, array of urls as data
//  - (nice-to-have) tuples with separator (e.g. "1234 x 23")
//
const numberFormatter = Intl.NumberFormat('us-US', { style: 'decimal' })

type DisplayOptionBoolean = {
	mode: 'icon' | 'text'
	type: 'boolean'
}

type DisplayOptionDate = {
	formatString?: string
	type: 'date'
}
type DisplayOptionDateTime = {
	formatString?: string
	type: 'date-time'
}
type DisplayOptionInteger = { type: 'integer' }
type DisplayOptionNumerical = {
	maximumDecimalPlaces?: number
	minimumDecimalPlaces?: number
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
		case 'date': {
			return {
				align: 'left',
				disableCellClick: false,
				isNumeric: true,
				render: (value: Date | null) => {
					const formatString = param.formatString ?? ISO8601
					return value === null ? null : dayjs(value).format(formatString)
				},
			} as ResolvedDisplayType<OPTION>
		}
		case 'date-time': {
			return {
				align: 'left',
				disableCellClick: false,
				isNumeric: true,
				render: (value: Date | null) => {
					const formatString = param.formatString ?? ISO8601_SECONDS
					return value === null ? null : dayjs(value).format(formatString)
				},
			} as ResolvedDisplayType<OPTION>
		}
		case 'integer': {
			return {
				align: 'right',
				disableCellClick: false,
				isNumeric: true,
				render: (value: number | null) =>
					value === null
						? null
						: numberFormatter
								.format(Math.round(value))
								.replaceAll(',', '\u2009'),
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
						: Intl.NumberFormat('us-US', {
								maximumFractionDigits: param.maximumDecimalPlaces ?? 2,
								minimumFractionDigits: param.minimumDecimalPlaces ?? 2,
								style: 'decimal',
							})
								.format(value)
								.replaceAll(',', ' ') //'\u2009')
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
	param: KottiTable.Display<DATA>,
): KottiTable.Display<DATA> => {
	return param
}

export const createColumnContext = <ROW extends KottiTable.AnyRow>(): {
	createColumn: <COLUMN_ID extends string, DATA_TYPE>(options: {
		display: KottiTable.Display<DATA_TYPE>
		getData: (row: ROW) => DATA_TYPE
		id: COLUMN_ID
		isSortable?: boolean
		label: string
		maxWidth?: string
		minWidth?: string
		width?: string
	}) => KottiTable.Column<ROW, COLUMN_ID, DATA_TYPE>
} => {
	return {
		createColumn: (options) => options,
	}
}
