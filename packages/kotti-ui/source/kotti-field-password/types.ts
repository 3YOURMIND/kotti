import { KottiField } from '../kotti-field/types'

export namespace KottiFieldPassword {
	export type Props = KottiField.Props<Value, string | null> & {
		autoComplete: 'current-password' | 'new-password'
	}

	export type Value = string | null
}
