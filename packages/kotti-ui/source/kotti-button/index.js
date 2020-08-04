import KtButton from './src/button.vue'

KtButton.install = function (Vue) {
	Vue.component(KtButton.name, KtButton)
}

export { KtButton }
