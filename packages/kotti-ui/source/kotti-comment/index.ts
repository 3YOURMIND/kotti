import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

import KtComment from './KtComment.vue'
import KtCommentInput from './KtCommentInput.vue'

const META: Kotti.Meta = {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
}

attachMeta(makeInstallable(KtComment), META)
attachMeta(makeInstallable(KtCommentInput), META)

export { KtComment, KtCommentInput }
