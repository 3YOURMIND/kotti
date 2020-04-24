import VueCompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'

import { KottiForm } from '../kotti-form/types'

/**
 * Access lazily-evaluated computed property to force it to evaluate
 * @see {@link https://github.com/vuejs/vue/issues/7672}
 */
export const forceVueToEvaluateComputedProperty = <T>(kottiFieldProp: T) =>
	kottiFieldProp

export const localVue = createLocalVue()
localVue.use(VueCompositionApi)

export const getMockContext = (
	{ validators = {}, values = {} } = { validators: {}, values: {} },
): Pick<
	KottiForm.Context,
	'hideValidation' | 'isLoading' | 'validators' | 'values'
> & {
	onAddField: jest.Mock
	onRemoveField: jest.Mock
	setValue: jest.Mock
} => ({
	hideValidation: { value: false },
	isLoading: { value: false },
	onAddField: jest.fn(),
	onRemoveField: jest.fn(),
	setValue: jest.fn(),
	validators: { value: validators },
	values: { value: values },
})
