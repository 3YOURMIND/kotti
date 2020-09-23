import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

// @ts-expect-error
import KtComment from './KtComment.vue'
// @ts-expect-error
import KtCommentInput from './KtCommentInput.vue'
import { defaultParser } from './utilities'

KtComment.defaultParser = defaultParser

const META: Kotti.Meta = {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
}

attachMeta(makeInstallable(KtComment), META)
attachMeta(makeInstallable(KtCommentInput), META)

export { KtComment, KtCommentInput }
