import KtFormControllerList from './controllers/KtFormControllerList.vue'
import KtFormControllerObject from './controllers/KtFormControllerObject.vue'
import KtForm from './KtForm.vue'
import KtFormSubmit from './KtFormSubmit.vue'

Object.assign(KtForm, {
	install: (Vue) => {
		Vue.component(KtForm.name, KtForm)
		Vue.component(KtFormControllerList.name, KtFormControllerList)
		Vue.component(KtFormControllerObject.name, KtFormControllerObject)
		Vue.component(KtFormSubmit.name, KtFormSubmit)
	},
} as Vue.PluginObject<{}>)

export { KtForm, KtFormControllerList, KtFormControllerObject, KtFormSubmit }
