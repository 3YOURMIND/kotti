import KtActionbar from './ActionBar.vue'

KtActionbar.install = function (Vue) {
	Vue.component(KtActionbar.name, KtActionbar)
}

export { KtActionbar }
