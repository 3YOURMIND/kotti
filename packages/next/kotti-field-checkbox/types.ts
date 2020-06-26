import { KottiField } from '../kotti-field/types'

export namespace KottiFieldCheckbox {
	export type Props = KottiField.Props<Value>

	export type Value = boolean | null
}

export namespace KottiFieldCheckboxGroup {
	export type Entry = {
		key: keyof Value
		label: string
	}

	export type Props = KottiField.Props<Value> & {
		options: Entry[]
	}

	export type Value = Record<string, boolean | null>
}
