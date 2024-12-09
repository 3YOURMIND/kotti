import { createLocalVue } from '@vue/test-utils'
import { type Mock, vi } from 'vitest'

import { KottiField } from '../kotti-field/types'
import type { KottiForm } from '../kotti-form/types'

export const localVue = createLocalVue()

export const getMockContext = ({ validators = {}, values = {} } = {}): Pick<
	KottiForm.Context,
	'fieldInheritableProps' | 'validators' | 'values'
> & {
	onAddField: Mock
	onRemoveField: Mock
	setValue: Mock
} => ({
	// @ts-expect-error this is an imperfect mock and not a real ref
	fieldInheritableProps: {
		value: {
			hideClear: false,
			hideValidation: false,
			isDisabled: false,
			isLoading: false,
			showVisibilityToggle: true,
			size: KottiField.Size.MEDIUM,
		},
	},
	onAddField: vi.fn(),
	onRemoveField: vi.fn(),
	setValue: vi.fn(),
	// @ts-expect-error this is an imperfect mock and not a real ref
	validators: { value: validators },
	// @ts-expect-error this is an imperfect mock and not a real ref
	values: { value: values },
})
