import { KottiField } from '../../kotti-field/types'
import { KottiForm } from '../types'

export namespace KottiFormControllerList {
	export type Props = {
		formKey: string
	}
}

export namespace KottiFormControllerObject {
	export type Props = {
		formKey: string
	}
}

export namespace KottiFormControllerListItem {
	export type Props = {
		context: KottiForm.Context
		formKey: Exclude<KottiField.Props<object[]>['formKey'], null>
		index: number
		values: Record<string, unknown>
	}
}
