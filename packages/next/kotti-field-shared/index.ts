import KtCheckbox from './KtCheckbox.vue'

Object.assign(KtCheckbox, {
	install: (Vue) => {
		Vue.component(KtCheckbox.name, KtCheckbox)
		//other shared components go here
	},
} as Vue.PluginObject<{}>)

export { KtCheckbox }
