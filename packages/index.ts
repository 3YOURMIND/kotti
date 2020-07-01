// This should be called first
import './kotti-style/index.scss'

// eslint-disable-next-line prettier/prettier
export * as Kotti from './types'

import KtAccordion from './kotti-accordion'
import KtActionbar from './kotti-actionbar'
import KtAvatar from './kotti-avatar'
import KtAvatarGroup from './kotti-avatar-group'
import KtBanner from './kotti-banner'
import KtBreadcrumb from './kotti-breadcrumb'
import KtButton from './kotti-button'
import KtButtonGroup from './kotti-button-group'
import KtCard from './kotti-card'
import KtCheckbox from './kotti-checkbox'
import KtCol from './kotti-col'
import KtComment from './kotti-comment'
import KtCommentInput from './kotti-comment-input'
import KtDatePicker, { KtDateInput } from './kotti-datepicker'
import KtDrawer from './kotti-drawer'
import KtDropdown from './kotti-dropdown'
import KtDropdownButton from './kotti-dropdown-button'
import KtDropdownMenu from './kotti-dropdown-menu'
import KtHeading from './kotti-heading'
import KtInlineEdit from './kotti-inline-edit'
import KtInput from './kotti-input'
import KtInputNumber from './kotti-input-number'
import KtLine from './kotti-line'
import KtModal from './kotti-modal'
import KtNavbar from './kotti-navbar'
import KtPagenation from './kotti-pagination'
import KtPopover from './kotti-popover'
import KtRadio from './kotti-radio'
import KtRadioGroup from './kotti-radio-group'
import KtRow from './kotti-row'
import KtSingleSelect from './kotti-single-select'
import KtStep from './kotti-step'
import KtSteps from './kotti-steps'
import KtSwitch from './kotti-switch'
import KtTable, {
	KtTableColumn,
	KtTableProvider,
	KtTableColumnsStateMixin,
} from './kotti-table'
import KtTheme from './kotti-theme'
import KtToaster from './kotti-toaster'
import KtUserMenu from './kotti-user-menu'
import { KtField } from './next/kotti-field'
import {
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
} from './next/kotti-field-date'
import { KtFieldNumber } from './next/kotti-field-number'
import { KtFieldRadioGroup } from './next/kotti-field-radio-group'
import {
	KtFieldSingleSelect,
	KtFieldMultiSelect,
} from './next/kotti-field-select'
import { KtFieldText } from './next/kotti-field-text'
import { KtFieldTextArea } from './next/kotti-field-text-area'
import { KtFieldToggle, KtFieldToggleGroup } from './next/kotti-field-toggle'
import {
	KtForm,
	KtFormControllerList,
	KtFormControllerObject,
	KtFormSubmit,
} from './next/kotti-form'
import { KtTranslationContext } from './next/kotti-translation/KtTranslationContext'

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
	KtPagenation,
	KtPopover,
	KtRadio,
	KtRadioGroup,
	KtRow,
	KtSingleSelect,
	KtStep,
	KtSteps,
	KtSwitch,
	KtTable,
	KtTheme,
	KtToaster,
	KtTranslationContext,
	KtUserMenu,
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function install(Vue: any) {
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
	Vue.prototype.$yodify = function({
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
}

if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export default { ...components, install }
export {
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
	KtPagenation,
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
	KtTableColumnsStateMixin,
	KtTableProvider,
	KtTheme,
	KtToaster,
	KtTranslationContext,
	KtUserMenu,
}
