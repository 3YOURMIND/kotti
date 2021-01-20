import { KottiField } from '../kotti-field/types'

export namespace KottiFieldToggle {
	export type Props = KottiField.Props<Value> & {
		type: 'checkbox' | 'switch'
	}

	export type Value = boolean | null
}

export namespace KottiFieldToggleGroup {
	export type Entry = {
		isDisabled?: boolean
		key: keyof Value
		label: string
		tooltip?: string
	}

	export type Props = KottiField.Props<Value> & {
		isInline: boolean
		options: Entry[]
		type: 'checkbox' | 'switch'
	}

	export type Value = Record<string, boolean | null>
}
