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
		field: useField(props, emit),
	}),
	template: `<KtField :field="field">FIELD</KtField>`,
})

const TestForm = {
	components: { KtForm, TestField },
	template: `<KtForm v-bind="$attrs" @input="$event => $emit('input', $event)"><TestField formKey="testKey"/></KtForm>`,
}

const getField = (wrapper: Wrapper<any>): KottiField.Returns<string | null> =>
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

		expect(field.currentValue.value).toBe('testing')
	})

	it('emits on setValue', async () => {
		const wrapper = mount(TestForm, {
			localVue,
			propsData: {
				value: { testKey: 'testing' },
			},
		})

		const field = getField(wrapper)

		expect(field.currentValue.value).toBe('testing')

		field.setValue.value('new value')

		await wrapper.vm.$nextTick()

		expect(wrapper.emitted().input).toEqual([[{ testKey: 'new value' }]])

		expect(field.currentValue.value).toBe('testing')
	})

	describe('ensures that props.value is cloned, to ensure consuming apps don’t rely on deeply mutation', () => {
		it('should deepClone values before passing it to field, to prevent deep mutation madness', () => {
			const DEEP_VALUE_REFERENCE = { deep: true }

			const wrapper = mount(TestForm, {
				localVue,
				propsData: {
					value: { testKey: DEEP_VALUE_REFERENCE },
				},
			})

			const field = getField(wrapper)

			expect(field.currentValue.value).toEqual(DEEP_VALUE_REFERENCE)
			expect(field.currentValue.value).not.toBe(DEEP_VALUE_REFERENCE)
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

			field.setValue.value('wowspin')

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

			expect(field.hideValidation.value).toEqual(false)

			wrapper.setProps({ hideValidation: true })

			await wrapper.vm.$nextTick()

			expect(field.hideValidation.value).toEqual(true)
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

			expect(field.validation.value).toEqual({ type: null })

			wrapper.setProps({
				validators: {
					testKey: () => ({ type: 'success', text: 'Testing' }),
				},
			})

			await wrapper.vm.$nextTick()

			expect(field.validation.value).toEqual({
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

			expect(field.currentValue.value).toEqual('testing')

			wrapper.setProps({ value: { testKey: null } })

			await wrapper.vm.$nextTick()

			expect(field.currentValue.value).toEqual(null)
		})
	})
})
