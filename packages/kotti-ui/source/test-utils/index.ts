import VueCompositionApi from '@vue/composition-api'
import { createLocalVue } from '@vue/test-utils'

import { KottiField } from '../kotti-field/types'
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
	'fieldInheritableProps' | 'validators' | 'values'
> & {
	onAddField: jest.Mock
	onRemoveField: jest.Mock
	setValue: jest.Mock
} => ({
	// @ts-expect-error this is an imperfect mock and not a real ref
	fieldInheritableProps: {
		value: {
			hideClear: false,
			hideValidation: false,
			isDisabled: false,
			isLoading: false,
			size: KottiField.Size.MEDIUM,
		},
	},
	onAddField: jest.fn(),
	onRemoveField: jest.fn(),
	setValue: jest.fn(),
	// @ts-expect-error this is an imperfect mock and not a real ref
	validators: { value: validators },
	// @ts-expect-error this is an imperfect mock and not a real ref
	values: { value: values },
})
