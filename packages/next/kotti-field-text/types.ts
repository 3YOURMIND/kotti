import { KottiField } from '../kotti-field/types'

export namespace KottiFieldText {
	export type Props = KottiField.Props<Value> & {
		placeholder: string | null
	}

	export type Value = string | null
}
