import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_FILE_UPLOAD_SUPPORTS } from './constants'
import KtFieldFileUploadVue from './KtFieldFileUpload.vue'
import KtFieldFileUploadRemoteVue from './KtFieldFileUploadRemote.vue'
import { KottiFieldFileUpload, KottiFieldFileUploadRemote } from './types'

const componentFolder = 'kotti-field-file-upload'
const url =
	'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=3547%3A8456&t=hhn880dUtUMnmX06-0'
export const KtFieldFileUpload = attachMeta(
	makeInstallable(KtFieldFileUploadVue),
	{
		addedVersion: '3.0.0-beta.43',
		componentFolder,
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldFileUpload',
			schema: KottiFieldFileUpload.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_FILE_UPLOAD_SUPPORTS },
)

export const KtFieldFileUploadRemote = attachMeta(
	makeInstallable(KtFieldFileUploadRemoteVue),
	{
		addedVersion: '3.0.0-beta.43',
		componentFolder,
		deprecated: {
			alternatives: ['Use KtFileUpload instead'],
			reason:
				'Implementing a component that is meant to upload files immediately as a form field is inherently flawed',
			version: '7.2.0',
		},
		designs: {
			type: MetaDesignType.FIGMA,
			url,
		},
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldFileUploadRemote',
			schema: KottiFieldFileUploadRemote.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_FILE_UPLOAD_SUPPORTS },
)

export * from './constants'
