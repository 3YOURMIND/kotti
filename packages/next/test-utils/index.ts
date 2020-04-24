import VueCompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'

/**
 * Access lazily-evaluated computed property to force it to evaluate
 * @see {@link https://github.com/vuejs/vue/issues/7672}
 */
export const forceVueToEvaluateComputedProperty = <T>(kottiFieldProp: T) =>
	kottiFieldProp

export const localVue = createLocalVue()
localVue.use(VueCompositionApi)
