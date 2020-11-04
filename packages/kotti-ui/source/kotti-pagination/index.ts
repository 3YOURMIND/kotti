import { attachMeta, makeInstallable } from '../next/utilities'

import KtPaginationVue from './KtPagination.vue'

export const KtPagination = attachMeta(makeInstallable(KtPaginationVue), {
	addedVersion: '0.0.6',
	deprecated: null,
	slots: {},
	typeScript: null,
})
