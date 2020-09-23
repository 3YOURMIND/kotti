import { attachMeta, makeInstallable } from '../next/utilities'

import KtAvatarGroupVue from './KtAvatarGroup.vue'

export const KtAvatarGroup = attachMeta(makeInstallable(KtAvatarGroupVue), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})
