import KtNavbar from './src/KtNavbar.vue'

KtNavbar.install = function (Vue) {
	Vue.component(KtNavbar.name, KtNavbar)
}

export { KtNavbar }
