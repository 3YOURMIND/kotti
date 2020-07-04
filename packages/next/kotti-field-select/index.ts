import { makeInstallable } from '../utilities'

import KtFieldMultiSelect from './KtFieldMultiSelect.vue'
import KtFieldSingleSelect from './KtFieldSingleSelect.vue'

makeInstallable(KtFieldSingleSelect)
makeInstallable(KtFieldMultiSelect)

export { KtFieldSingleSelect, KtFieldMultiSelect }
