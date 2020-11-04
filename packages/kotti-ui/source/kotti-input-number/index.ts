import { attachMeta, makeInstallable } from '../next/utilities'

import KtInputNumberVue from './KtInputNumber.vue'

/**
 * @deprecated
 */
export const KtInputNumber = attachMeta(makeInstallable(KtInputNumberVue), {
	addedVersion: '0.0.4',
	deprecated: {
		alternatives: ['KtFieldNumber'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	slots: {},
	typeScript: null,
})
