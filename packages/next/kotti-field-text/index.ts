import KtFieldText from './KtFieldText.vue'

export default Object.assign(KtFieldText, {
	install: (Vue) => Vue.component(KtFieldText.name, KtFieldText),
} as Vue.PluginObject<{}>)
