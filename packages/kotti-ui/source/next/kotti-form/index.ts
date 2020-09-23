import { attachMeta, makeInstallable } from '../utilities'

import KtFormControllerListVue from './controllers/KtFormControllerList.vue'
import KtFormControllerObjectVue from './controllers/KtFormControllerObject.vue'
import KtFormVue from './KtForm.vue'
import KtFormSubmitVue from './KtFormSubmit.vue'

export const KtFormControllerList = attachMeta(
	makeInstallable(KtFormControllerListVue),
	{
		addedVersion: '2.0.0',
		deprecated: null,
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
		typeScript: {
			namespace: 'Kotti.FormControllerObject',
		},
	},
)

export const KtFormSubmit = attachMeta(makeInstallable(KtFormSubmitVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.FormSubmit',
	},
})

export const KtForm = attachMeta(makeInstallable(KtFormVue), {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.Form',
	},
})

export * from './constants'
