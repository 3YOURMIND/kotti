import { KottiField } from '../kotti-field/types'

export namespace KottiFieldEmail {
	export type Props = KottiField.Props<Value, string | null>

	export type Value = string | null
}
