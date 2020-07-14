import { makeInstallable } from '../utilities'

import KtFormControllerList from './controllers/KtFormControllerList.vue'
import KtFormControllerObject from './controllers/KtFormControllerObject.vue'
import KtForm from './KtForm.vue'
import KtFormSubmit from './KtFormSubmit.vue'

makeInstallable(KtForm)
makeInstallable(KtFormControllerList)
makeInstallable(KtFormControllerObject)
makeInstallable(KtFormSubmit)

export { KtForm, KtFormControllerList, KtFormControllerObject, KtFormSubmit }
