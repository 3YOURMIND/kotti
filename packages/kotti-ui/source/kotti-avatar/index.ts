import { attachMeta, makeInstallable } from '../utilities'

import KtAvatarVue from './KtAvatar.vue'

export const KtAvatar = attachMeta(makeInstallable(KtAvatarVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	slots: {},
	typeScript: null,
})
