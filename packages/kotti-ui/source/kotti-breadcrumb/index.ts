import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtBreadcrumbVue from './KtBreadcrumb.vue'
import { KottiBreadcrumb } from './types'

export const KtBreadcrumb = attachMeta(makeInstallable(KtBreadcrumbVue), {
	addedVersion: '0.0.5',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=95%3A126',
	},
	slots: {},
	typeScript: {
		namespace: 'Kotti.Breadcrumb',
		schema: KottiBreadcrumb.propsSchema,
	},
})
