import Vue from 'vue'

import Portal from './components/Portal'
import config, { setSelector } from './config'

function install(_Vue, { defaultSelector, name = 'portal' } = {}) {
	Vue.component(name, Portal)

	if (defaultSelector) setSelector(defaultSelector)
}

if (typeof window !== 'undefined' && window.Vue && window.Vue === Vue) {
	// plugin was included directly in a browser
	Vue.use(install)
}

export default install
export { Portal, setSelector, config }
