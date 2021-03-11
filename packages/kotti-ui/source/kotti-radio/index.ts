import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtRadioVue from './KtRadio.vue'

/**
 * @deprecated
 */
export const KtRadio = attachMeta(makeInstallable(KtRadioVue), {
	addedVersion: '0.0.1',
	deprecated: {
		alternatives: ['KtFieldRadioGroup'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	designs: {
		type: MetaDesignType.FIGMA,
		url:
			'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=125%3A1173',
	},
	slots: {
		default: { description: null, scope: null },
	},
	typeScript: null,
})
