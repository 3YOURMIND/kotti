import { attachMeta, makeInstallable } from '../next/utilities'

import KtRadioVue from './KtRadio.vue'

/**
 * @deprecated
 */
export const KtRadio = attachMeta(makeInstallable(KtRadioVue), {
	addedVersion: 'unkown',
	deprecated: {
		alternatives: ['KtFieldRadioGroup'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})
