import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

import KtDateInputVue from './KtDateInput.vue'
import KtDatePickerVue from './KtDatePicker.vue'

const META: Kotti.Meta = {
	addedVersion: '0.0.4',
	typeScript: null,
	deprecated: {
		alternatives: [
			'KtFieldDate',
			'KtFieldDateRange',
			'KtFieldDateTime',
			'KtFieldDateTimeRange',
		],
		reason: 'Replaced by Kotti v2.0.0 Forms',
		version: '3.0.0',
	},
}

/**
 * @deprecated
 */
export const KtDateInput = attachMeta(makeInstallable(KtDateInputVue), META)

/**
 * @deprecated
 */
export const KtDatePicker = attachMeta(makeInstallable(KtDatePickerVue), META)
