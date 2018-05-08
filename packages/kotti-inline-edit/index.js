import KtInlineEdit from './src/inlineEdit';

KtInlineEdit.install = function(Vue) {
	Vue.component(KtInlineEdit.name, KtInlineEdit);
};

export default KtInlineEdit;
