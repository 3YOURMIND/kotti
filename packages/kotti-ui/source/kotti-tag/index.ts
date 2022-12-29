import { attachMeta, makeInstallable } from '../utilities'

import KtTagVue from './KtTag.vue'
import { KottiTag } from './types'

export const KtTag = attachMeta(makeInstallable(KtTagVue), {
	addedVersion: '3.0.0',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.Tag',
		schema: KottiTag.propsSchema,
	},
})
