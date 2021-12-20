import { KottiField } from '../kotti-field/types'

export namespace KottiFieldTextArea {
	export type Props = KottiField.Props & {
		rows: HTMLTextAreaElement['rows']
	}

	export type Value = string | null
}
