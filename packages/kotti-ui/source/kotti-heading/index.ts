import { attachMeta, makeInstallable } from '../next/utilities'

import KtHeadingVue from './KtHeading.vue'

export const KtHeading = attachMeta(makeInstallable(KtHeadingVue), {
	addedVersion: null,
	deprecated: null,
	slots: {
		default: { description: 'Used for type toggle', scope: null },
	},
	typeScript: null,
})
