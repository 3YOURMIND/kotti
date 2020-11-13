import { attachMeta, makeInstallable } from '../next/utilities'

import KtModalVue from './KtModal.vue'

export const KtModal = attachMeta(makeInstallable(KtModalVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {
		body: { description: null, scope: null },
		container: {
			description: 'Allows overriding the entire inside of the modal',
			scope: null,
		},
		footer: { description: null, scope: null },
		header: { description: null, scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Modal',
	},
})
