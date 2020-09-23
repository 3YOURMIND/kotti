import { attachMeta, makeInstallable } from '../next/utilities'

import KtRadio from './KtRadio.vue'

attachMeta(makeInstallable(KtRadio), {
	addedVersion: 'unkown',
	deprecated: {
		alternatives: ['KtFieldRadioGroup'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})

export { KtRadio }
