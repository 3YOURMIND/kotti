import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtModalVue from './KtModal.vue'

export const KtModal = attachMeta(makeInstallable(KtModalVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url:
			'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=99%3A46',
	},
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
