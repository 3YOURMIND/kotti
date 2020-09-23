import { attachMeta, makeInstallable } from '../next/utilities'

import KtRadioGroupVue from './KtRadioGroup.vue'

export const KtRadioGroup = attachMeta(makeInstallable(KtRadioGroupVue), {
	addedVersion: 'unkown',
	deprecated: {
		alternatives: ['KtFieldRadioGroup'],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
	typeScript: null,
})
