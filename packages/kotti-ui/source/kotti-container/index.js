import KtContainer from './src/Container.vue'

KtContainer.install = function(Vue) {
	Vue.component(KtContainer.name, KtContainer)
}

export default KtContainer
