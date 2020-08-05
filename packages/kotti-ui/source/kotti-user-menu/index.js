import KtUserMenu from './KtUserMenu.vue'

KtUserMenu.install = function (Vue) {
	Vue.component(KtUserMenu.name, KtUserMenu)
}

export { KtUserMenu }
