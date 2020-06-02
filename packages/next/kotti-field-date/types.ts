import { KottiField } from '../kotti-field/types'

export namespace KtFieldDateShared {
	export type ShortcutEntry = {
		label: string
		value: string | null
	}

	export type Props = {
		maximumDate: string | null
		minimumDate: string | null
		shortcuts: KtFieldDateShared.ShortcutEntry[]
	}

	/**
	 * ISO8601
	 */
	export type Value = string | null

	export type RangeValue = [KtFieldDateShared.Value, KtFieldDateShared.Value]
}

export namespace KtFieldDate {
	export type Props = KottiField.Props<Value> & KtFieldDateShared.Props

	export type Value = KtFieldDateShared.Value
}

export namespace KtFieldDateRange {
	export type Props = KottiField.Props<Value> & KtFieldDateShared.Props

	export type Value = KtFieldDateShared.RangeValue
}

export namespace KtFieldDateTime {
	export type Props = KottiField.Props<Value> & KtFieldDateShared.Props

	export type Value = KtFieldDateShared.Value
}

export namespace KtFieldDateTimeRange {
	export type Props = KottiField.Props<Value> & KtFieldDateShared.Props

	export type Value = KtFieldDateShared.RangeValue
}
