import { KottiField } from '../kotti-field/types'

export namespace KtFieldRadioGroup {
	export type Entry = {
		label: string
		value: KtFieldRadioGroup.Value
		disabled: boolean
	}

	export interface Props
		extends KottiField.Props<KtFieldRadioGroup.Value | null> {
		name: string
		options: KtFieldRadioGroup.Entry[]
	}

	export type Value = string | number | boolean
}
