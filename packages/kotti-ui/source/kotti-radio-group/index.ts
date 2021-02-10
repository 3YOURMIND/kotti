import { attachMeta, makeInstallable } from '../next/utilities'

import KtRadioGroupVue from './KtRadioGroup.vue'

/**
 * @deprecated
 */
export const KtRadioGroup = attachMeta(makeInstallable(KtRadioGroupVue), {
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
