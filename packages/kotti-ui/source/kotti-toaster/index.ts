import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtToastVue from './KtToast.vue'
import KtToasterVue from './KtToaster.vue'
import { KottiToast, KottiToaster } from './types'

export { createToaster } from './create-toaster'

export const KtToaster = attachMeta(makeInstallable(KtToasterVue), {
	addedVersion: '8.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/design/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=6671-10835',
	},
	slots: {
		default: {
			description:
				'Slots for all message types exist, with default being the fallback',
			scope: {
				custom: { description: 'Custom data object', type: 'object' },
				delete: { description: 'Deletes the toast', type: 'function' },
				duration: {
					description:
						'Total toasting duration in ms, null for persistent toasts',
					type: 'integer',
				},
				header: { description: 'Optional header text', type: 'string' },
				progress: { description: 'Lifecycle progress (0–1)', type: 'float' },
				text: { description: 'Main text content', type: 'string' },
				type: { description: 'Toast type', type: 'string' },
			},
		},
	},
	typeScript: {
		namespace: 'KottiToaster',
		schema: KottiToaster.propsSchema,
	},
})

export const KtToast = attachMeta(makeInstallable(KtToastVue), {
	addedVersion: '8.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/design/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=6671-10835',
	},
	slots: {
		actions: {
			description:
				'Used to put e.g. buttons or other interactive elements at the bottom of the toast',
			scope: null,
		},
		header: {
			description: 'Used to replace the optional header text',
			scope: null,
		},
		text: {
			description: 'Used to replace the main text',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'KottiToast',
		schema: KottiToast.propsSchema,
	},
})
