import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtPopover from './KtPopover.vue'
// @ts-expect-error
import KtPopoverItem from './KtPopoverItem.vue'

makeInstallable(KtPopover)
makeInstallable(KtPopoverItem)

export { KtPopover, KtPopoverItem }
