import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtBannerVue from './KtBanner.vue'
import { KottiBanner } from './types'

export const KtBanner = attachMeta(makeInstallable(KtBannerVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/design/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=7096-5539',
	},
	slots: {
		action: {
			description:
				'Use this only if you need to implement a custom action button',
			scope: null,
		},
		footer: {
			description:
				'Used to put e.g. buttons or other interactive elements at the bottom of the banner',
			scope: null,
		},
		header: {
			description: 'Used to replace the optional header text',
			scope: null,
		},
		text: {
			description: 'Used to replace the main text',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.Banner',
		schema: KottiBanner.propsSchema,
	},
})
