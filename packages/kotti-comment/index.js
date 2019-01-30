import KtComment from './src/Comment'
import escape from 'lodash/escape'

export const defaultParser = message => escape(message)

KtComment.install = function(Vue) {
	Vue.component(KtComment.name, KtComment)
}

KtComment.defaultParser = defaultParser

export default KtComment
