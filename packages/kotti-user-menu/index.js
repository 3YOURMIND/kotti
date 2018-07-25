import KtUserMenu from './src/UserMenu'

KtUserMenu.install = function(Vue) {
	Vue.component(KtUserMenu.name, KtUserMenu)
}

export default KtUserMenu
