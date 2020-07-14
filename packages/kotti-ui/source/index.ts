// This should be called first
import './kotti-style/index.scss'
// @ts-ignore
import KtAccordion from './kotti-accordion'
// @ts-ignore
import KtActionbar from './kotti-actionbar'
// @ts-ignore
import KtAvatar from './kotti-avatar'
// @ts-ignore
import KtAvatarGroup from './kotti-avatar-group'
// @ts-ignore
import KtBanner from './kotti-banner'
// @ts-ignore
import KtBreadcrumb from './kotti-breadcrumb'
// @ts-ignore
import KtButton from './kotti-button'
// @ts-ignore
import KtButtonGroup from './kotti-button-group'
// @ts-ignore
import KtCard from './kotti-card'
// @ts-ignore
import KtCheckbox from './kotti-checkbox'
// @ts-ignore
import KtCol from './kotti-col'
// @ts-ignore
import KtComment from './kotti-comment'
// @ts-ignore
import KtCommentInput from './kotti-comment-input'
// @ts-ignore
import KtDatePicker, { KtDateInput } from './kotti-datepicker'
// @ts-ignore
import KtDrawer from './kotti-drawer'
// @ts-ignore
import KtDropdown from './kotti-dropdown'
// @ts-ignore
import KtDropdownButton from './kotti-dropdown-button'
// @ts-ignore
import KtDropdownMenu from './kotti-dropdown-menu'
// @ts-ignore
import KtHeading from './kotti-heading'
// @ts-ignore
import KtInlineEdit from './kotti-inline-edit'
// @ts-ignore
import KtInput from './kotti-input'
// @ts-ignore
import KtInputNumber from './kotti-input-number'
// @ts-ignore
import KtLine from './kotti-line'
// @ts-ignore
import KtModal from './kotti-modal'
// @ts-ignore
import KtNavbar from './kotti-navbar'
// @ts-ignore
import KtPagenation from './kotti-pagination'
// @ts-ignore
import KtPopover from './kotti-popover'
// @ts-ignore
import KtRadio from './kotti-radio'
// @ts-ignore
import KtRadioGroup from './kotti-radio-group'
// @ts-ignore
import KtRow from './kotti-row'
// @ts-ignore
import KtSingleSelect from './kotti-single-select'
// @ts-ignore
import KtStep from './kotti-step'
// @ts-ignore
import KtSteps from './kotti-steps'
// @ts-ignore
import KtSwitch from './kotti-switch'
// @ts-ignore
import KtTable, {
	KtTableColumn,
	KtTableProvider,
	KtTableColumnsStateMixin,
	// @ts-ignore
} from './kotti-table'
// @ts-ignore
import KtTheme from './kotti-theme'
// @ts-ignore
import KtToaster from './kotti-toaster'
// @ts-ignore
import KtUserMenu from './kotti-user-menu'
// @ts-ignore
import { KtField } from './next/kotti-field'
// @ts-ignore
import {
	// @ts-ignore
	KtFieldDate,
	KtFieldDateRange,
	KtFieldDateTime,
	KtFieldDateTimeRange,
} from './next/kotti-field-date'
// @ts-ignore
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
import * as Kotti from './types'

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

// @ts-ignore
if (typeof window !== 'undefined' && window.Vue) install(window.Vue)

export { Kotti }
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
// @ts-ignore
