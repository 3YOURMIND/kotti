import { attachMeta, makeInstallable } from '../utilities'

import KtRadioVue from './KtRadio.vue'

/**
 * @deprecated
 */
export const KtRadio = attachMeta(makeInstallable(KtRadioVue), {
	addedVersion: '0.0.1',
	deprecated: {
		alternatives: ['KtFieldRadioGroup'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	slots: {
		default: { description: null, scope: null },
	},
	typeScript: null,
})
