import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtToasterVue from './KtToaster.vue'

export const KtToaster = attachMeta(makeInstallable(KtToasterVue), {
	addedVersion: '1.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url:
			'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=128%3A2082',
	},
	slots: {},
	typeScript: null,
})
