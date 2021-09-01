import { KottiField } from '../kotti-field/types'

export namespace KottiFieldRadioGroup {
	export type Entry = {
		isDisabled?: boolean
		label: string
		tooltip?: string
		value: Value
	}

	export type Props = KottiField.Props<Value, never> & {
		isInline: boolean
		options: Entry[]
	}

	export type Value = string | number | boolean | null
}
