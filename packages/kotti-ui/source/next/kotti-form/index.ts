import { makeInstallable } from '../utilities'

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

makeInstallable(KtForm)
makeInstallable(KtFormControllerList)
makeInstallable(KtFormControllerObject)
makeInstallable(KtFormSubmit)

export { KtForm, KtFormControllerList, KtFormControllerObject, KtFormSubmit }
export * from './constants'
