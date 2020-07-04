import { KottiField } from '../kotti-field/types'

export namespace KottiFieldNumber {
	export type Props = KottiField.Props<Value> & {
		hideMaximum: boolean
		maximum: number | null
		minimum: number | null
		placeholder: string | null
		step: number
	}

	export type Value = number | null
}
