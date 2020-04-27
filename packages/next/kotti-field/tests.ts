import { shallowMount } from '@vue/test-utils'

import { KottiField } from './types'
import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { defineComponent } from '@vue/composition-api'
import { useField } from './hooks'
import { ktFieldProps, FORM_KEY_NONE } from './constants'
import {
	localVue,
	forceVueToEvaluateComputedProperty,
	getMockContext,
} from '../test-utils'
import { KtFieldErrors } from './errors'

const TestComponent = defineComponent({
	name: 'TestComponent',
	props: ktFieldProps,
	setup: (props: KottiField.Props<string | null>, { emit }) => ({
		field: useField({
			emit,
			isCorrectDataType: (value): value is string | null =>
				typeof value === 'string' || value === null,
			props,
		}),
	}),
	template: `<div></div>`,
})

describe('useField', () => {
	it('should throw if setValue is called on a disabled field', async () => {
		console.error = jest.fn()

		const wrapper = shallowMount(TestComponent, {
			localVue,
			propsData: { isDisabled: true },
		})

		expect(() => wrapper.vm.field.setValue(null)).toThrowError(
			KtFieldErrors.DisabledSetValueCalled,
		)

		wrapper.setProps({ isDisabled: false })
		await wrapper.vm.$nextTick()

		expect(() => wrapper.vm.field.setValue(null)).not.toThrowError()
	})

	it('props.value gets deepCloned', async () => {
		const VALUE_REFERENCE = { something: 'something' }

		const wrapper = shallowMount(TestComponent, {
			localVue,
			propsData: { value: VALUE_REFERENCE },
		})

		expect(wrapper.vm.field.currentValue).toEqual(VALUE_REFERENCE)
		expect(wrapper.vm.field.currentValue).not.toBe(VALUE_REFERENCE)
	})

	describe('props reactivity', () => {
		it('helpText is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			expect(wrapper.vm.field.helpText).toBe(null)

			wrapper.setProps({ helpText: 'something something' })
			await wrapper.vm.$nextTick()

			expect(wrapper.vm.field.helpText).toBe('something something')
		})

		it('isDisabled is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			expect(wrapper.vm.field.isDisabled).toBe(false)

			wrapper.setProps({ isDisabled: true })
			await wrapper.vm.$nextTick()

			expect(wrapper.vm.field.isDisabled).toBe(true)
		})

		it('isOptional is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			expect(wrapper.vm.field.isOptional).toBe(false)

			wrapper.setProps({ isOptional: true })
			await wrapper.vm.$nextTick()

			expect(wrapper.vm.field.isOptional).toBe(true)
		})

		it('label is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			expect(wrapper.vm.field.label).toBe(null)

			wrapper.setProps({ label: 'something something' })
			await wrapper.vm.$nextTick()

			expect(wrapper.vm.field.label).toBe('something something')
		})
	})

	describe('setValue', () => {
		it('should emit change when calling setValue on a field outside of a context', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			wrapper.vm.field.setValue('something else')
			wrapper.vm.field.setValue(null)

			await wrapper.vm.$nextTick()

			expect(wrapper.emitted().input).toEqual([['something else'], [null]])
		})

		it('context should emit when when calling setValue inside a context', () => {
			const context = getMockContext({ values: { testKey: 'something' } })

			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey' },
				provide: {
					[KT_FORM_CONTEXT]: context,
				},
			})

			wrapper.vm.field.setValue('something else')
			wrapper.vm.field.setValue(null)

			expect(context.setValue.mock.calls).toEqual([
				['testKey', 'something else'],
				['testKey', null],
			])

			expect(wrapper.vm.field.currentValue).toBe('something')
		})
	})

	it('throws when formKey is provided and context is missing', async () => {
		console.error = jest.fn()

		expect(() =>
			shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'test' },
			}),
		).toThrowError(KtFieldErrors.InvalidPropOutsideOfContext)

		const wrapper = shallowMount(TestComponent, { localVue })

		console.error = jest.fn()

		wrapper.setProps({ formKey: 'thisWillCrash' })
		await wrapper.vm.$nextTick()

		/**
		 * Check console.error since Vue decides to just swallow errors
		 * that get thrown in watchers (except for the first call, of course!)
		 *
		 * @see {@link https://github.com/vuejs/vue/issues/576}
		 */
		expect(console.error).toHaveBeenCalled()
	})

	it('doesn’t throw when formKey is NONE and context is provided', () => {
		expect(() =>
			shallowMount(TestComponent, {
				localVue,
				provide: {
					[KT_FORM_CONTEXT]: getMockContext(),
				},
				propsData: { formKey: FORM_KEY_NONE },
			}),
		).not.toThrowError()
	})

	describe('validation', () => {
		it('works with only props.validator', async () => {
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: {
					validator: () => ({ type: 'success', text: 'Testing' }),
				},
			})

			expect(wrapper.vm.field.validation).toEqual({
				type: 'success',
				text: 'Testing',
			})

			wrapper.setProps({
				validator: () => ({ type: 'warning', text: 'Testing' }),
			})

			await wrapper.vm.$nextTick()

			expect(wrapper.vm.field.validation).toEqual({
				type: 'warning',
				text: 'Testing',
			})
		})

		it('works with only validatorKey in a context', async () => {
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: FORM_KEY_NONE, validatorKey: 'testKey1' },
				provide: {
					[KT_FORM_CONTEXT]: getMockContext({
						validators: {
							testKey1: () => ({ type: 'warning', text: 'This is testKey1' }),
							testKey2: () => ({ type: 'error', text: 'This is testKey2' }),
						},
					}),
				},
			})

			expect(wrapper.vm.field.validation).toEqual({
				type: 'warning',
				text: 'This is testKey1',
			})

			wrapper.setProps({ validatorKey: 'testKey2' })

			await wrapper.vm.$nextTick()

			expect(wrapper.vm.field.validation).toEqual({
				type: 'error',
				text: 'This is testKey2',
			})
		})

		it('throws for validatorKey outside of a context', async () => {
			expect(() =>
				shallowMount(TestComponent, {
					localVue,
					propsData: { validatorKey: 'testKey' },
				}),
			).toThrowError(KtFieldErrors.InvalidPropOutsideOfContext)

			const wrapper = shallowMount(TestComponent, { localVue })

			console.error = jest.fn()

			wrapper.setProps({ validatorKey: 'thisWillCrash' })
			await wrapper.vm.$nextTick()

			/**
			 * Check console.error since Vue decides to just swallow errors
			 * that get thrown in watchers (except for the first call, of course!)
			 *
			 * @see {@link https://github.com/vuejs/vue/issues/576}
			 */
			expect(console.error).toHaveBeenCalled()
		})

		it('works with only formKey in a context', async () => {
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey1' },
				provide: {
					[KT_FORM_CONTEXT]: getMockContext({
						validators: {
							testKey1: () => ({
								type: 'warning',
								text: 'This is testKey1',
							}),
							testKey2: () => ({
								type: 'warning',
								text: 'This is testKey2',
							}),
						},
						values: { value: { testKey: 'something' } },
					}),
				},
			})

			expect(wrapper.vm.field.validation).toEqual({
				type: 'warning',
				text: 'This is testKey1',
			})

			wrapper.setProps({ formKey: 'testKey2' })

			await wrapper.vm.$nextTick()

			expect(wrapper.vm.field.validation).toEqual({
				type: 'warning',
				text: 'This is testKey2',
			})
		})

		it('throws when providing a validatorKey and a validator', async () => {
			const validator = jest.fn()

			expect(() => {
				const wrapper = shallowMount(TestComponent, {
					localVue,
					propsData: {
						formKey: 'testKey',
						validator,
						validatorKey: 'testKey',
					},
					provide: {
						[KT_FORM_CONTEXT]: getMockContext({
							validators: {
								testKey: () => ({
									type: 'warning',
									text: 'This is a warning',
								}),
							},
							values: { testKey: 'something' },
						}),
					},
				})

				forceVueToEvaluateComputedProperty(wrapper.vm.field.validation)
			}).toThrowError(KtFieldErrors.NonDeterministicValidatorUsage)
			expect(validator).not.toBeCalled()

			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey', validatorKey: 'testKey' },
				provide: {
					[KT_FORM_CONTEXT]: getMockContext({
						validators: {
							testKey: () => ({ type: 'warning', text: 'This is a warning' }),
						},
						values: { testKey: 'something' },
					}),
				},
			})

			expect(wrapper.vm.field.validation).toEqual({
				type: 'warning',
				text: 'This is a warning',
			})

			wrapper.setProps({ validator })
			await wrapper.vm.$nextTick()

			expect(() =>
				forceVueToEvaluateComputedProperty(wrapper.vm.field.validation),
			).toThrowError(KtFieldErrors.NonDeterministicValidatorUsage)

			expect(validator).not.toBeCalled()
		})

		it('throws when validatorKey cannot be found in validators', async () => {
			const testKey = jest.fn()

			expect(() => {
				const wrapper = shallowMount(TestComponent, {
					localVue,
					propsData: { formKey: 'testKey', validatorKey: 'wrongKey' },
					provide: {
						[KT_FORM_CONTEXT]: getMockContext({
							validators: { testKey },
							values: { testKey: 'something' },
						}),
					},
				})

				forceVueToEvaluateComputedProperty(wrapper.vm.field.validation)
			}).toThrowError(KtFieldErrors.ValidatorNotFound)
			expect(testKey).not.toBeCalled()

			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey', validatorKey: 'testKey' },
				provide: {
					[KT_FORM_CONTEXT]: getMockContext({
						validators: { testKey },
						values: { testKey: 'something' },
					}),
				},
			})

			forceVueToEvaluateComputedProperty(wrapper.vm.field.validation)

			expect(testKey).toBeCalled()

			wrapper.setProps({ validatorKey: 'wrongKey' })

			await wrapper.vm.$nextTick()

			expect(() =>
				forceVueToEvaluateComputedProperty(wrapper.vm.field.validation),
			).toThrowError(KtFieldErrors.ValidatorNotFound)
		})

		it('does not validate if formKey is not in validators', () => {
			const testKey = jest.fn()

			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'wrongKey' },
				provide: {
					[KT_FORM_CONTEXT]: getMockContext({
						validators: { testKey },
						values: { wrongKey: 'something' },
					}),
				},
			})

			expect(testKey).not.toBeCalled()
			expect(wrapper.vm.field.validation).toEqual({ type: null })
		})
	})
})
