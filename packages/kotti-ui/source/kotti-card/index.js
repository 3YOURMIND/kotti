import KtCard from './src/Card.vue'

KtCard.install = function (Vue) {
	Vue.component(KtCard.name, KtCard)
}

export default KtCard
