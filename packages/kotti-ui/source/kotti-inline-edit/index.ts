import { attachMeta, makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtInlineEdit from './KtInlineEdit.vue'
import { defaultParser } from './utilities'

KtInlineEdit.defaultParser = defaultParser

attachMeta(makeInstallable(KtInlineEdit), {
	addedVersion: null,
	deprecated: null,
	typeScript: null,
})

export { KtInlineEdit }
