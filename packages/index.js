import KtAvatar from './kotti-avatar'
import KtActionbar from './kotti-actionbar'
import KtAvatarGroup from './kotti-avatar-group'
import KtBanner from './kotti-banner'
import KtBreadcrumb from './kotti-breadcrumb'
import KtButton from './kotti-button'
import KtButtonGroup from './kotti-button-group'
import KtCard from './kotti-card'
import KtCol from './kotti-col'
import KtComment from './kotti-comment'
import KtCommentInput from './kotti-comment-input'
import KtDatePicker from './kotti-datepicker'
import KtDrawer from './kotti-drawer'
import KtHeading from './kotti-heading'
import KtInlineEdit from './kotti-inline-edit'
import KtInput from './kotti-input'
import KtInputNumber from './kotti-input-number'
import KtModal from './kotti-modal'
import KtNavbar from './kotti-navbar'
import KtPopover from './kotti-popover'
import KtPagenation from './kotti-pagination'
import KtRadio from './kotti-radio'
import KtRow from './kotti-row'
import KtSingleSelect from './kotti-single-select'
import KtSwitch from './kotti-switch'
import KtTable from './kotti-table'
import KtUserMenu from './kotti-user-menu'
import KtRadioGroup from './kotti-radio-group'
import './kotti-style/index.scss'

const components = {
	KtAvatar,
	KtAvatarGroup,
	KtActionbar,
	KtBanner,
	KtBreadcrumb,
	KtButton,
	KtButtonGroup,
	KtCard,
	KtCol,
	KtComment,
	KtCommentInput,
	KtDatePicker,
	KtDrawer,
	KtHeading,
	KtInlineEdit,
	KtInput,
	KtInputNumber,
	KtModal,
	KtNavbar,
	KtPopover,
	KtPagenation,
	KtRadio,
	KtRow,
	KtSingleSelect,
	KtSwitch,
	KtTable,
	KtUserMenu,
	KtRadioGroup,
}
function install(Vue) {
	for (const component of Object.values(components)) Vue.use(component)
}

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue)
}

export default { ...components, install }
