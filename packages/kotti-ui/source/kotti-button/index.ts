import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtButtonVue from './KtButton.vue'
import { KottiButton } from './types'

export const KtButton = attachMeta(makeInstallable(KtButtonVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=95%3A123',
	},
	slots: {
		default: {
			description: 'Used to replace label with custom HTML',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.Button',
		schema: KottiButton.propsSchema,
	},
})
