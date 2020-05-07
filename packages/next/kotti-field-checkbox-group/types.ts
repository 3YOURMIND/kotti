import { KottiField } from '../kotti-field/types'

export namespace KtFieldCheckboxGroup {
	export type Entry = {
		key: keyof KtFieldCheckboxGroup.Value
		label: string
	}

	export interface Props extends KottiField.Props<KtFieldCheckboxGroup.Value> {
		options: KtFieldCheckboxGroup.Entry[]
	}

	export type Value = Record<string, boolean | null>
}
