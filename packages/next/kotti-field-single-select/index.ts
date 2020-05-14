import KtFieldSingleSelect from './KtFieldSingleSelect.vue'

export default Object.assign(KtFieldSingleSelect, {
	install: (Vue) =>
		Vue.component(KtFieldSingleSelect.name, KtFieldSingleSelect),
} as Vue.PluginObject<{}>)
