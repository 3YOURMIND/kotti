export { KottiAvatar as Avatar } from '../kotti-avatar/types'
export { KottiAvatarGroup as AvatarGroup } from '../kotti-avatar-group/types'
export { KottiBanner as Banner } from '../kotti-banner/types'
export { KottiBreadcrumb as Breadcrumb } from '../kotti-breadcrumb/types'
export { KottiButton as Button } from '../kotti-button/types'
export { KottiCol as Col } from '../kotti-col/types'
export { KottiField as Field } from '../kotti-field/types'
export { KottiFieldNumber as FieldNumber } from '../kotti-field-number/types'
export { KottiFieldPassword as FieldPassword } from '../kotti-field-password/types'
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
export { KottiFilters as Filters } from '../kotti-filters/types'
export { KottiForm as Form } from '../kotti-form/types'
export { KottiFormControllerList as FormControllerList } from '../kotti-form-controller-list/types'
export { KottiFormControllerObject as FormControllerObject } from '../kotti-form-controller-object/types'
export { KottiFormSubmit as FormSubmit } from '../kotti-form-submit/types'
export { KottiHeading as Heading } from '../kotti-heading/types'
export { KottiLine as Line } from '../kotti-line/types'
export { KottiModal as Modal } from '../kotti-modal/types'
export { KottiNavbar as Navbar } from '../kotti-navbar/types'
export { KottiRow as Row } from '../kotti-row/types'

export enum MetaDesignType {
	FIGMA = 'FIGMA',
}

export type Meta = {
	addedVersion: string | null
	deprecated: {
		alternatives: string[]
		reason: string
		version: string
	} | null
	designs:
		| Array<{
				title: string
				type: MetaDesignType
				url: string
		  }>
		| {
				type: MetaDesignType
				url: string
		  }
		| null
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
