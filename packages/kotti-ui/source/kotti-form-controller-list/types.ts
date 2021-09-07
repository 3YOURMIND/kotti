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
		formKey: Exclude<
			KottiField.Props<Array<Record<string, unknown>>, unknown>['formKey'],
			null
		>
		index: number
		values: Record<string, unknown>
	}
}
