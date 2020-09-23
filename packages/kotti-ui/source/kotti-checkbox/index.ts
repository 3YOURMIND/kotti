import { attachMeta, makeInstallable } from '../next/utilities'

import KtCheckboxVue from './KtCheckbox.vue'

/**
 * @deprecated
 */
export const KtCheckbox = attachMeta(makeInstallable(KtCheckboxVue), {
	addedVersion: '1.0.0',
	deprecated: {
		alternatives: ['KtFieldToggle'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})
