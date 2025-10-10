import { attachMeta, makeInstallable } from '../utilities'

import KtI18nContextVue from './KtI18nContext.vue'

export const KtI18nContext = attachMeta(makeInstallable(KtI18nContextVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.I18n',
		schema: null,
	},
})

export * from './constants'
