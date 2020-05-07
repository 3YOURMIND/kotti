import KtFieldCheckboxGroup from './KtFieldCheckboxGroup.vue'

export default Object.assign(KtFieldCheckboxGroup, {
	install: (Vue) =>
		Vue.component(KtFieldCheckboxGroup.name, KtFieldCheckboxGroup),
} as Vue.PluginObject<{}>)
