import type { ComponentPublicInstanceConstructor } from 'vue/types/v3-component-public-instance'

import type { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtCommentVue from './KtComment.vue'
import KtCommentInputVue from './KtCommentInput.vue'
import { KottiComment, KottiCommentInput } from './types'

const META: Omit<Kotti.Meta, 'typeScript'> = {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=133%3A2594',
	},
	slots: {},
}

export const KtComment = attachMeta(
	makeInstallable(KtCommentVue as ComponentPublicInstanceConstructor),
	{
		...META,
		typeScript: {
			namespace: 'Kotti.Comment',
			schema: KottiComment.propsSchema,
		},
	},
)

export const KtCommentInput = attachMeta(
	makeInstallable(KtCommentInputVue as ComponentPublicInstanceConstructor),
	{
		...META,
		typeScript: {
			namespace: 'Kotti.CommentInput',
			schema: KottiCommentInput.propsSchema,
		},
	},
)
