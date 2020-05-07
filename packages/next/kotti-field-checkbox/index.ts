import KtFieldCheckbox from './KtFieldCheckbox.vue'

export default Object.assign(KtFieldCheckbox, {
	install: (Vue) => Vue.component(KtFieldCheckbox.name, KtFieldCheckbox),
} as Vue.PluginObject<{}>)
