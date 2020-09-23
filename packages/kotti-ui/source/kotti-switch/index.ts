import { attachMeta, makeInstallable } from '../next/utilities'

import KtSwitchVue from './KtSwitch.vue'

/**
 * @deprecated
 */
export const KtSwitch = attachMeta(makeInstallable(KtSwitchVue), {
	addedVersion: null,
	deprecated: {
		alternatives: ['KtFieldToggle'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})
