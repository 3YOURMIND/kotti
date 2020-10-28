import { attachMeta, makeInstallable } from '../next/utilities'

import KtInlineEditVue from './KtInlineEdit.vue'

export const KtInlineEdit = attachMeta(makeInstallable(KtInlineEditVue), {
	addedVersion: null,
	deprecated: null,
	slots: {},
	typeScript: null,
})
