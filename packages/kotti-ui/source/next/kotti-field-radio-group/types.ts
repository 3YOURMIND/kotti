import { KottiField } from '../kotti-field/types'

export namespace KottiFieldRadioGroup {
	export type Entry = {
		label: string
		value: Value
		disabled: boolean
	}

	export type Props = KottiField.Props<Value> & {
		isInline: boolean
		options: Entry[]
	}

	export type Value = string | number | boolean | null
}
