import escape from 'lodash/escape'

import KtComment from './src/Comment.vue'

export const defaultParser = (message) => escape(message)

KtComment.install = function (Vue) {
	Vue.component(KtComment.name, KtComment)
}

KtComment.defaultParser = defaultParser

export { KtComment }
