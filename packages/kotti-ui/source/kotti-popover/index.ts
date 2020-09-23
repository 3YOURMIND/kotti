import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

import KtPopover from './KtPopover.vue'
import KtPopoverItem from './KtPopoverItem.vue'

const META: Kotti.Meta = {
	addedVersion: '0.0.8',
	deprecated: null,
	typeScript: null,
}

attachMeta(makeInstallable(KtPopover), META)
attachMeta(makeInstallable(KtPopoverItem), META)

export { KtPopover, KtPopoverItem }
