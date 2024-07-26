import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import KtToastVue from './KtToast.vue'
import KtToasterVue from './KtToaster.vue'
import { schema } from './types'

export { createToaster } from './create-toaster'

export const KtToaster = attachMeta(makeInstallable(KtToasterVue), {
	addedVersion: '1.0.0',
	deprecated: null,
	designs: {
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/design/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=6671-10835',
	},
	slots: {},
	typeScript: {
		namespace: 'KottiToaster',
		schema,
	},
})

export const KtToast = attachMeta(makeInstallable(KtToastVue), {
	addedVersion: '8.0.0',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: null,
})
