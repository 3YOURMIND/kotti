import { attachMeta, makeInstallable } from '../utilities'

import KtFormControllerObjectVue from './KtFormControllerObject.vue'

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
			schema: null,
		},
	},
)
