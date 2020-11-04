import { attachMeta, makeInstallable } from '../next/utilities'

import KtPopoverVue from './KtPopover.vue'
import KtPopoverItemVue from './KtPopoverItem.vue'

export const KtPopover = attachMeta(makeInstallable(KtPopoverVue), {
	addedVersion: '0.0.8',
	deprecated: null,
	slots: {
		content: { description: null, scope: null },
		default: { description: null, scope: null },
	},
	typeScript: null,
})

export const KtPopoverItem = attachMeta(makeInstallable(KtPopoverItemVue), {
	addedVersion: '0.0.8',
	deprecated: null,
	slots: {
		default: { description: null, scope: null },
	},
	typeScript: null,
})
