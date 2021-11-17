import { attachMeta, makeInstallable } from '../utilities'

import KtInputVue from './KtInput.vue'

/**
 * @deprecated
 */
export const KtInput = attachMeta(makeInstallable(KtInputVue), {
	addedVersion: '0.0.1',
	deprecated: {
		alternatives: [
			'KtFieldEmail',
			'KtFieldNumber',
			'KtFieldPassword',
			'KtFieldText',
		],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	designs: null,
	slots: {
		dialog: { description: null, scope: null },
	},
	typeScript: null,
})
