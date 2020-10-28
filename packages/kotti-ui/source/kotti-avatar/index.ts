import { attachMeta, makeInstallable } from '../next/utilities'

import KtAvatarVue from './KtAvatar.vue'

export const KtAvatar = attachMeta(makeInstallable(KtAvatarVue), {
	addedVersion: null,
	deprecated: null,
	slots: {},
	typeScript: null,
})
