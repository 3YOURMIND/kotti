import KtFormControllerList from './controllers/KtFormControllerList.vue'
import KtForm from './KtForm.vue'

Object.assign(KtForm, {
	install: (Vue) => {
		Vue.component(KtForm.name, KtForm)
		Vue.component(KtFormControllerList.name, KtFormControllerList)
	},
} as Vue.PluginObject<{}>)

export { KtForm, KtFormControllerList }
