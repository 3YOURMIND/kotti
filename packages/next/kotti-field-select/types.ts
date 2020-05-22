import { KottiField } from '../kotti-field/types'

export namespace KtFieldSingleSelect {
	export type Entry = {
		label: string
		value: KtFieldSingleSelect.Value
		disabled: boolean
	}

	export interface Props extends KottiField.Props<KtFieldSingleSelect.Value> {
		options: KtFieldSingleSelect.Entry[]
	}

	export type Value = string | number | boolean | null
}
