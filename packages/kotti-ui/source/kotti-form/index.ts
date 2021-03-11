import { Kotti } from '../types'
import { attachMeta, makeInstallable } from '../utilities'

import KtFormControllerListVue from './controllers/KtFormControllerList.vue'
import KtFormControllerObjectVue from './controllers/KtFormControllerObject.vue'
import KtFormVue from './KtForm.vue'
import KtFormSubmitVue from './KtFormSubmit.vue'

const headerFooterScope: Kotti.Meta['slots'][string]['scope'] = {
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
				scope: headerFooterScope,
			},
			header: {
				description: 'inserted above the list, exposes list utilities',
				scope: headerFooterScope,
			},
		},
		typeScript: {
			namespace: 'Kotti.FormControllerList',
		},
	},
)

export const KtFormControllerObject = attachMeta(
	makeInstallable(KtFormControllerObjectVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
		designs: null,
		slots: {
			default: {
				description: null,
				scope: {
					setValue: {
						description: 'sets a key on the controller object',
						type: 'function',
					},
					setValues: {
						description: 'sets value of the controller object',
						type: 'function',
					},
					values: {
						description: 'current value of the controller object',
						type: 'object',
					},
				},
			},
		},
		typeScript: {
			namespace: 'Kotti.FormControllerObject',
		},
	},
)

export const KtFormSubmit = attachMeta(makeInstallable(KtFormSubmitVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: null,
	slots: {},
	typeScript: {
		namespace: 'Kotti.FormSubmit',
	},
})

export const KtForm = attachMeta(makeInstallable(KtFormVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	designs: null,
	slots: {
		default: {
			description: null,
			scope: null,
		},
	},
	typeScript: {
		namespace: 'Kotti.Form',
	},
})

export * from './constants'
