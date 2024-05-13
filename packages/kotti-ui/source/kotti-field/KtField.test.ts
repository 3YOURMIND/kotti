import { shallowMount } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import type { SetupContext } from 'vue'
import { defineComponent, ref } from 'vue'
import { z } from 'zod'

import { KT_FORM_CONTEXT } from '../kotti-form/constants'
import { useI18nProvide } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { localVue, getMockContext } from '../test-utils'

import { FORM_KEY_NONE } from './constants'
import { ktFieldErrors } from './errors'
import { useField } from './hooks'
import { KottiField } from './types'

const useTestHook = (
	props: KottiField.PropsInternal,
	emit: SetupContext['emit'],
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
			value: z.string().nullable().default(null),
		}),
	),
	setup: (props, { emit }) => {
		return useTestHook(props, emit)
	},
	template: `<div></div>`,
})

const TestComponentObject = defineComponent({
	name: 'TestComponentObject',
	props: makeProps(
		KottiField.propsSchema.extend({
			value: z.record(z.unknown()).nullable().default(null),
		}),
	),
	setup: (props, { emit }) => {
		return useTestHook(props, emit)
	},
	template: `<div></div>`,
})

describe('useField', () => {
	it('should throw if setValue is called on a disabled field', async () => {
		console.error = vi.fn()

		// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
		const wrapper = shallowMount(TestComponent, {
			localVue,
			propsData: { isDisabled: true },
		})

		expect(() => (wrapper.vm as any).field.setValue(null)).toThrow(
			ktFieldErrors.DisabledSetValueCalledError,
		)

		await wrapper.setProps({ isDisabled: false })

		expect(() => (wrapper.vm as any).field.setValue(null)).not.toThrow()
	})

	it('props.value gets deepCloned', () => {
		const VALUE_REFERENCE = { something: 'something' }

		// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
		const wrapper = shallowMount(TestComponentObject, {
			localVue,
			propsData: {
				label: 'Test_Component_Object',
				value: VALUE_REFERENCE,
			},
		})

		expect((wrapper.vm as any).field.currentValue).toEqual(VALUE_REFERENCE)

		expect((wrapper.vm as any).field.currentValue).not.toBe(VALUE_REFERENCE)
	})

	describe('props reactivity', () => {
		it('helpText is reactive', async () => {
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			const wrapper = shallowMount(TestComponent, { localVue })

			expect((wrapper.vm as any).field.helpText).toBe(null)

			await wrapper.setProps({ helpText: 'something something' })

			expect((wrapper.vm as any).field.helpText).toBe('something something')
		})

		it('isDisabled is reactive', async () => {
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			const wrapper = shallowMount(TestComponent, { localVue })

			expect((wrapper.vm as any).field.isDisabled).toBe(false)

			await wrapper.setProps({ isDisabled: true })

			expect((wrapper.vm as any).field.isDisabled).toBe(true)
		})

		it('isOptional is reactive', async () => {
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			const wrapper = shallowMount(TestComponent, { localVue })

			expect((wrapper.vm as any).field.isOptional).toBe(false)

			await wrapper.setProps({ isOptional: true })

			expect((wrapper.vm as any).field.isOptional).toBe(true)
		})

		it('label is reactive', async () => {
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			const wrapper = shallowMount(TestComponent, { localVue })

			expect((wrapper.vm as any).field.label).toBe(null)

			await wrapper.setProps({ label: 'something something' })

			expect((wrapper.vm as any).field.label).toBe('something something')
		})
	})

	describe('setValue', () => {
		it('should emit change when calling setValue on a field outside of a context', async () => {
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			const wrapper = shallowMount(TestComponent, { localVue })

			;(wrapper.vm as any).field.setValue('something else')
			;(wrapper.vm as any).field.setValue(null)

			await wrapper.vm.$nextTick()

			expect(wrapper.emitted().input).toEqual([['something else'], [null]])
		})

		it('context should emit when when calling setValue inside a context', () => {
			const context = getMockContext({ values: { testKey: 'something' } })

			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'testKey' },
				provide: {
					[KT_FORM_CONTEXT]: context,
				},
			})

			;(wrapper.vm as any).field.setValue('something else')
			;(wrapper.vm as any).field.setValue(null)

			expect(context.setValue.mock.calls).toEqual([
				['testKey', 'something else'],
				['testKey', null],
			])

			expect((wrapper.vm as any).field.currentValue).toBe('something')
		})
	})

	it('throws when formKey is provided and context is missing', async () => {
		console.error = vi.fn()

		expect(() =>
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			shallowMount(TestComponent, {
				localVue,
				propsData: { formKey: 'test' },
			}),
		).toThrow(ktFieldErrors.InvalidPropOutsideOfContextError)

		// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
		const wrapper = shallowMount(TestComponent, { localVue })

		console.error = vi.fn()

		await wrapper.setProps({ formKey: 'thisWillCrash' })

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
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			shallowMount(TestComponent, {
				localVue,
				provide: {
					[KT_FORM_CONTEXT]: getMockContext(),
				},
				propsData: { formKey: FORM_KEY_NONE },
			}),
		).not.toThrow()
	})

	describe('validation', () => {
		it('works with only props.validator', async () => {
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
			const wrapper = shallowMount(TestComponent, {
				localVue,
				propsData: {
					value: `as long as it has a value, or is Optional, validator
					won't throw internal error about a missing required filed`,
					validator: () => ({ type: 'success', text: 'Testing' }),
				},
			})

			expect((wrapper.vm as any).field.validation).toEqual({
				type: 'success',
				text: 'Testing',
			})

			await wrapper.setProps({
				validator: () => ({ type: 'warning', text: 'Testing' }),
			})

			expect((wrapper.vm as any).field.validation).toEqual({
				type: 'warning',
				text: 'Testing',
			})
		})

		it('works with only formKey in a context', async () => {
			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent

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

			expect((wrapper.vm as any).field.validation).toEqual({
				type: 'warning',
				text: 'This is testKey1',
			})

			await wrapper.setProps({ formKey: 'testKey2' })

			expect((wrapper.vm as any).field.validation).toEqual({
				type: 'warning',
				text: 'This is testKey2',
			})
		})

		it('does not validate if formKey is not in validators', () => {
			const testKey = vi.fn()

			// @ts-expect-error shallowMount type is not compatible with return type from defineComponent
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

			expect(testKey).not.toHaveBeenCalled()

			expect((wrapper.vm as any).field.validation).toEqual({ type: 'empty' })
		})
	})
})
