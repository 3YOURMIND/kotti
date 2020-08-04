import KtComment from './KtComment.vue'
import KtCommentInput from './KtCommentInput.vue'
import { defaultParser } from './utilities'

KtComment.install = function (Vue) {
	Vue.component(KtComment.name, KtComment)
}

KtCommentInput.install = function (Vue) {
	Vue.component(KtCommentInput.name, KtCommentInput)
}

KtComment.defaultParser = defaultParser

export { KtComment, KtCommentInput }
