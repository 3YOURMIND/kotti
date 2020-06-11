import { KottiField } from '../kotti-field/types'

export namespace KottiFieldTextArea {
	export type Props = KottiField.Props<string | null> &
		Pick<HTMLTextAreaElement, 'rows'>
}
