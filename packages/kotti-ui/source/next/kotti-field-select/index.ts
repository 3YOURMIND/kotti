import { attachMeta, makeInstallable } from '../utilities'

import KtFieldMultiSelectVue from './KtFieldMultiSelect.vue'
import KtFieldSingleSelectVue from './KtFieldSingleSelect.vue'

export const KtFieldSingleSelect = attachMeta(
	makeInstallable(KtFieldSingleSelectVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		typeScript: {
			namespace: 'Kotti.KtFieldSingleSelect',
		},
	},
)

export const KtFieldMultiSelect = attachMeta(
	makeInstallable(KtFieldMultiSelectVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		typeScript: {
			namespace: 'Kotti.KtFieldMultiSelect',
		},
	},
)

export * from './constants'
