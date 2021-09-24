import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldVue from './KtField.vue'

export const KtField = attachMeta(makeInstallable(KtFieldVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=415%3A1',
	},
	slots: {
		container: {
			description: 'useful for complex fields',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.Field',
		schema: null,
	},
})

export * from './constants'
