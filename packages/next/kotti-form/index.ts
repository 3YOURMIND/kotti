import KtForm from './KtForm.vue'

export default Object.assign(KtForm, {
	install: (Vue) => Vue.component(KtForm.name, KtForm),
} as Vue.PluginObject<{}>)
