import { attachMeta, makeInstallable } from '../utilities'

import KtFieldDateVue from './KtFieldDate.vue'
import KtFieldDateRangeVue from './KtFieldDateRange.vue'
import KtFieldDateTimeVue from './KtFieldDateTime.vue'
import KtFieldDateTimeRangeVue from './KtFieldDateTimeRange.vue'

export const KtFieldDate = attachMeta(makeInstallable(KtFieldDateVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.FieldDate',
	},
})

export const KtFieldDateRange = attachMeta(
	makeInstallable(KtFieldDateRangeVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		typeScript: {
			namespace: 'Kotti.FieldDateRange',
		},
	},
)

export const KtFieldDateTime = attachMeta(makeInstallable(KtFieldDateTimeVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.FieldDateTime',
	},
})

export const KtFieldDateTimeRange = attachMeta(
	makeInstallable(KtFieldDateTimeRangeVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		typeScript: {
			namespace: 'Kotti.FieldDateTimeRange',
		},
	},
)

export * from './constants'
