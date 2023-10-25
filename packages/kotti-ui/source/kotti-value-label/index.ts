import { FIELD_META_BASE_SLOTS } from '../kotti-field/meta'
import { attachMeta, makeInstallable } from '../utilities'

import KtValueLabelVue from './KtValueLabel.vue'
import { KottiValueLabel } from './types'

export const KtValueLabel = attachMeta(makeInstallable(KtValueLabelVue), {
	addedVersion: '5.3.1',
	componentFolder: 'kotti-value-label',
	deprecated: null,
	designs: null,
	slots: {
		...FIELD_META_BASE_SLOTS,
		default: {
			description: 'used to render custom content instead of value',
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.ValueLabel',
		schema: KottiValueLabel.propsSchema,
	},
})
