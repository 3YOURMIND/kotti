import { KottiField } from '../kotti-field/types'

export namespace KottiFieldMultiSelect {
	export type Props = KottiField.Props<Value, string | null> &
		Shared.Props & {
			collapseTagsAfter: number
			maximumSelectable: number
		}

	export type Translations = Shared.Translations

	export type Value = Shared.Entry['value'][]
}

export namespace Shared {
	export type Entry<
		V extends string | number | boolean | symbol | null =
			| string
			| number
			| boolean
			| symbol
			| null,
	> = {
		isDisabled?: boolean
		label: string
		value: V
	}

	export type Props = {
		actions: Shared.Action[]
		options: Shared.Entry[]
	}

	export type Action = {
		label: string
		onClick: () => void
	}

	export type Translations = {
		loadingText: string
		noDataText: string
		noMatchText: string
		placeholder: string
	}
}

export namespace KottiFieldSingleSelect {
	export type Props = KottiField.Props<Value, string | null> & Shared.Props

	export type Translations = Shared.Translations

	export type Value = Shared.Entry['value']
}

export namespace KottiFieldSingleSelectRemote {
	export type Props = KottiField.Props<Value, string | null> &
		Shared.Props & {
			isLoadingOptions: boolean
			query: string | null
		}

	export type Translations = Shared.Translations

	export type Value = Shared.Entry['value']

	export namespace Events {
		export type UpdateQuery = KottiFieldSingleSelectRemote.Props['query']
	}
}
