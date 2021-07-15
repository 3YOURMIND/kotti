import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtFieldTextAreaVue from './KtFieldTextArea.vue'

export const KtFieldTextArea = attachMeta(makeInstallable(KtFieldTextAreaVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=436%3A2104',
	},
	slots: FIELD_META_BASE_SLOTS,
	typeScript: {
		namespace: 'Kotti.FieldTextArea',
	},
})

export * from './constants'
