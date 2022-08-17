import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_INLINE_EDIT_SUPPORTS } from './constants'
import KtFieldInlineEditVue from './KtFieldInlineEdit.vue'
import { KottiFieldInlineEdit } from './types'

export const KtFieldInlineEdit = attachMeta(
	makeInstallable(KtFieldInlineEditVue),
	{
		addedVersion: '3.0.0-beta-29',
		deprecated: null,
		designs: {
			type: MetaDesignType.FIGMA,
			url: 'https://www.figma.com/file/qfT3ItoKI6OAXYWF6oOjwR/Inline-Edit?node-id=0%3A1',
		},
		slots: {
			...FIELD_META_BASE_SLOTS,
			helpText: {
				description:
					'custom helpText support (HTML). Only available in `Regular` Mode',
				scope: null,
			},
		},
		typeScript: {
			namespace: 'Kotti.FieldInlineEdit',
			schema: KottiFieldInlineEdit.Regular.propsSchema,
		},
	},
	{ supports: KOTTI_FIELD_INLINE_EDIT_SUPPORTS },
)

export * from './constants'
