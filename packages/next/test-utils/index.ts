import VueCompositionApi, { Ref } from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'

/**
 * Vue’s type annotations are wrong. This function corrects it
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const forceConvertToRef = <T extends any>(kottiFieldProp: T): Ref<T> =>
	(kottiFieldProp as unknown) as Ref<T>

/**
 * Access lazily-evaluated computed property to force it to evaluate
 * @see {@link https://github.com/vuejs/vue/issues/7672}
 */
export const forceVueToEvaluateComputedProperty = <T>(kottiFieldProp: T) =>
	forceConvertToRef<T>(kottiFieldProp).value

export const localVue = createLocalVue()
localVue.use(VueCompositionApi)
