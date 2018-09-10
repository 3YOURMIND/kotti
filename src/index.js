import KtAvatar from '../packages/kotti-avatar'
import KtAvatarGroup from '../packages/kotti-avatar-group'
import KtBanner from '../packages/kotti-banner'
import KtBreadcrumb from '../packages/kotti-breadcrumb'
import KtButton from '../packages/kotti-button'
import KtButtonGroup from '../packages/kotti-button-group'
import KtCard from '../packages/kotti-card'
import KtCol from '../packages/kotti-col'
import KtDatePicker from '../packages/kotti-datepicker'
import KtDrawer from '../packages/kotti-drawer'
import KtHeading from '../packages/kotti-heading'
import KtInlineEdit from '../packages/kotti-inline-edit'
import KtInput from '../packages/kotti-input'
import KtInputNumber from '../packages/kotti-input-number'
import KtModal from '../packages/kotti-modal'
import KtNavbar from '../packages/kotti-navbar'
import KtPopover from '../packages/kotti-popover'
import KtRadio from '../packages/kotti-radio'
import KtRow from '../packages/kotti-row'
import KtSingleSelect from '../packages/kotti-single-select'
import KtSwitch from '../packages/kotti-switch'
import KtTable from '../packages/kotti-table'
import KtUserMenu from '../packages/kotti-user-menu'
import ktRadioGroup from '../packages/kotti-radio-group'

const components = [
	KtAvatar,
	KtAvatarGroup,
	KtBanner,
	KtBreadcrumb,
	KtButton,
	KtButtonGroup,
	KtCard,
	KtCol,
	KtDatePicker,
	KtDrawer,
	KtHeading,
	KtInlineEdit,
	KtInput,
	KtInputNumber,
	KtModal,
	KtNavbar,
	KtPopover,
	KtRadio,
	KtRow,
	KtSingleSelect,
	KtSwitch,
	KtTable,
	KtUserMenu,
	ktRadioGroup,
]

const install = function(Vue = {}) {
	components.map(component => {
		Vue.component(component.name, component)
	})
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default Object.assign({}, components, { install })
