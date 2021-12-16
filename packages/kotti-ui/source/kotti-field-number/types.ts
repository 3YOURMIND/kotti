import { KottiField } from '../kotti-field/types'

export namespace KottiFieldNumber {
	export type Props = KottiField.Props<Value, string | null> & {
		decimalPlaces: number
		hideChangeButtons: boolean
		hideMaximum: boolean
		maximum: number | null
		minimum: number | null
		step: number
	}

	export type Value = number | null
}
