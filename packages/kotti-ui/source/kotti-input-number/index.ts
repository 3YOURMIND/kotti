import { attachMeta, makeInstallable } from '../next/utilities'

import KtInputNumber from './KtInputNumber.vue'

attachMeta(makeInstallable(KtInputNumber), {
	addedVersion: '0.0.4',
	deprecated: {
		alternatives: ['KtFieldNumber'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})

export { KtInputNumber }
