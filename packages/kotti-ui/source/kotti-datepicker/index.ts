import { attachMeta, makeInstallable } from '../next/utilities'
import { Kotti } from '../types'

// @ts-expect-error
import KtDateInput from './KtDateInput.vue'
// @ts-expect-error
import KtDatePicker from './KtDatePicker.vue'

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

attachMeta(makeInstallable(KtDateInput), META)
attachMeta(makeInstallable(KtDatePicker), META)

export { KtDateInput, KtDatePicker }
