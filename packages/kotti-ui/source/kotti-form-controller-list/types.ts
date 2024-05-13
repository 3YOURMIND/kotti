import type { KottiField } from '../kotti-field/types'
import type { KottiForm } from '../kotti-form/types'

export module KottiFormControllerList {
	export type Props = {
		formKey: string
	}
}
export module KottiFormControllerListItem {
	export type Props = {
		context: KottiForm.Context
		formKey: Exclude<KottiField.PropsInternal['formKey'], null>
		index: number
		values: Record<KottiFormControllerListItem.Props['formKey'], unknown>
	}
}
