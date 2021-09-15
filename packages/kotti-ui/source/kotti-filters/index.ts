import { attachMeta, makeInstallable } from '../utilities'

import KtFiltersVue from './KtFilters.vue'

export const KtFilters = attachMeta(makeInstallable(KtFiltersVue), {
	addedVersion: '3.0.0',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.Filters',
		schema: null,
	},
})
