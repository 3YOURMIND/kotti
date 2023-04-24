import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_FILE_UPLOAD_SUPPORTS } from './constants'
import KtFieldFileUploadVue from './KtFieldFileUpload.vue'
import { KottiFieldFileUpload } from './types'

export const KtFieldFileUpload = attachMeta(
	makeInstallable(KtFieldFileUploadVue),
	{
		addedVersion: '3.0.0-beta.37',
		componentFolder: 'kotti-field-file-upload',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=3547%3A8456&t=hhn880dUtUMnmX06-0',
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldFileUpload',
			schema: KottiFieldFileUpload.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_FILE_UPLOAD_SUPPORTS },
)

export * from './constants'
