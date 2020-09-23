import { attachMeta, makeInstallable } from '../utilities'

import KtFieldToggleVue from './KtFieldToggle.vue'
import KtFieldToggleGroupVue from './KtFieldToggleGroup.vue'

export const KtFieldToggle = attachMeta(makeInstallable(KtFieldToggleVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.FieldToggle',
	},
})

export const KtFieldToggleGroup = attachMeta(
	makeInstallable(KtFieldToggleGroupVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		typeScript: {
			namespace: 'Kotti.FieldToggleGroup',
		},
	},
)

export * from './constants'
