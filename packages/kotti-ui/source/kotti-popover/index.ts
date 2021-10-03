import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtPopoverVue from './KtPopover.vue'
import KtPopoverItemVue from './KtPopoverItem.vue'

export const KtPopover = attachMeta(makeInstallable(KtPopoverVue), {
	addedVersion: '0.0.8',
	deprecated: null,
	designs: [
		{
			title: 'Simple',
			type: MetaDesignType.FIGMA,
			url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=118%3A35',
		},
		{
			title: 'With Items',
			type: MetaDesignType.FIGMA,
			url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=95%3A552',
		},
	],
	slots: {
		content: { description: null, scope: null },
		default: { description: null, scope: null },
	},
	typeScript: null, // TODO: Expose propsSchema once refactored to TS
})

export const KtPopoverItem = attachMeta(makeInstallable(KtPopoverItemVue), {
	addedVersion: '0.0.8',
	deprecated: null,
	designs: null,
	slots: {
		default: { description: null, scope: null },
	},
	typeScript: null,
})
