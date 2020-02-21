import KtSingleSelect from './src/SingleSelect'
import VuePortal from '@linusborg/vue-simple-portal'

KtSingleSelect.install = function(Vue) {
	Vue.component(KtSingleSelect.name, KtSingleSelect)
	Vue.use(VuePortal, { name: 'simple-simple-portal' })
}

export default KtSingleSelect
