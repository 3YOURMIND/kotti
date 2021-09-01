import { KottiField } from '../kotti-field/types'

export namespace KottiFieldTextArea {
	export type Props = KottiField.Props<Value> & {
		rows: HTMLTextAreaElement['rows']
	}

	export type Value = string | null
}
