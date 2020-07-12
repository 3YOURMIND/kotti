import KtContainer from './src/Container'

KtContainer.install = function(Vue) {
	Vue.component(KtContainer.name, KtContainer)
}

export default KtContainer
