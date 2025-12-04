import type { VueWrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import type { SetupContext } from 'vue'
import { defineComponent, ref } from 'vue'
import { z } from 'zod'

import { useField } from '../kotti-field/hooks'
import KtField from '../kotti-field/KtField.vue'
import { KottiField } from '../kotti-field/types'
import { useI18nProvide } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'

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
				borderless: true,
				clear: true,
				decoration: true,
				placeholder: true,
				tabIndex: true,
			},
		}),
	}
}

const TestField = defineComponent({
	components: { KtField },
	name: 'TestField',
	props: makeProps(
		KottiField.propsSchema.extend({
			modelValue: z.string().nullable().default(null),
		}),
	),
	setup: (props, { emit }) => {
		return useTestHook(props, emit)
	},
	template: `<KtField :field="field" :getEmptyValue="() => null">FIELD</KtField>`,
})

const TestFieldObject = defineComponent({
	components: { KtField },
	name: 'TestFieldObject',
	props: makeProps(
		KottiField.propsSchema.extend({
			modelValue: z.record(z.unknown()).nullable().default(null),
		}),
	),
	setup: (props, { emit }) => {
		return useTestHook(props, emit)
	},
	template: `<KtField :field="field" :getEmptyValue="() => null">FIELD</KtField>`,
})

const TestForm = {
	components: { KtForm, TestField },
	props: ['hideValidation'],
	template: `<KtForm v-bind="$attrs" :hideValidation="hideValidation" @update:modelValue="$event => $emit('update:modelValue', $event)"><TestField formKey="testKey"/></KtForm>`,
}

const TestForm2 = {
	components: { KtForm, TestFieldObject },
	template: `<KtForm v-bind="$attrs" @update:modelValue="$event => $emit('update:modelValue', $event)"><TestFieldObject formKey="testKey"/></KtForm>`,
}

const getField = (
	wrapper: VueWrapper<any>,
): KottiField.Hook.Returns<Record<string, unknown> | string | null> =>
	wrapper.findComponent({ name: 'KtField' }).vm.field

describe('KtForm', () => {
	it('provides a context', () => {
		const wrapper = mount(TestForm, {
			props: {
				modelValue: { testKey: 'testing' },
			},
		})

		const field = getField(wrapper)

		expect(field.currentValue).toBe('testing')
	})

	it('emits on setValue', async () => {
		const wrapper = mount(TestForm, {
			props: {
				modelValue: { testKey: 'testing' },
			},
		})

		const field = getField(wrapper)

		expect(field.currentValue).toBe('testing')

		field.setValue('new value')

		await wrapper.vm.$nextTick()

		expect(wrapper.emitted('update:modelValue')).toEqual([
			[{ testKey: 'new value' }],
		])

		expect(field.currentValue).toBe('testing')
	})

	describe('ensures that props.value is cloned, to ensure consuming apps don’t rely on deep mutation', () => {
		it('should deepClone values before passing it to field, to prevent deep mutation madness', () => {
			const DEEP_VALUE_REFERENCE = { deep: true }

			const wrapper = mount(TestForm2, {
				props: {
					modelValue: { testKey: DEEP_VALUE_REFERENCE },
				},
			})

			const field = getField(wrapper)

			expect(field.currentValue).toEqual(DEEP_VALUE_REFERENCE)
			expect(field.currentValue).not.toBe(DEEP_VALUE_REFERENCE)
		})

		it('setValue updates reference, and doesn’t perform deep mutations', async () => {
			const VALUE_REFERENCE = { testKey: 'wow', treatedAsImmutable: 'true' }

			const wrapper = mount(TestForm, {
				props: {
					modelValue: VALUE_REFERENCE,
				},
			})

			const field = getField(wrapper)

			field.setValue('wowspin')
			await wrapper.vm.$nextTick()

			expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).not.toBe(
				VALUE_REFERENCE,
			)
			expect(wrapper.emitted('update:modelValue')?.[0]?.[0]).toEqual({
				testKey: 'wowspin',
				treatedAsImmutable: 'true',
			})
		})
	})

	describe('context gets updated when props change', () => {
		it('hideValidation', async () => {
			const wrapper = mount(TestForm, {
				props: {
					hideValidation: false,
					modelValue: { testKey: 'testing' },
				},
			})

			const field = getField(wrapper)
			expect(field.hideValidation).toEqual(false)

			await wrapper.setProps({ hideValidation: true })
			expect(field.hideValidation).toEqual(true)
		})

		it('validators', async () => {
			const wrapper = mount(TestForm, {
				props: {
					modelValue: { testKey: 'testing' },
					validators: {},
				},
			})

			const field = getField(wrapper)

			expect(field.validation).toEqual({ type: 'empty' })

			await wrapper.setProps({
				validators: {
					testKey: () => ({ text: 'Testing', type: 'success' }),
				},
			})

			expect(field.validation).toEqual({
				text: 'Testing',
				type: 'success',
			})
		})

		it('modelValue', async () => {
			const wrapper = mount(TestForm, {
				props: {
					modelValue: { testKey: 'testing' },
				},
			})

			const field = getField(wrapper)

			expect(field.currentValue).toEqual('testing')

			await wrapper.setProps({ modelValue: { testKey: null } })

			expect(field.currentValue).toEqual(null)
		})
	})
})
