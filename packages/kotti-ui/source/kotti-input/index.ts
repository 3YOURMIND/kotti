import { attachMeta, makeInstallable } from '../next/utilities'

import KtInputVue from './KtInput.vue'

/**
 * @deprecated
 */
export const KtInput = attachMeta(makeInstallable(KtInputVue), {
	addedVersion: null,
	deprecated: {
		alternatives: [
			'KtFieldText',
			'KtFieldNumber',
			'KtFieldEmail',
			'KtFieldPassword',
		],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})
