import KtInlineEdit from './KtInlineEdit.vue'
import { defaultParser } from './utilities'

KtInlineEdit.install = function (Vue) {
	Vue.component(KtInlineEdit.name, KtInlineEdit)
}

KtInlineEdit.defaultParser = defaultParser

export { KtInlineEdit }
