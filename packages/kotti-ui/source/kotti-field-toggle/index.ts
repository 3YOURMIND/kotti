import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { Kotti } from '../types'
import { MetaDesignType } from '../types/kotti'
import { attachMeta, makeInstallable } from '../utilities'

import { KOTTI_FIELD_TOGGLE_SUPPORTS } from './constants'
import KtFieldToggleVue from './KtFieldToggle.vue'
import KtFieldToggleGroupVue from './KtFieldToggleGroup.vue'

const designs: Kotti.Meta['designs'] = [
	{
		title: 'type=switch',
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=436%3A1847',
	},
	{
		title: 'type=checkbox',
		type: MetaDesignType.FIGMA,
		url: 'https://www.figma.com/file/0yFVivSWXgFf2ddEF92zkf/Kotti-Design-System?node-id=435%3A3497',
	},
]

export const KtFieldToggle = attachMeta(
	makeInstallable(KtFieldToggleVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs,
		slots: {
			...FIELD_META_BASE_SLOTS,
			default: {
				description: 'Shown next to toggle sausage',
				scope: null,
			},
		},
		typeScript: {
			namespace: 'Kotti.FieldToggle',
			schema: null,
		},
	},
	{ supports: KOTTI_FIELD_TOGGLE_SUPPORTS },
)

export const KtFieldToggleGroup = attachMeta(
	makeInstallable(KtFieldToggleGroupVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs,
		slots: FIELD_META_BASE_SLOTS,
		typeScript: {
			namespace: 'Kotti.FieldToggleGroup',
			schema: null,
		},
	},
	{ supports: KOTTI_FIELD_TOGGLE_SUPPORTS },
)

export * from './constants'
