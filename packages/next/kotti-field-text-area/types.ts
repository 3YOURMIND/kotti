import { KottiField } from '../kotti-field/types'

export type KtFieldTextAreaProps = KottiField.Props<string | null> &
	Pick<HTMLTextAreaElement, 'rows'>
