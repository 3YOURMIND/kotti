import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtPaginationVue from './KtPagination.vue'
import { KottiPagination } from './types'

export const KtPagination = attachMeta(makeInstallable(KtPaginationVue), {
	addedVersion: '0.0.6',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=101%3A1106',
	},
	slots: {},
	typeScript: {
		namespace: 'KottiPagination',
		schema: KottiPagination.propsSchema,
	},
})
