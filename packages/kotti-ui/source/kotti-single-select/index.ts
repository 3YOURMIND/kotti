import { attachMeta, makeInstallable } from '../next/utilities'

import KtSingleSelect from './KtSingleSelect.vue'

attachMeta(makeInstallable(KtSingleSelect), {
	addedVersion: null,
	deprecated: {
		alternatives: ['KtFieldSingleSelect', 'KtFieldMultipleSelect'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})

export { KtSingleSelect }
