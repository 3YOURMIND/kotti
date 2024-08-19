import type { Wrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { expect, it, describe } from 'vitest'
import type { SetupContext } from 'vue'
import { defineComponent, ref } from 'vue'
import { z } from 'zod'

import { useField } from '../kotti-field/hooks'
import KtField from '../kotti-field/KtField.vue'
import { KottiField } from '../kotti-field/types'
import { useI18nProvide } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { localVue } from '../test-utils'

import KtForm from './KtForm.vue'

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
				autoComplete: true,
				clear: true,
				decoration: true,
				placeholder: true,
				tabIndex: true,
			},
		}),
	}
}

const TestField = defineComponent({
	name: 'TestField',
	components: { KtField },
	props: makeProps(
		KottiField.propsSchema.extend({
			value: z.string().nullable().default(null),
		}),
	),
	setup: (props, { emit }) => {
		return useTestHook(props, emit)
	},
	template: `<KtField :field="field" :getEmptyValue="() => null">FIELD</KtField>`,
})

const TestFieldObject = defineComponent({
	name: 'TestFieldObject',
	components: { KtField },
	props: makeProps(
		KottiField.propsSchema.extend({
			value: z.record(z.unknown()).nullable().default(null),
		}),
	),
	setup: (props, { emit }) => {
		return useTestHook(props, emit)
	},
	template: `<KtField :field="field" :getEmptyValue="() => null">FIELD</KtField>`,
})

const TestForm = {
	components: { KtForm, TestField },
	template: `<KtForm v-bind="$attrs" @input="$event => $emit('input', $event)"><TestField formKey="testKey"/></KtForm>`,
}

const TestForm2 = {
	components: { KtForm, TestFieldObject },
	template: `<KtForm v-bind="$attrs" @input="$event => $emit('input', $event)"><TestFieldObject formKey="testKey"/></KtForm>`,
}

const getField = (
	wrapper: Wrapper<any>,
): KottiField.Hook.Returns<string | Record<string, unknown> | null> =>
	wrapper.vm.$children[0].$children[0].field

describe('KtForm', () => {
	it('provides a context', () => {
		const wrapper = mount(TestForm, {
			localVue,
			propsData: {
				value: { testKey: 'testing' },
			},
		})

		const field = getField(wrapper)

		expect(field.currentValue).toBe('testing')
	})

	it('emits on setValue', async () => {
		const wrapper = mount(TestForm, {
			localVue,
			propsData: {
				value: { testKey: 'testing' },
			},
		})

		const field = getField(wrapper)

		expect(field.currentValue).toBe('testing')

		field.setValue('new value')

		await wrapper.vm.$nextTick()

		expect(wrapper.emitted().input).toEqual([[{ testKey: 'new value' }]])

		expect(field.currentValue).toBe('testing')
	})

	describe('ensures that props.value is cloned, to ensure consuming apps don’t rely on deep mutation', () => {
		it('should deepClone values before passing it to field, to prevent deep mutation madness', () => {
			const DEEP_VALUE_REFERENCE = { deep: true }

			const wrapper = mount(TestForm2, {
				localVue,
				propsData: {
					value: { testKey: DEEP_VALUE_REFERENCE },
				},
			})

			const field = getField(wrapper)

			expect(field.currentValue).toEqual(DEEP_VALUE_REFERENCE)
			expect(field.currentValue).not.toBe(DEEP_VALUE_REFERENCE)
		})

		it('setValue updates reference, and doesn’t perform deep mutations', async () => {
			const VALUE_REFERENCE = { treatedAsImmutable: 'true', testKey: 'wow' }

			const wrapper = mount(TestForm, {
				localVue,
				propsData: {
					value: VALUE_REFERENCE,
				},
			})

			const field = getField(wrapper)

			field.setValue('wowspin')
			await wrapper.vm.$nextTick()

			expect(wrapper.emitted().input?.[0]?.[0]).not.toBe(VALUE_REFERENCE)
			expect(wrapper.emitted().input?.[0]?.[0]).toEqual({
				treatedAsImmutable: 'true',
				testKey: 'wowspin',
			})
		})
	})

	describe('context gets updated when props change', () => {
		it('hideValidation', async () => {
			const wrapper = mount(TestForm, {
				localVue,
				propsData: {
					hideValidation: false,
					value: { testKey: 'testing' },
				},
			})

			const field = getField(wrapper)

			expect(field.hideValidation).toEqual(false)

			await wrapper.setProps({ hideValidation: true })

			expect(field.hideValidation).toEqual(true)
		})

		it('validators', async () => {
			const wrapper = mount(TestForm, {
				localVue,
				propsData: {
					validators: {},
					value: { testKey: 'testing' },
				},
			})

			const field = getField(wrapper)

			expect(field.validation).toEqual({ type: 'empty' })

			await wrapper.setProps({
				validators: {
					testKey: () => ({ type: 'success', text: 'Testing' }),
				},
			})

			expect(field.validation).toEqual({
				type: 'success',
				text: 'Testing',
			})
		})

		it('value', async () => {
			const wrapper = mount(TestForm, {
				localVue,
				propsData: {
					value: { testKey: 'testing' },
				},
			})

			const field = getField(wrapper)

			expect(field.currentValue).toEqual('testing')

			await wrapper.setProps({ value: { testKey: null } })

			expect(field.currentValue).toEqual(null)
		})
	})
})
