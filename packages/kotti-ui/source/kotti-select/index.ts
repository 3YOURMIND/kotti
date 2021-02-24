import { attachMeta, makeInstallable } from '../utilities'

import KtSelectVue from './KtSelect.vue'

/**
 * @deprecated
 */
export const KtSelect = attachMeta(makeInstallable(KtSelectVue), {
	addedVersion: '0.0.1',
	deprecated: {
		alternatives: ['KtFieldSingleSelect', 'KtFieldMultipleSelect'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	slots: {},
	typeScript: null,
})
