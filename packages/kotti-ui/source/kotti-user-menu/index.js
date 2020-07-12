import KtUserMenu from './src/UserMenu.vue'

KtUserMenu.install = function (Vue) {
	Vue.component(KtUserMenu.name, KtUserMenu)
}

export default KtUserMenu
