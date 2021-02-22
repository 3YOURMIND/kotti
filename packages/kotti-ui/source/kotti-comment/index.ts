import { Kotti } from '../types'
import { attachMeta, makeInstallable } from '../utilities'

import KtCommentVue from './KtComment.vue'
import KtCommentInputVue from './KtCommentInput.vue'

const META: Kotti.Meta = {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {},
	typeScript: null,
}

export const KtComment = attachMeta(makeInstallable(KtCommentVue), META)
export const KtCommentInput = attachMeta(
	makeInstallable(KtCommentInputVue),
	META,
)
