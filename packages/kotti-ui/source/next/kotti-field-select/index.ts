import { makeInstallable } from '../utilities'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFieldMultiSelect from './KtFieldMultiSelect.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFieldSingleSelect from './KtFieldSingleSelect.vue'

makeInstallable(KtFieldSingleSelect)
makeInstallable(KtFieldMultiSelect)

export { KtFieldSingleSelect, KtFieldMultiSelect }
export * from './constants'
