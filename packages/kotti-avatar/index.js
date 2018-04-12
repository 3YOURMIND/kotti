import KtAvatar from './src/avatar';

KtAvatar.install = function(Vue) {
  Vue.component(KtAvatar.name, KtButton);
};

export default KtAvatar;