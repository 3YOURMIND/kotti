import { KottiField } from '../kotti-field/types'

export namespace KottiFieldText {
	export type Props = KottiField.Props<Value>

	export type Value = string | null
}
