import { attachMeta, makeInstallable } from '../utilities'

import KtInlineEditVue from './KtInlineEdit.vue'

export const KtInlineEdit = attachMeta(makeInstallable(KtInlineEditVue), {
	addedVersion: '0.0.1',
	deprecated: {
		alternatives: ['KtFieldInlineEdit'],
		reason: 'Replaced by Kotti Field Inline Edit',
		version: '3.0.0-beta-29',
	},
	designs: null,
	slots: {},
	typeScript: null,
})
