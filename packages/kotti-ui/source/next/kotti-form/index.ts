import { Kotti } from '../../types'
import { makeInstallable, attachMeta } from '../utilities'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFormControllerList from './controllers/KtFormControllerList.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFormControllerObject from './controllers/KtFormControllerObject.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtForm from './KtForm.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFormSubmit from './KtFormSubmit.vue'

const META: Kotti.Meta = {
	addedVersion: '2.0.0',
	deprecated: null,
	typeScript: {
		namespace: 'Kotti.Form',
	},
}

attachMeta(makeInstallable(KtForm), META)
attachMeta(makeInstallable(KtFormControllerList), META)
attachMeta(makeInstallable(KtFormControllerObject), META)
attachMeta(makeInstallable(KtFormSubmit), META)

export { KtForm, KtFormControllerList, KtFormControllerObject, KtFormSubmit }
export * from './constants'
