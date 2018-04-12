import KtButton from './src/button';

/* istanbul ignore next */
KtButton.install = function(Vue) {
  Vue.component(KtButton.name, KtButton);
};

export default KtButton;