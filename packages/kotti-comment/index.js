import escape from 'lodash/escape'
import KtComment from './src/Comment'

export const defaultParser = message => escape(message)

KtComment.install = function(Vue) {
	Vue.component(KtComment.name, KtComment)
}

KtComment.defaultParser = defaultParser

export default KtComment
