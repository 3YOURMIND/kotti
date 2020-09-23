import { attachMeta, makeInstallable } from '../next/utilities'

import KtCheckbox from './KtCheckbox.vue'

attachMeta(makeInstallable(KtCheckbox), {
	addedVersion: '1.0.0',
	deprecated: {
		alternatives: ['KtFieldToggle'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})
export { KtCheckbox }
