import { attachMeta, makeInstallable } from '../utilities'

import KtBreadcrumbVue from './KtBreadcrumb.vue'

export const KtBreadcrumb = attachMeta(makeInstallable(KtBreadcrumbVue), {
	addedVersion: '0.0.5',
	deprecated: null,
	slots: {},
	typeScript: null,
})
