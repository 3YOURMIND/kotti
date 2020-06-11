import { KottiField } from '../kotti-field/types'

export namespace Shared {
	export interface Props<VALUE> extends KottiField.Props<VALUE> {
		maximumDate: string | null
		minimumDate: string | null
		shortcuts: ShortcutEntry<VALUE>[]
	}

	export type ShortcutEntry<VALUE> = {
		keepOpen?: boolean
		label: string
		value: VALUE
	}

	export type Translations = {
		datepicker: {
			cancel: string
			clear: string
			confirm: string
			endDate: string
			endTime: string
			month1: string
			month10: string
			month11: string
			month12: string
			month2: string
			month3: string
			month4: string
			month5: string
			month6: string
			month7: string
			month8: string
			month9: string
			months: {
				jan: string
				feb: string
				mar: string
				apr: string
				may: string
				jun: string
				jul: string
				aug: string
				sep: string
				oct: string
				nov: string
				dec: string
			}
			nextMonth: string
			nextYear: string
			now: string
			prevMonth: string
			prevYear: string
			selectDate: string
			selectTime: string
			startDate: string
			startTime: string
			today: string
			week: string
			weeks: {
				sun: string
				mon: string
				tue: string
				wed: string
				thu: string
				fri: string
				sat: string
			}
			year: string
		}
	}

	/**
	 * ISO8601
	 */
	export type Value = string | null
}

export namespace KottiFieldDate {
	export type Props = Shared.Props<Value>

	export type Translations = Shared.Translations

	export type Value = Shared.Value
}

export namespace KottiFieldDateRange {
	export type Props = Shared.Props<Value>

	export type Translations = Shared.Translations

	export type Value = [Shared.Value, Shared.Value]
}

export namespace KottiFieldDateTime {
	export type Props = Shared.Props<Value>

	export type Translations = Shared.Translations

	export type Value = Shared.Value
}

export namespace KottiFieldDateTimeRange {
	export type Props = Shared.Props<Value>

	export type Translations = Shared.Translations

	export type Value = [Shared.Value, Shared.Value]
}
