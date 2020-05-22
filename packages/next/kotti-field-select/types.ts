import { KottiField } from '../kotti-field/types'

export namespace KtFieldSelect {
	export namespace Multiple {
		export type Props = KottiField.Props<KtFieldSelect.Multiple.Value> &
			Shared.Props

		export type Value = Shared.Entry['value'][]
	}

	export namespace Shared {
		export type Entry = {
			disabled: boolean
			label: string
			value: string | number | boolean | null
		}

		export type Props = {
			options: Shared.Entry[]
		}
	}

	export namespace Single {
		export type Props = KottiField.Props<KtFieldSelect.Single.Value> &
			Shared.Props

		export type Value = Shared.Entry['value']
	}
}
