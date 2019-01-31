import KtInlineEdit from './src/InlineEdit'
import escape from 'lodash/escape'

export const defaultParser = message => escape(message)

KtInlineEdit.install = function(Vue) {
	Vue.component(KtInlineEdit.name, KtInlineEdit)
}

KtInlineEdit.defaultParser = defaultParser

export default KtInlineEdit
