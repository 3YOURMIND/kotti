import KtToaster from './KtToaster.vue'

KtToaster.install = function (Vue) {
	Vue.component(KtToaster.name, KtToaster)
}

export default KtToaster
