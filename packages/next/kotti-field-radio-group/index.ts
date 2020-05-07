import KtFieldRadioGroup from './KtFieldRadioGroup.vue'

export default Object.assign(KtFieldRadioGroup, {
	install: (Vue) => Vue.component(KtFieldRadioGroup.name, KtFieldRadioGroup),
} as Vue.PluginObject<{}>)
