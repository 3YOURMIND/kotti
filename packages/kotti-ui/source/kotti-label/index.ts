import { attachMeta, makeInstallable } from '../utilities'

import KtLabelVue from './KtLabel.vue'
import { KottiLabel } from './types'

export const KtLabel = attachMeta(makeInstallable(KtLabelVue), {
	addedVersion: '8.19.0',
	deprecated: null,
	designs: null,
	slots: {
		helpText: { description: 'custom helpText support (HTML)', scope: null },
	},
	typeScript: {
		namespace: 'Kotti.Label',
		schema: KottiLabel.propsSchema,
	},
})
