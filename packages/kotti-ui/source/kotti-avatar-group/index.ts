import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtAvatarGroupVue from './KtAvatarGroup.vue'

export const KtAvatarGroup = attachMeta(makeInstallable(KtAvatarGroupVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=95%3A66',
	},
	slots: {},
	typeScript: {
		namespace: 'Kotti.AvatarGroup',
	},
})
