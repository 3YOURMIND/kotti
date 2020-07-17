import { defineComponent, ref } from '@vue/composition-api'
import { mount, Wrapper } from '@vue/test-utils'

import { KOTTI_FIELD_PROPS } from '../kotti-field/constants'
import { useField } from '../kotti-field/hooks'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtField from '../kotti-field/KtField.vue'
import { KottiField } from '../kotti-field/types'
import { useTranslationProvide } from '../kotti-translation/hooks'
import { localVue } from '../test-utils'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtForm from './KtForm.vue'

const TestField = defineComponent({
	name: 'TestField',
	components: { KtField },
	props: KOTTI_FIELD_PROPS,
	setup: (props: KottiField.Props<string | null>, { emit }) => {
		useTranslationProvide(ref('en-US'), ref({}))

		return {
			field: useField({
				emit,
				isCorrectDataType: (value): value is string | null =>
					typeof value === 'string' || value === null,
				isEmpty: (value) => value === null,
				props,
				supports: {
					clear: true,
					decoration: true,
					tabIndex: true,
				},
			}),
		}
	},
	template: `<KtField :field="field" :getEmptyValue="() => null">FIELD</KtField>`,
})

const TestFieldObject = defineComponent({
	name: 'TestFieldObject',
	components: { KtField },
	props: KOTTI_FIELD_PROPS,
	setup: (props: KottiField.Props<object | string | null>, { emit }) => {
		useTranslationProvide(ref('en-US'), ref({}))

		return {
			field: useField({
				emit,
				isCorrectDataType: (value): value is object | null =>
					typeof value === 'object' ||
					typeof value === 'string' ||
					value === null,
				isEmpty: (value) => value === null,
				props,
				supports: {
					clear: true,
					decoration: true,
					tabIndex: true,
				},
			}),
		}
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
): KottiField.Hook.Returns<string | object | null> =>
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
