import { attachMeta, makeInstallable } from '../next/utilities'

import KtInput from './KtInput.vue'

attachMeta(makeInstallable(KtInput), {
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

export { KtInput }
