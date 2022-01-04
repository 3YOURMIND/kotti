import { KottiField } from '../kotti-field/types'
import { KottiForm } from '../kotti-form/types'

export namespace KottiFormControllerList {
	export type Props = {
		formKey: string
	}
}
export namespace KottiFormControllerListItem {
	export type Props = {
		context: KottiForm.Context
		formKey: Exclude<KottiField.PropsInternal['formKey'], null>
		index: number
		values: Record<KottiFormControllerListItem.Props['formKey'], unknown>
	}
}
