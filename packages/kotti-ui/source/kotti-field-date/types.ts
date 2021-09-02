import { KottiField } from '../kotti-field/types'

export namespace Shared {
	export interface Props<VALUE, PLACEHOLDER_TYPE = string | null>
		extends KottiField.Props<VALUE, PLACEHOLDER_TYPE> {
		maximumDate: string | null
		minimumDate: string | null
		shortcuts: ShortcutEntry<VALUE>[]
	}

	export type ShortcutEntry<VALUE> = {
		keepOpen?: boolean
		label: string
		value: VALUE
	}

	/**
	 * ISO8601
	 */
	export type Value = string | null
}

export namespace KottiFieldDate {
	export type Props = Shared.Props<Value>

	export type Value = Shared.Value
}

export namespace KottiFieldDateRange {
	export type Props = Shared.Props<Value, [string | null, string | null]>

	export type Value = [Shared.Value, Shared.Value]
}

export namespace KottiFieldDateTime {
	export type Props = Shared.Props<Value>

	export type Value = Shared.Value
}

export namespace KottiFieldDateTimeRange {
	export type Props = Shared.Props<Value, [string | null, string | null]>

	export type Value = [Shared.Value, Shared.Value]
}
