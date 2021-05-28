import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtLineVue from './KtLine.vue'

export const KtLine = attachMeta(makeInstallable(KtLineVue), {
	addedVersion: '1.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url:
			'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=95%3A771',
	},
	slots: {},
	typeScript: {
		namespace: 'Kotti.Line',
	},
})
