import { attachMeta, makeInstallable } from '../next/utilities'

import KtModalVue from './KtModal.vue'

export const KtModal = attachMeta(makeInstallable(KtModalVue), {
	addedVersion: null,
	deprecated: null,
	slots: {
		'modal-body': { description: null, scope: null },
		'modal-footer': { description: null, scope: null },
		'modal-header': { description: null, scope: null },
	},
	typeScript: null,
})
