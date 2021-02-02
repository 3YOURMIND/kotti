import { attachMeta, makeInstallable } from '../next/utilities'

import KtInlineEditVue from './KtInlineEdit.vue'

export const KtInlineEdit = attachMeta(makeInstallable(KtInlineEditVue), {
	addedVersion: null,
	deprecated: {
		alternatives: [],
		reason:
			'Part of the old legacy kotti form components. Needs to be re-designed or removed entirely.',
		version: '3.0.0',
	},
	slots: {},
	typeScript: null,
})
