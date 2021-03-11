import { attachMeta, makeInstallable } from '../utilities'

import { KtTranslationContext as KtTranslationContextVue } from './KtTranslationContext'

export const KtTranslationContext = attachMeta(
	makeInstallable(KtTranslationContextVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: null,
		slots: {},
		typeScript: {
			namespace: 'Kotti.Translation',
		},
	},
)

export * from './constants'
