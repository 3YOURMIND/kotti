import KtAvatar from '../packages/kotti-avatar';
import KtAvatarGroup from '../packages/kotti-avatar-group';
import KtBanner from '../packages/kotti-banner';
import KtButton from '../packages/kotti-button';
import KtButtonGroup from '../packages/kotti-button-group';
import KtCol from '../packages/kotti-col';
import KtComment from '../packages/kotti-comment';
import KtDrawer from '../packages/kotti-drawer';
import KtHeading from '../packages/kotti-heading';
import KtInlineEdit from '../packages/kotti-inline-edit';
import KtInput from '../packages/kotti-input';
import KtModal from '../packages/kotti-modal';
import KtNavbar from '../packages/kotti-navbar';
import KtRadio from '../packages/kotti-radio';
import ktRadioGroup from '../packages/kotti-radio-group';
import KtSingleSelect from '../packages/kotti-single-select';

const components = [
	KtAvatar,
	KtAvatarGroup,
	KtBanner,
	KtButton,
	KtButtonGroup,
	KtCol,
	KtComment,
	KtDrawer,
	KtHeading,
	KtInlineEdit,
	KtInput,
	KtModal,
	KtNavbar,
	KtRadio,
	ktRadioGroup,
	KtSingleSelect,
];

const install = function(Vue, opts = {}) {
	components.map(component => {
		Vue.component(component.name, component);
	});
};

if (typeof window !== 'undefined' && window.Vue) {
	install(window.Vue);
}

module.exports = {
	KtAvatar,
	KtAvatarGroup,
	KtBanner,
	KtButton,
	KtButtonGroup,
	KtCol,
	KtComment,
	KtDrawer,
	KtHeading,
	KtInlineEdit,
	KtInput,
	KtModal,
	KtNavbar,
	KtRadio,
	ktRadioGroup,
	KtSingleSelect,
};

module.exports.default = module.exports;
