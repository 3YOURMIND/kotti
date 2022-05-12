import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtPopoverVue from './KtPopover.vue'
import { KottiPopover } from './types'

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
		content: {
			description: 'Slot for the content of the popper.',
			scope: {
				close: {
					description: 'closes the popover',
					type: 'function',
				},
			},
		},
		default: {
			description: 'Slot for the trigger element',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.Popover',
		schema: KottiPopover.propsSchema,
	},
})
