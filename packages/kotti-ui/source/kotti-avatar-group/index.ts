import { attachMeta, makeInstallable } from '../next/utilities'

import KtAvatarGroupVue from './KtAvatarGroup.vue'

export const KtAvatarGroup = attachMeta(makeInstallable(KtAvatarGroupVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {},
	typeScript: null,
})
