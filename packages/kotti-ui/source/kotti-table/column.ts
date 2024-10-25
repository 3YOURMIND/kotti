import type { KottiI18n } from '../kotti-i18n/types'

import type { KottiTable } from './types'

export type ResolvedColumnDisplay<OPTIONS extends Record<string, unknown>> = {
	align: 'center' | 'left' | 'right'
	formatter:
		| ((
				value: unknown,
				context: {
					numberFormat: KottiI18n.NumberFormat
					options: OPTIONS
				},
		  ) => string | null)
		| null
	isNumeric: boolean
}

const boolean: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	// TODO: ask how boolean should be displayed
	formatter: (value: unknown) => (value ? 'TRUE' : 'FALSE'),
	isNumeric: true,
}

const date: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => value as string,
	isNumeric: true,
}

const datetime: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => (value as string).replace('T', ' '),
	isNumeric: true,
}

const integer: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'right',
	formatter: (value: unknown) =>
		value === null ? null : String(Math.round(value as number)),
	isNumeric: true,
}

const numerical: ResolvedColumnDisplay<{ decimalPlaces?: number }> = {
	align: 'right',
	formatter: (value, context) =>
		value === null
			? null
			: (value as number)
					.toFixed(context.options.decimalPlaces ?? 2)
					.replace('.', context.numberFormat.decimalSeparator),
	isNumeric: true,
}

const text: ResolvedColumnDisplay<Record<string, never>> = {
	align: 'left',
	formatter: (value: unknown) => value as string,
	isNumeric: false,
}

const columnDisplayMap = {
	boolean,
	date,
	datetime,
	integer,
	numerical,
	text,
}

export const resolveColumnDisplay = <OPTIONS extends Record<string, unknown>>(
	display: KottiTable.ColumnDisplay,
): ResolvedColumnDisplay<OPTIONS> => {
	if (display.type === 'custom') return display

	return columnDisplayMap[display.type] as ResolvedColumnDisplay<OPTIONS>
}
