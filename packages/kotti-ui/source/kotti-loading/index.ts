import { attachMeta, makeInstallable } from '../utilities'

import KtLoadingVue from './KtLoading.vue'
import { KottiLoading } from './types'

export const KtLoading = attachMeta(makeInstallable(KtLoadingVue), {
	addedVersion: '9.4.0',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.Loading',
		schema: KottiLoading.propsSchema,
	},
})
