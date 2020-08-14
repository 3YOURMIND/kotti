import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtInlineEdit from './KtInlineEdit.vue'
import { defaultParser } from './utilities'

KtInlineEdit.defaultParser = defaultParser

makeInstallable(KtInlineEdit)
export { KtInlineEdit }
