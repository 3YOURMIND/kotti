import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtStepsVue from './KtSteps.vue'

export const KtSteps = attachMeta(makeInstallable(KtStepsVue), {
	addedVersion: '1.1.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=129%3A2617',
	},
	slots: {
		default: { description: 'Should contain KtSteps', scope: null },
	},
	typeScript: null,
})
