import type { z } from 'zod'

import type { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtCommentVue from './KtComment.vue'
import KtCommentInputVue from './KtCommentInput.vue'
import { KottiComment, KottiCommentInput } from './types'

const getCommentMeta = <T extends z.ZodTypeAny>(): Omit<
	Kotti.Meta<T>,
	'typeScript'
> => ({
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=133%3A2594',
	},
	slots: {},
})

export const KtComment = attachMeta(makeInstallable(KtCommentVue), {
	...getCommentMeta(),
	typeScript: {
		namespace: 'Kotti.Comment',
		schema: KottiComment.propsSchema,
	},
})

export const KtCommentInput = attachMeta(makeInstallable(KtCommentInputVue), {
	...getCommentMeta(),
	typeScript: {
		namespace: 'Kotti.CommentInput',
		schema: KottiCommentInput.propsSchema,
	},
})
