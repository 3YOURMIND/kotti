import { attachMeta, makeInstallable } from '../utilities'

import KtFieldRadioGroupVue from './KtFieldRadioGroup.vue'

export const KtFieldRadioGroup = attachMeta(
	makeInstallable(KtFieldRadioGroupVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		typeScript: {
			namespace: 'Kotti.FieldRadioGroup',
		},
	},
)

export * from './constants'
