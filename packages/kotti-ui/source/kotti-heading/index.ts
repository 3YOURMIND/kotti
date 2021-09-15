import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtHeadingVue from './KtHeading.vue'

export const KtHeading = attachMeta(makeInstallable(KtHeadingVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=95%3A765',
	},
	slots: {
		default: { description: 'Used for type toggle', scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Heading',
		schema: null,
	},
})
