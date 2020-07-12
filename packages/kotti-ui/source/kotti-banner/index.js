import KtBanner from './src/Banner.vue'

KtBanner.install = function (Vue) {
	Vue.component(KtBanner.name, KtBanner)
}

export default KtBanner
