import { shallowMount } from '@vue/test-utils'

import KtField from './KtField.vue'
import { KottiField } from './types'
import { KottiForm } from '../kotti-form/types'
import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { defineComponent } from '@vue/composition-api'
import { useField } from './hooks'
import { ktFieldProps, FORM_KEY_NONE } from './constants'
import {
	forceConvertToRef,
	localVue,
	forceVueToEvaluateComputedProperty,
} from '../test-utils'

describe('KtField', () => {
	it('doesn’t crash when it renders witout context', () => {
		expect(() =>
			shallowMount(KtField, { propsData: { field: {} } }),
		).not.toThrow()
	})
})
import { KtFieldErrors } from './errors'

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
	it('should throw if setValue is called on a disabled field', async () => {
		console.error = jest.fn()

		const wrapper = shallowMount(TestComponent, {
			localVue,
			propsData: { isDisabled: true },
		})

		expect(() =>
			forceConvertToRef(wrapper.vm.field.setValue).value(null),
		).toThrowError(KtFieldErrors.DisabledSetValueCalled)

		wrapper.setProps({ isDisabled: false })
		await wrapper.vm.$nextTick()

		expect(() =>
			forceConvertToRef(wrapper.vm.field.setValue).value(null),
		).not.toThrowError()
	})

	describe('props reactivity', () => {
		it('isDisabled is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			expect(forceConvertToRef(wrapper.vm.field.isDisabled).value).toBe(false)

			wrapper.setProps({ isDisabled: true })
			await wrapper.vm.$nextTick()

			expect(forceConvertToRef(wrapper.vm.field.isDisabled).value).toBe(true)
		})

		it('isOptional is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			expect(forceConvertToRef(wrapper.vm.field.isOptional).value).toBe(false)

			wrapper.setProps({ isOptional: true })
			await wrapper.vm.$nextTick()

			expect(forceConvertToRef(wrapper.vm.field.isOptional).value).toBe(true)
		})

		it('label is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			expect(forceConvertToRef(wrapper.vm.field.label).value).toBe(null)

			wrapper.setProps({ label: 'something something' })
			await wrapper.vm.$nextTick()

			expect(forceConvertToRef(wrapper.vm.field.label).value).toBe(
				'something something',
			)
		})
	})

	describe('setValue', () => {
		it('should emit change when calling setValue on a field outside of a context', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			forceConvertToRef(wrapper.vm.field.setValue).value('something else')
			forceConvertToRef(wrapper.vm.field.setValue).value(null)

			await wrapper.vm.$nextTick()

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
					[KT_FORM_CONTEXT]: {} as Partial<KottiForm.Context>,
				},
				propsData: { formKey: FORM_KEY_NONE },
			}),
		).not.toThrowError()
	})

	describe('validation', () => {
		it('works with only props.validator', async () => {
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { validator: () => ({ type: 'success', text: 'Testing' }) },
			})

			expect(forceConvertToRef(wrapper.vm.field.validation).value).toEqual({
				type: 'success',
				text: 'Testing',
			})

			wrapper.setProps({
				validator: () => ({ type: 'warning', text: 'Testing' }),
			})

			await wrapper.vm.$nextTick()

			expect(forceConvertToRef(wrapper.vm.field.validation).value).toEqual({
				type: 'warning',
				text: 'Testing',
			})
		})

		it('works with only validatorKey in a context', async () => {
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: FORM_KEY_NONE, validatorKey: 'testKey1' },
				provide: {
					[KT_FORM_CONTEXT]: {
						validators: {
							value: {
								testKey1: () => ({
									type: 'warning',
									text: 'This is testKey1',
								}),
								testKey2: () => ({
									type: 'error',
									text: 'This is testKey2',
								}),
							},
						},
					} as Partial<KottiForm.Context>,
				},
			})

			expect(forceConvertToRef(wrapper.vm.field.validation).value).toEqual({
				type: 'warning',
				text: 'This is testKey1',
			})

			wrapper.setProps({ validatorKey: 'testKey2' })

			await wrapper.vm.$nextTick()

			expect(forceConvertToRef(wrapper.vm.field.validation).value).toEqual({
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
					[KT_FORM_CONTEXT]: {
						validators: {
							value: {
								testKey1: () => ({
									type: 'warning',
									text: 'This is testKey1',
								}),
								testKey2: () => ({
									type: 'warning',
									text: 'This is testKey2',
								}),
							},
						},
						values: { value: { testKey: 'something' } },
					} as Partial<KottiForm.Context>,
				},
			})

			expect(forceConvertToRef(wrapper.vm.field.validation).value).toEqual({
				type: 'warning',
				text: 'This is testKey1',
			})

			wrapper.setProps({ formKey: 'testKey2' })

			await wrapper.vm.$nextTick()

			expect(forceConvertToRef(wrapper.vm.field.validation).value).toEqual({
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

				forceVueToEvaluateComputedProperty(wrapper.vm.field.validation)
			}).toThrowError(KtFieldErrors.NonDeterministicValidatorUsage)
			expect(validator).not.toBeCalled()

			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey', validatorKey: 'testKey' },
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

			expect(forceConvertToRef(wrapper.vm.field.validation).value).toEqual({
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
						[KT_FORM_CONTEXT]: {
							validators: { value: { testKey } },
							values: { value: { testKey: 'something' } },
						} as Partial<KottiForm.Context>,
					},
				})

				forceVueToEvaluateComputedProperty(wrapper.vm.field.validation)
			}).toThrowError(KtFieldErrors.ValidatorNotFound)
			expect(testKey).not.toBeCalled()

			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey', validatorKey: 'testKey' },
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
					[KT_FORM_CONTEXT]: {
						validators: {
							value: {
								testKey,
							},
						},
						values: { value: { wrongKey: 'something' } },
					} as Partial<KottiForm.Context>,
				},
			})

			expect(testKey).not.toBeCalled()
			expect(forceConvertToRef(wrapper.vm.field.validation).value).toEqual({
				type: null,
			})
		})
	})
})
