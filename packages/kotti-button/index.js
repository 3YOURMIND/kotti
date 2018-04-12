import KtButton from './src/button';

KtButton.install = function(Vue) {
  Vue.component(KtButton.name, KtButton);
};

export default KtButton;