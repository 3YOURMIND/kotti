import { attachMeta, makeInstallable } from '../utilities'

import KtTagVue from './KtTag.vue'
import { KottiTag } from './types'

export const KtTag = attachMeta(makeInstallable(KtTagVue), {
	addedVersion: '3.0.0-beta.36',
	deprecated: null,
	designs: null,
	slots: {
		default: {
			description: null,
			scope: {},
		},
	},
	typeScript: {
		namespace: 'Kotti.Tag',
		schema: KottiTag.propsSchema,
	},
})
