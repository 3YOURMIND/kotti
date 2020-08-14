import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtSingleSelect from './KtSingleSelect.vue'

makeInstallable(KtSingleSelect)
export { KtSingleSelect }
