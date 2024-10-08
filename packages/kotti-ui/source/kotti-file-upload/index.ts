import { attachMeta, makeInstallable } from '../utilities'

import KtFileUploadVue from './KtFileUpload.vue'
import { KottiFileUpload } from './types'

export const KtFileUpload = attachMeta(makeInstallable(KtFileUploadVue), {
	addedVersion: '0.0.1',
	deprecated: null,
	designs: null,
	slots: {
		helpText: { description: 'custom helpText support (HTML)', scope: null },
	},
	typeScript: {
		namespace: 'Kotti.FileUpload',
		schema: KottiFileUpload.propsSchema,
	},
})
