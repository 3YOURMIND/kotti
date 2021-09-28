import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtLabelValueVue from './KtLabelValue.vue'
import { KottiLabelValue } from './types'

export const KtLabelValue = attachMeta(makeInstallable(KtLabelValueVue), {
	addedVersion: '3.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=133%3A2674',
	},
	slots: {
		default: {
			description: 'Used to render custom content instead of value',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.LabelValue',
		schema: KottiLabelValue.propsSchema,
	},
})
