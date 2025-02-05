/**
 * _WARNING_ avoid using `export type` as it does not support enums
 * (which most kotti types files use)
 *
 * vite build errors if a file doesn't have enums so you'd use it
 * but does not warn about the opposite scenario
 */
import type { ZodSchema } from 'zod'

export { KottiAccordion as Accordion } from '../kotti-accordion/types'
export { KottiActionbar as Actionbar } from '../kotti-actionbar/types'
export { KottiAvatarGroup as AvatarGroup } from '../kotti-avatar-group/types'
export { KottiAvatar as Avatar } from '../kotti-avatar/types'
export { KottiBanner as Banner } from '../kotti-banner/types'
export { KottiBreadcrumb as Breadcrumb } from '../kotti-breadcrumb/types'
export type { KottiButtonGroup as ButtonGroup } from '../kotti-button-group/types'
export { KottiButton as Button } from '../kotti-button/types'
export { KottiSplitButton as SplitButton } from '../kotti-button/types'
export { KottiCard as Card } from '../kotti-card/types'
export type { KottiCol as Col } from '../kotti-col/types'
export {
	KottiComment as Comment,
	KottiCommentInput as CommentInput,
} from '../kotti-comment/types'
export { KottiDrawer as Drawer } from '../kotti-drawer/types'
export { KottiFieldCurrency as FieldCurrency } from '../kotti-field-currency/types'
export {
	KottiFieldDate as FieldDate,
	KottiFieldDateRange as FieldDateRange,
	KottiFieldDateTime as FieldDateTime,
	KottiFieldDateTimeRange as FieldDateTimeRange,
} from '../kotti-field-date/types'
export {
	KottiFieldFileUpload as FieldFileUpload,
	KottiFieldFileUploadRemote as FieldFileUploadRemote,
} from '../kotti-field-file-upload/types'
export { KottiFieldInlineEdit as FieldInlineEdit } from '../kotti-field-inline-edit/types'
export { KottiFieldNumber as FieldNumber } from '../kotti-field-number/types'
export { KottiFieldPassword as FieldPassword } from '../kotti-field-password/types'
export { KottiFieldRadioGroup as FieldRadioGroup } from '../kotti-field-radio-group/types'
export {
	KottiFieldMultiSelect as FieldMultiSelect,
	KottiFieldMultiSelectRemote as FieldMultiSelectRemote,
	KottiFieldSingleSelect as FieldSingleSelect,
	KottiFieldSingleSelectRemote as FieldSingleSelectRemote,
} from '../kotti-field-select/types'
export { KottiFieldTextArea as FieldTextArea } from '../kotti-field-text-area/types'
export { KottiFieldText as FieldText } from '../kotti-field-text/types'
export {
	KottiFieldToggle as FieldToggle,
	KottiFieldToggleGroup as FieldToggleGroup,
} from '../kotti-field-toggle/types'
export { KottiField as Field } from '../kotti-field/types'
export { KottiFileUpload as FileUpload } from '../kotti-file-upload/types'
export { KottiFilters as Filters } from '../kotti-filters/types'
export type { KottiFormControllerList as FormControllerList } from '../kotti-form-controller-list/types'
export type { KottiFormControllerObject as FormControllerObject } from '../kotti-form-controller-object/types'
export type { KottiFormSubmit as FormSubmit } from '../kotti-form-submit/types'
export type { KottiForm as Form } from '../kotti-form/types'
export { KottiHeading as Heading } from '../kotti-heading/types'
export type { KottiI18n as I18n } from '../kotti-i18n/types'
export { KottiLine as Line } from '../kotti-line/types'
export { KottiModal as Modal } from '../kotti-modal/types'
export { KottiNavbar as Navbar } from '../kotti-navbar/types'
export { KottiPagination as Pagination } from '../kotti-pagination/types'
export { KottiPopover as Popover } from '../kotti-popover/types'
export { KottiRow as Row } from '../kotti-row/types'
export { KottiTableLegacy as TableLegacy } from '../kotti-table-legacy/types'
export { KottiStandardTable as StandardTable } from '../kotti-table/standard-table/types'
export { KottiTable as Table } from '../kotti-table/table/types'
export { KottiTag as Tag } from '../kotti-tag/types'
export {
	KottiToast as Toast,
	KottiToaster as Toaster,
} from '../kotti-toaster/types'
export { KottiUserMenu as UserMenu } from '../kotti-user-menu/types'
export { KottiValueLabel as ValueLabel } from '../kotti-value-label/types'
export * from './decimal-separator'
export * from './typed-emit'

export enum MetaDesignType {
	FIGMA = 'FIGMA',
}

export type Meta = {
	addedVersion: string | null
	componentFolder?: string
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
			scope: Record<
				string,
				{
					description: string | null
					type: 'float' | 'function' | 'integer' | 'object' | 'string'
				}
			> | null
		}
	>
	typeScript: {
		namespace: string
		schema: ZodSchema<unknown> | null
	} | null
}
