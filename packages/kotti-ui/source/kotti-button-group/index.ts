import { attachMeta, makeInstallable } from '../utilities'

import KtButtonGroupVue from './KtButtonGroup.vue'

export const KtButtonGroup = attachMeta(makeInstallable(KtButtonGroupVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: null,
	slots: {
		default: { description: 'Should contain KtButtons', scope: null },
	},
	typeScript: {
		namespace: 'Kotti.ButtonGroup',
		schema: null,
	},
})
