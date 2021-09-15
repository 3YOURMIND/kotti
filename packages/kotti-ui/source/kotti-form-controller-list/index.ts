import { Kotti } from '../types'
import { attachMeta, makeInstallable } from '../utilities'

import KtFormControllerListVue from './KtFormControllerList.vue'

export const sharedHeaderFooterScope: Kotti.Meta['slots'][string]['scope'] = {
	addAfter: {
		description: 'append an item to the list',
		type: 'function',
	},
	addBefore: {
		description: 'prepend an item to the list',
		type: 'function',
	},
	setValues: {
		description: 'replace the list',
		type: 'function',
	},
	values: {
		description: 'all items in the list',
		type: 'object',
	},
}

export const KtFormControllerList = attachMeta(
	makeInstallable(KtFormControllerListVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: null,
		slots: {
			default: {
				description: null,
				scope: {
					addAfter: {
						description: null,
						type: 'function',
					},
					addBefore: {
						description: null,
						type: 'function',
					},
					deleteSelf: {
						description: null,
						type: 'function',
					},
					index: {
						description: null,
						type: 'integer',
					},
					setValues: {
						description: null,
						type: 'function',
					},
					values: {
						description: null,
						type: 'object',
					},
				},
			},
			footer: {
				description: 'inserted below the list, exposes list utilities',
				scope: sharedHeaderFooterScope,
			},
			header: {
				description: 'inserted above the list, exposes list utilities',
				scope: sharedHeaderFooterScope,
			},
		},
		typeScript: {
			namespace: 'Kotti.FormControllerList',
			schema: null,
		},
	},
)
