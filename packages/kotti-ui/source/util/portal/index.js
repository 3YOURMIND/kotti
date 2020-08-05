import Vue from 'vue'

import { VueSimplePortal as Portal } from './components/Portal'
import { config, setSelector } from './config'

function install(_Vue, { defaultSelector, name = 'portal' } = {}) {
	Vue.component(name, Portal)

	if (defaultSelector) setSelector(defaultSelector)
}

export default install
export { Portal, setSelector, config }
