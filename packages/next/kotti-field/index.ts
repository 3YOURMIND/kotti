import KtField from './KtField.vue'

export default Object.assign(KtField, {
	install: (Vue) => Vue.component(KtField.name, KtField),
} as Vue.PluginObject<{}>)
