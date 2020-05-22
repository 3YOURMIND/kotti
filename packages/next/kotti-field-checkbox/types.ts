import { KottiField } from '../kotti-field/types'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface KtFieldCheckboxProps
	extends KottiField.Props<boolean | null> {}

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
