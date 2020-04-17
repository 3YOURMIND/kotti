import { shallowMount, createLocalVue } from '@vue/test-utils'

import KtField from './KtField.vue'
import { KottiField } from './types'
import { KottiForm } from '../kotti-form/types'
import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { defineComponent, Ref } from '@vue/composition-api'
import { useField } from './hooks'
import VueCompositionApi from '@vue/composition-api'
import { ktFieldProps, FORM_KEY_NONE } from './constants'

const localVue = createLocalVue()
localVue.use(VueCompositionApi)

describe('KtField', () => {
	it('doesn’t crash when it renders witout context', () => {
		expect(() =>
			shallowMount(KtField, { propsData: { field: {} } }),
		).not.toThrow()
	})
})

/**
 * Vue’s type annotations are wrong. This function corrects it
 */
const forceConvertToRef = <T extends any>(kottiFieldProp: T): Ref<T> =>
	(kottiFieldProp as unknown) as Ref<T>

const TestComponent = defineComponent({
	name: 'TestComponent',
	props: {
		...ktFieldProps,
	},
	setup(props: KottiField.Props<string | null>, { emit }) {
		const field = useField(props, emit)

		return { field }
	},
	template: `<div></div>`,
})

describe('useField', () => {
	it('should throw if setValue is called on a disabled field', () => {
		console.error = jest.fn()

		const wrapper = shallowMount(TestComponent, {
			localVue,
			propsData: { isDisabled: true },
		})

		expect(() =>
			forceConvertToRef(wrapper.vm.field.setValue).value(null),
		).toThrowError()
	})

	describe('setValue', () => {
		it('should emit change when calling setValue on a field outside of a context', () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			forceConvertToRef(wrapper.vm.field.setValue).value('something else')
			forceConvertToRef(wrapper.vm.field.setValue).value(null)

			expect(wrapper.emitted().input).toEqual([['something else'], [null]])
		})

		it('context should emit when when calling setValue inside a context', () => {
			const setValue = jest.fn()

			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey' },
				provide: {
					[KT_FORM_CONTEXT]: {
						values: { value: { testKey: 'something' } },
						setValue,
					} as Partial<KottiForm.Context>,
				},
			})

			forceConvertToRef(wrapper.vm.field.setValue).value('something else')
			forceConvertToRef(wrapper.vm.field.setValue).value(null)

			expect(setValue.mock.calls).toEqual([
				['testKey', 'something else'],
				['testKey', null],
			])

			expect(forceConvertToRef(wrapper.vm.field.currentValue).value).toBe(
				'something',
			)
		})
	})

	it('throws when formKey is provided and context is missing', () => {
		console.error = jest.fn()

		expect(() =>
			shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'test' },
			}),
		).toThrowError()
	})

	it('doesn’t throw when formKey is NONE and context is provided', () => {
		expect(() =>
			shallowMount(TestComponent, {
				localVue,
				provide: {
					[KT_FORM_CONTEXT]: {} as Partial<KottiForm.Context>,
				},
				propsData: { formKey: FORM_KEY_NONE },
			}),
		).not.toThrowError()
	})

	describe('validation', () => {
		it('works with only props.validator', () => {
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { validator: () => ({ type: 'success', text: 'Testing' }) },
			})

			const validation = forceConvertToRef(wrapper.vm.field.validation).value

			expect(validation.type).toBe('success')
			if (validation.type === 'success') expect(validation.text).toBe('Testing')
		})

		it('works with only validatorKey in a context', () => {
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: FORM_KEY_NONE, validatorKey: 'testKey' },
				provide: {
					[KT_FORM_CONTEXT]: {
						validators: {
							value: {
								testKey: () => ({
									type: 'warning',
									text: 'This is a warning',
								}),
							},
						},
					} as Partial<KottiForm.Context>,
				},
			})

			const validation = forceConvertToRef(wrapper.vm.field.validation).value

			expect(validation.type).toBe('warning')
			if (validation.type === 'warning')
				expect(validation.text).toBe('This is a warning')
		})

		it('throws for validatorKey outside of a context', () => {
			expect(() =>
				shallowMount(TestComponent, {
					localVue,
					propsData: { validatorKey: 'testKey' },
				}),
			).toThrowError()
		})

		it('works with only formKey in a context', () => {
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey' },
				provide: {
					[KT_FORM_CONTEXT]: {
						validators: {
							value: {
								testKey: () => ({
									type: 'warning',
									text: 'This is a warning',
								}),
							},
						},
						values: { value: { testKey: 'something' } },
					} as Partial<KottiForm.Context>,
				},
			})

			const validation = forceConvertToRef(wrapper.vm.field.validation).value

			expect(validation.type).toBe('warning')
			if (validation.type === 'warning')
				expect(validation.text).toBe('This is a warning')
		})

		it('throws when providing a validatorKey and a validator', () => {
			const validator = jest.fn()

			expect(() =>
				shallowMount(TestComponent, {
					localVue,
					propsData: { validator, validatorKey: 'testKey' },
					provide: {
						[KT_FORM_CONTEXT]: {
							validators: {
								value: {
									testKey: () => ({
										type: 'warning',
										text: 'This is a warning',
									}),
								},
							},
							values: { value: { testKey: 'something' } },
						} as Partial<KottiForm.Context>,
					},
				}),
			).toThrowError()
			expect(validator).not.toBeCalled()
		})

		it('throws for an invalid validatorKey', () => {
			const testKey = jest.fn()

			expect(() =>
				shallowMount(TestComponent, {
					localVue,
					propsData: { validatorKey: 'wrongKey' },
					provide: {
						[KT_FORM_CONTEXT]: {
							validators: {
								value: {
									testKey,
								},
							},
							values: { value: { testKey: 'something' } },
						} as Partial<KottiForm.Context>,
					},
				}),
			).toThrowError()
			expect(testKey).not.toBeCalled()
		})

		it('ignores an invalid formKey', () => {
			const testKey = jest.fn()

			expect(() =>
				shallowMount(TestComponent, {
					localVue,
					propsData: { formKey: 'wrongKey' },
					provide: {
						[KT_FORM_CONTEXT]: {
							validators: {
								value: {
									testKey,
								},
							},
							values: { value: { wrongKey: 'something' } },
						} as Partial<KottiForm.Context>,
					},
				}),
			).not.toThrowError()
			expect(testKey).not.toBeCalled()
		})
	})
})
