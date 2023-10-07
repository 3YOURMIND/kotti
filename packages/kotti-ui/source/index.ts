// styles
import './kotti-style/index.scss'

// components
import { KtAccordion } from './kotti-accordion'
export * from './kotti-accordion'
import { KtActionbar } from './kotti-actionbar'
export * from './kotti-actionbar'
import { KtAvatar } from './kotti-avatar'
export * from './kotti-avatar'
import { KtAvatarGroup } from './kotti-avatar-group'
export * from './kotti-avatar-group'
import { KtBanner } from './kotti-banner'
export * from './kotti-banner'
import { KtBreadcrumb } from './kotti-breadcrumb'
export * from './kotti-breadcrumb'
import { KtButton } from './kotti-button'
export * from './kotti-button'
import { KtButtonGroup } from './kotti-button-group'
export * from './kotti-button-group'
import { KtCard } from './kotti-card'
export * from './kotti-card'
import { KtCol } from './kotti-col'
export * from './kotti-col'
import { KtComment, KtCommentInput } from './kotti-comment'
export * from './kotti-comment'
import { KtDrawer } from './kotti-drawer'
export * from './kotti-drawer'
import { KtField } from './kotti-field'
export * from './kotti-field'
import { KtFieldCurrency } from './kotti-field-currency'
export * from './kotti-field-currency'
import {
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
} from './kotti-field-date'
export * from './kotti-field-date'
import {
	KtFieldFileUpload,
	KtFieldFileUploadRemote,
} from './kotti-field-file-upload'
export * from './kotti-field-file-upload'
import { KtFieldInlineEdit } from './kotti-field-inline-edit'
export * from './kotti-field-inline-edit'
import { KtFieldNumber } from './kotti-field-number'
export * from './kotti-field-number'
import { KtFieldPassword } from './kotti-field-password'
export * from './kotti-field-password'
import { KtFieldRadioGroup } from './kotti-field-radio-group'
export * from './kotti-field-radio-group'
import {
	KtFieldMultiSelect,
	KtFieldMultiSelectRemote,
	KtFieldSingleSelect,
	KtFieldSingleSelectRemote,
} from './kotti-field-select'
export * from './kotti-field-select'
import { KtFieldText } from './kotti-field-text'
export * from './kotti-field-text'
import { KtFieldTextArea } from './kotti-field-text-area'
export * from './kotti-field-text-area'
import { KtFieldToggle, KtFieldToggleGroup } from './kotti-field-toggle'
export * from './kotti-field-toggle'
import { KtFilters } from './kotti-filters'
export * from './kotti-filters'
import { KtForm } from './kotti-form'
export * from './kotti-form'
import { KtFormControllerList } from './kotti-form-controller-list'
export * from './kotti-form-controller-list'
import { KtFormControllerObject } from './kotti-form-controller-object'
export * from './kotti-form-controller-object'
import { KtFormSubmit } from './kotti-form-submit'
export * from './kotti-form-submit'
import { KtHeading } from './kotti-heading'
export * from './kotti-heading'
import { KtI18nContext } from './kotti-i18n'
export * from './kotti-i18n'
import { KtLine } from './kotti-line'
export * from './kotti-line'
import { KtModal } from './kotti-modal'
export * from './kotti-modal'
import { KtNavbar } from './kotti-navbar'
export * from './kotti-navbar'
import { KtPagination } from './kotti-pagination'
export * from './kotti-pagination'
import { KtPopover } from './kotti-popover'
export * from './kotti-popover'
import { KtRow } from './kotti-row'
export * from './kotti-row'
import {
	KtTable,
	KtTableColumn,
	KtTableProvider,
	KtTableConsumer,
} from './kotti-table'
export * from './kotti-table'
import { KtTag } from './kotti-tag'
export * from './kotti-tag'
import { KtToaster } from './kotti-toaster'
export * from './kotti-toaster'
import { KtUserMenu } from './kotti-user-menu'
export * from './kotti-user-menu'
import { KtValueLabel } from './kotti-value-label'
export * from './kotti-value-label'

export * from './types'

export default {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	install(Vue: any) {
		for (const component of [
			KtAccordion,
			KtActionbar,
			KtAvatar,
			KtAvatarGroup,
			KtBanner,
			KtBreadcrumb,
			KtButton,
			KtButtonGroup,
			KtCard,
			KtCol,
			KtComment,
			KtCommentInput,
			KtDrawer,
			KtField,
			KtFieldCurrency,
			KtFieldDate,
			KtFieldDateRange,
			KtFieldDateTime,
			KtFieldDateTimeRange,
			KtFieldFileUpload,
			KtFieldFileUploadRemote,
			KtFieldInlineEdit,
			KtFieldMultiSelect,
			KtFieldMultiSelectRemote,
			KtFieldNumber,
			KtFieldPassword,
			KtFieldRadioGroup,
			KtFieldSingleSelect,
			KtFieldSingleSelectRemote,
			KtFieldText,
			KtFieldTextArea,
			KtFieldToggle,
			KtFieldToggleGroup,
			KtFilters,
			KtForm,
			KtFormControllerList,
			KtFormControllerObject,
			KtFormSubmit,
			KtHeading,
			KtI18nContext,
			KtLine,
			KtModal,
			KtNavbar,
			KtPagination,
			KtPopover,
			KtRow,
			KtTable,
			KtTableColumn,
			KtTableConsumer,
			KtTableProvider,
			KtTag,
			KtToaster,
			KtUserMenu,
			KtValueLabel,
		])
			Vue.use(component)

		const DEFAULT_YODIFY_DURATION = 3000

		Vue.prototype.$yodifyBuffer = []
		Vue.prototype.$yodify = function ({
			duration = DEFAULT_YODIFY_DURATION,
			text,
			type = 'success',
		}: {
			duration: number
			text: string
			type: 'success' | 'error'
		}) {
			const notification = { duration, text, type }

			// buffer notifications if vue isn't ready
			if (!this.$root) Vue.prototype.$yodifyBuffer.push(notification)
			else this.$root.$emit('vue-yodify', notification)
		}
	},
}
