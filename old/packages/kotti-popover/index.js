import KtPopover from './KtPopover.vue'
import KtPopoverItem from './KtPopoverItem.vue'

KtPopover.install = function(Vue) {
	Vue.component(KtPopover.name, KtPopover)
	Vue.component(KtPopoverItem.name, KtPopoverItem)
}

export default KtPopover
