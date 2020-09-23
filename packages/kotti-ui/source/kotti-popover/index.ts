import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

import KtPopoverVue from './KtPopover.vue'
import KtPopoverItemVue from './KtPopoverItem.vue'

const META: Kotti.Meta = {
	addedVersion: '0.0.8',
	deprecated: null,
	typeScript: null,
}

export const KtPopover = attachMeta(makeInstallable(KtPopoverVue), META)
export const KtPopoverItem = attachMeta(makeInstallable(KtPopoverItemVue), META)
