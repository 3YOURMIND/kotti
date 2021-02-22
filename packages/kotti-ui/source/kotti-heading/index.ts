import { attachMeta, makeInstallable } from '../utilities'

import KtHeadingVue from './KtHeading.vue'

export const KtHeading = attachMeta(makeInstallable(KtHeadingVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {
		default: { description: 'Used for type toggle', scope: null },
	},
	typeScript: null,
})
