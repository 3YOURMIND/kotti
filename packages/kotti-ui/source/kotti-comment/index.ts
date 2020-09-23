import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

import KtCommentVue from './KtComment.vue'
import KtCommentInputVue from './KtCommentInput.vue'

const META: Kotti.Meta = {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
}

export const KtComment = attachMeta(makeInstallable(KtCommentVue), META)
export const KtCommentInput = attachMeta(
	makeInstallable(KtCommentInputVue),
	META,
)
