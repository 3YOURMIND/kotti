import KtComment from './src/Comment';

KtComment.install = function(Vue) {
  Vue.component(KtComment.name, KtComment);
};

export default KtComment;