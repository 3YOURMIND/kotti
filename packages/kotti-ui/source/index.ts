// styles
import 'normalize.css'
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
import { KtCheckbox } from './kotti-checkbox'
export * from './kotti-checkbox'
import { KtCol } from './kotti-col'
export * from './kotti-col'
import { KtComment, KtCommentInput } from './kotti-comment'
export * from './kotti-comment'
import { KtDatePicker, KtDateInput } from './kotti-datepicker'
export * from './kotti-datepicker'
import { KtDrawer } from './kotti-drawer'
export * from './kotti-drawer'
import { KtDropdown } from './kotti-dropdown'
export * from './kotti-dropdown'
import { KtDropdownButton } from './kotti-dropdown-button'
export * from './kotti-dropdown-button'
import { KtDropdownMenu } from './kotti-dropdown-menu'
export * from './kotti-dropdown-menu'
import { KtHeading } from './kotti-heading'
export * from './kotti-heading'
import { KtInlineEdit } from './kotti-inline-edit'
export * from './kotti-inline-edit'
import { KtInput } from './kotti-input'
export * from './kotti-input'
import { KtInputNumber } from './kotti-input-number'
export * from './kotti-input-number'
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
import { KtRadio } from './kotti-radio'
export * from './kotti-radio'
import { KtRadioGroup } from './kotti-radio-group'
export * from './kotti-radio-group'
import { KtRow } from './kotti-row'
export * from './kotti-row'
import { KtSingleSelect } from './kotti-single-select'
export * from './kotti-single-select'
import { KtStep } from './kotti-step'
export * from './kotti-step'
import { KtSteps } from './kotti-steps'
export * from './kotti-steps'
import { KtSwitch } from './kotti-switch'
export * from './kotti-switch'
import {
	KtTable,
	KtTableColumn,
	KtTableProvider,
	KtTableConsumer,
	KtTableColumnsStateMixin,
} from './kotti-table'
export * from './kotti-table'
import { KtTheme } from './kotti-theme'
export * from './kotti-theme'
import { KtToaster } from './kotti-toaster'
export * from './kotti-toaster'
import { KtUserMenu } from './kotti-user-menu'
export * from './kotti-user-menu'
import { KtField } from './next/kotti-field'
export * from './next/kotti-field'
import {
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
} from './next/kotti-field-date'
export * from './next/kotti-field-date'
import { KtFieldNumber } from './next/kotti-field-number'
export * from './next/kotti-field-number'
import { KtFieldRadioGroup } from './next/kotti-field-radio-group'
export * from './next/kotti-field-radio-group'
import {
	KtFieldSingleSelect,
	KtFieldMultiSelect,
} from './next/kotti-field-select'
export * from './next/kotti-field-select'
import { KtFieldText } from './next/kotti-field-text'
export * from './next/kotti-field-text'
import { KtFieldTextArea } from './next/kotti-field-text-area'
export * from './next/kotti-field-text-area'
import { KtFieldToggle, KtFieldToggleGroup } from './next/kotti-field-toggle'
export * from './next/kotti-field-toggle'
import {
	KtForm,
	KtFormControllerList,
	KtFormControllerObject,
	KtFormSubmit,
} from './next/kotti-form'
export * from './next/kotti-form'
import { KtTranslationContext } from './next/kotti-translation'

export * from './next/kotti-translation'
export * from './types'

const components = {
	KtAccordion,
	KtActionbar,
	KtAvatar,
	KtAvatarGroup,
	KtBanner,
	KtBreadcrumb,
	KtButton,
	KtButtonGroup,
	KtCard,
	KtCheckbox,
	KtCol,
	KtComment,
	KtCommentInput,
	KtDateInput,
	KtDatePicker,
	KtDrawer,
	KtDropdown,
	KtDropdownButton,
	KtDropdownMenu,
	KtField,
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
	KtFieldMultiSelect,
	KtFieldNumber,
	KtFieldRadioGroup,
	KtFieldSingleSelect,
	KtFieldText,
	KtFieldTextArea,
	KtFieldToggle,
	KtFieldToggleGroup,
	KtForm,
	KtFormControllerList,
	KtFormControllerObject,
	KtFormSubmit,
	KtHeading,
	KtInlineEdit,
	KtInput,
	KtInputNumber,
	KtLine,
	KtModal,
	KtNavbar,
	KtPagination,
	KtPopover,
	KtRadio,
	KtRadioGroup,
	KtRow,
	KtSingleSelect,
	KtStep,
	KtSteps,
	KtSwitch,
	KtTable,
	KtTableColumn,
	KtTableProvider,
	KtTableConsumer,
	KtTableColumnsStateMixin,
	KtTheme,
	KtToaster,
	KtTranslationContext,
	KtUserMenu,
}

export default {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	install(Vue: any) {
		for (const component of Object.values(components)) Vue.use(component)

		Vue.prototype.$KtNavbar = new Vue({
			data: {
				isNarrow: false,
			},
			methods: {
				toggle(value = null) {
					// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
					// @ts-ignore
					this.isNarrow = value === null ? !this.isNarrow : value
				},
			},
		})

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
