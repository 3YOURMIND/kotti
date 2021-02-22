export { KottiCol as Col } from '../kotti-col/types'
export { KottiField as Field } from '../kotti-field/types'
export { KottiFieldNumber as FieldNumber } from '../kotti-field-number/types'
export { KottiFieldText as FieldText } from '../kotti-field-text/types'
export { KottiFieldTextArea as FieldTextArea } from '../kotti-field-text-area/types'
export {
	KottiFieldDate as FieldDate,
	KottiFieldDateRange as FieldDateRange,
	KottiFieldDateTime as FieldDateTime,
	KottiFieldDateTimeRange as FieldDateTimeRange,
} from '../kotti-field-date/types'
export { KottiFieldRadioGroup as FieldRadioGroup } from '../kotti-field-radio-group/types'
export {
	KottiFieldToggle as FieldToggle,
	KottiFieldToggleGroup as FieldToggleGroup,
} from '../kotti-field-toggle/types'
export { KottiTranslation as Translation } from '../kotti-translation/types'
export {
	KottiFieldSingleSelect as FieldSingleSelect,
	KottiFieldMultiSelect as FieldMultiSelect,
} from '../kotti-field-select/types'
export {
	KottiForm as Form,
	KottiFormSubmit as FormSubmit,
} from '../kotti-form/types'
export {
	KottiFormControllerObject as FormControllerObject,
	KottiFormControllerList as FormControllerList,
} from '../kotti-form/controllers/types'
export { KottiModal as Modal } from '../kotti-modal/types'
export { KottiRow as Row } from '../kotti-row/types'

export type Meta = {
	addedVersion: string | null
	deprecated: {
		alternatives: string[]
		reason: string
		version: string
	} | null
	slots: Record<
		string,
		{
			description: string | null
			scope: null | Record<
				string,
				{
					description: string | null
					type: 'function' | 'object' | 'integer'
				}
			>
		}
	>
	typeScript: { namespace: string } | null
}
