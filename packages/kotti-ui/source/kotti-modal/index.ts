import { attachMeta, makeInstallable } from '../next/utilities'

import KtModalVue from './KtModal.vue'

export const KtModal = attachMeta(makeInstallable(KtModalVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {
		'modal-body': { description: null, scope: null },
		'modal-container': {
			description: 'Allows overriding the entire inside of the modal',
			scope: null,
		},
		'modal-footer': { description: null, scope: null },
		'modal-header': { description: null, scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Modal',
	},
})
