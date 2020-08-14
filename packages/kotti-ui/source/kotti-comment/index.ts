import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtComment from './KtComment.vue'
// @ts-expect-error
import KtCommentInput from './KtCommentInput.vue'
import { defaultParser } from './utilities'

KtComment.defaultParser = defaultParser

makeInstallable(KtComment)
makeInstallable(KtCommentInput)

export { KtComment, KtCommentInput }
