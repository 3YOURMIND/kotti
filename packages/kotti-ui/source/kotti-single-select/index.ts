import { attachMeta, makeInstallable } from '../next/utilities'

import KtSingleSelectVue from './KtSingleSelect.vue'

/**
 * @deprecated
 */
export const KtSingleSelect = attachMeta(makeInstallable(KtSingleSelectVue), {
	addedVersion: '0.0.1',
	deprecated: {
		alternatives: ['KtFieldSingleSelect', 'KtFieldMultipleSelect'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	slots: {},
	typeScript: null,
})
