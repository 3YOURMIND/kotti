import VueCompositionAPI from '@vue/composition-api'
import Vue from 'vue'

import App from './App.vue'

Vue.config.productionTip = false

Vue.use(VueCompositionAPI)

new Vue({
	render: (h) => h(App),
}).$mount('#app')
