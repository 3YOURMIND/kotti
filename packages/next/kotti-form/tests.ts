import { mount, Wrapper } from '@vue/test-utils'

import KtField from '../kotti-field/KtField.vue'
import KtForm from './KtForm.vue'
import { defineComponent } from '@vue/composition-api'
import { useField } from '../kotti-field/hooks'
import { KottiField } from '../kotti-field/types'
import { ktFieldProps } from '../kotti-field/constants'
import { localVue } from '../test-utils'

const TestField = defineComponent({
	name: 'TestField',
	components: { KtField },
	props: ktFieldProps,
	setup: (props: KottiField.Props<string | null>, { emit }) => ({
		field: useField({
			emit,
			isCorrectDataType: (value): value is string | null =>
				typeof value === 'string' || value === null,
			isEmpty: (value) => value === null,
			props,
			supports: {
				clear: true,
				decoration: true,
				placeholder: true,
				tabIndex: true,
			},
		}),
	}),
	template: `<KtField :field="field" :getEmptyValue="() => null">FIELD</KtField>`,
})

const TestForm = {
	components: { KtForm, TestField },
	template: `<KtForm v-bind="$attrs" @input="$event => $emit('input', $event)"><TestField formKey="testKey"/></KtForm>`,
}

const getField = (
	wrapper: Wrapper<any>,
): KottiField.Hook.Returns<string | null> =>
	(wrapper.vm.$children[0].$children[0] as any).field

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

			const wrapper = mount(TestForm, {
				localVue,
				propsData: {
					value: { testKey: DEEP_VALUE_REFERENCE },
				},
			})

			const field = getField(wrapper)

			expect(field.currentValue).toEqual(DEEP_VALUE_REFERENCE)
			expect(field.currentValue).not.toBe(DEEP_VALUE_REFERENCE)
		})

		it('setValue updates reference, and doesn’t perform deep mutations', () => {
			const VALUE_REFERENCE = { treatedAsImmutable: true }

			const wrapper = mount(TestForm, {
				localVue,
				propsData: {
					value: VALUE_REFERENCE,
				},
			})

			const field = getField(wrapper)

			field.setValue('wowspin')

			expect(wrapper.emitted().input[0][0]).not.toBe(VALUE_REFERENCE)
			expect(wrapper.emitted().input[0][0]).toEqual({
				treatedAsImmutable: true,
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

			wrapper.setProps({ hideValidation: true })

			await wrapper.vm.$nextTick()

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

			expect(field.validation).toEqual({ type: null })

			wrapper.setProps({
				validators: {
					testKey: () => ({ type: 'success', text: 'Testing' }),
				},
			})

			await wrapper.vm.$nextTick()

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

			wrapper.setProps({ value: { testKey: null } })

			await wrapper.vm.$nextTick()

			expect(field.currentValue).toEqual(null)
		})
	})
})
