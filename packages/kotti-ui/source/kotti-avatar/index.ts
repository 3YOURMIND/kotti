import { makeInstallable } from '../next/utilities'

// @ts-expect-error
import KtAvatar from './KtAvatar.vue'

makeInstallable(KtAvatar)
export { KtAvatar }
