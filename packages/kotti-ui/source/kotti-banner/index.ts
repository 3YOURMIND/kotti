import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtBannerVue from './KtBanner.vue'

export const KtBanner = attachMeta(makeInstallable(KtBannerVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=1439%3A5',
	},
	slots: {
		default: {
			description: 'Content when Banner is expanded',
			scope: null,
		},
	},
	typeScript: { namespace: 'Kotti.Banner' },
})
