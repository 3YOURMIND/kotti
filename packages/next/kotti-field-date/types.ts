import { KottiField } from '../kotti-field/types'

export namespace KtFieldDateShared {
	export type ShortcutEntry<VALUE> = {
		keepOpen?: boolean
		label: string
		value: VALUE
	}

	export interface Props<VALUE> extends KottiField.Props<VALUE> {
		maximumDate: string | null
		minimumDate: string | null
		shortcuts: KtFieldDateShared.ShortcutEntry<VALUE>[]
	}

	/**
	 * ISO8601
	 */
	export type Value = string | null

	export type RangeValue = [KtFieldDateShared.Value, KtFieldDateShared.Value]
}

export namespace KtFieldDate {
	export type Props = KtFieldDateShared.Props<Value>

	export type Value = KtFieldDateShared.Value
}

export namespace KtFieldDateRange {
	export type Props = KtFieldDateShared.Props<Value>

	export type Value = KtFieldDateShared.RangeValue
}

export namespace KtFieldDateTime {
	export type Props = KtFieldDateShared.Props<Value>

	export type Value = KtFieldDateShared.Value
}

export namespace KtFieldDateTimeRange {
	export type Props = KtFieldDateShared.Props<Value>

	export type Value = KtFieldDateShared.RangeValue
}
