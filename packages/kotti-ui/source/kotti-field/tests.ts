// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')()
import { defineComponent, ref, SetupContext } from '@vue/composition-api'
import { shallowMount } from '@vue/test-utils'
import { z } from 'zod'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { useI18nProvide } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { localVue, getMockContext } from '../test-utils'

import { FORM_KEY_NONE } from './constants'
import { KtFieldErrors } from './errors'
import { useField } from './hooks'
import { KottiField } from './types'

const testFieldSetup = (
	props: KottiField.PropsInternal,
	{ emit }: SetupContext,
) => {
	useI18nProvide({
		currencyMap: ref({}),
		locale: ref('en-US'),
		messages: ref({}),
		numberFormat: ref({}),
	})

	return {
		field: useField({
			emit,
			isEmpty: (value) => value === null,
			props,
			supports: {
				clear: true,
				decoration: true,
				placeholder: true,
				tabIndex: true,
			},
		}),
	}
}

const TestComponent = defineComponent({
	name: 'TestComponent',
	props: makeProps(
		KottiField.propsSchema.extend({
			value: z.string().nullable(),
		}),
	),
	setup: testFieldSetup,
	template: `<div></div>`,
})

const TestComponentObject = defineComponent({
	name: 'TestComponentObject',
	props: makeProps(
		KottiField.propsSchema.extend({
			value: z.record(z.unknown()).nullable(),
		}),
	),
	setup: testFieldSetup,
	template: `<div></div>`,
})

describe('useField', () => {
	it('should throw if setValue is called on a disabled field', async () => {
		console.error = jest.fn()

		const wrapper = shallowMount(TestComponent, {
			localVue,
			propsData: { isDisabled: true },
		})

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(() => (wrapper.vm as any).field.setValue(null)).toThrowError(
			KtFieldErrors.DisabledSetValueCalled,
		)

		wrapper.setProps({ isDisabled: false })
		await wrapper.vm.$nextTick()

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect(() => (wrapper.vm as any).field.setValue(null)).not.toThrowError()
	})

	it('props.value gets deepCloned', async () => {
		const VALUE_REFERENCE = { something: 'something' }

		const wrapper = shallowMount(TestComponentObject, {
			localVue,
			propsData: {
				label: 'Test_Component_Object',
				value: VALUE_REFERENCE,
			},
		})

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((wrapper.vm as any).field.currentValue).toEqual(VALUE_REFERENCE)
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		expect((wrapper.vm as any).field.currentValue).not.toBe(VALUE_REFERENCE)
	})

	describe('props reactivity', () => {
		it('helpText is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.helpText).toBe(null)

			wrapper.setProps({ helpText: 'something something' })
			await wrapper.vm.$nextTick()

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.helpText).toBe('something something')
		})

		it('isDisabled is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.isDisabled).toBe(false)

			wrapper.setProps({ isDisabled: true })
			await wrapper.vm.$nextTick()

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.isDisabled).toBe(true)
		})

		it('isOptional is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.isOptional).toBe(false)

			wrapper.setProps({ isOptional: true })
			await wrapper.vm.$nextTick()

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.isOptional).toBe(true)
		})

		it('label is reactive', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.label).toBe(null)

			wrapper.setProps({ label: 'something something' })
			await wrapper.vm.$nextTick()

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.label).toBe('something something')
		})
	})

	describe('setValue', () => {
		it('should emit change when calling setValue on a field outside of a context', async () => {
			const wrapper = shallowMount(TestComponent, { localVue })

			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(wrapper.vm as any).field.setValue('something else')
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			;(wrapper.vm as any).field.setValue(null)

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
					value: `as long as it has a value, or is Optional, validator
					won't throw internal error about a missing required filed`,
					validator: () => ({ type: 'success', text: 'Testing' }),
				},
			})
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.validation).toEqual({
				type: 'success',
				text: 'Testing',
			})

			wrapper.setProps({
				validator: () => ({ type: 'warning', text: 'Testing' }),
			})

			await wrapper.vm.$nextTick()
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			expect((wrapper.vm as any).field.validation).toEqual({
				type: 'warning',
				text: 'Testing',
			})
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
						values: { testKey1: 'something1', testKey2: 'something2' },
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
			expect(wrapper.vm.field.validation).toEqual({ type: 'empty' })
		})
	})
})
