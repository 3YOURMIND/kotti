import { mount, Wrapper } from '@vue/test-utils'
import KtFormControllerList from './KtFormControllerList.vue'
import KtFormControllerObject from './KtFormControllerObject.vue'
import { defineComponent } from '@vue/composition-api'
import { KottiField } from '../../kotti-field/types'
import { useField } from '../../kotti-field/hooks'
import { ktFieldProps } from '../../kotti-field/constants'

import KtField from '../../kotti-field/KtField.vue'
import { KottiForm } from '../types'
import { KT_FORM_CONTEXT } from '../constants'
import { localVue } from '../../test-utils/index'
import KtForm from '../KtForm.vue'

const TestField = defineComponent({
	name: 'TestField',
	components: { KtField },
	props: ktFieldProps,
	setup: (props: KottiField.Props<string | null>, { emit }) => ({
		field: useField(props, emit),
	}),
	template: `<KtField :field="field">FIELD</KtField>`,
})

const TestControllerList = {
	components: { TestField, KtFormControllerList },
	template: `<KtFormControllerList v-bind="$attrs"><TestField formKey="testKey"/></KtFormControllerList>`,
}

const TestControllerListForm = {
	components: { KtForm, TestControllerList },
	template: `<KtForm v-bind="$attrs" @input="$event => $emit('input', $event)"><TestControllerList formKey="parentKey"/></KtForm>`,
}

const TestControllerObject = {
	components: { TestField, KtFormControllerObject },
	template: `<KtFormControllerObject v-bind="$attrs"><TestField formKey="testKey"/></KtFormControllerObject>`,
}

const TestControllerObjectForm = {
	components: { KtForm, TestControllerObject },
	template: `<KtForm v-bind="$attrs" @input="$event => $emit('input', $event)"><TestControllerObject formKey="parentKey"/></KtForm>`,
}

const getField = (
	wrapper: Wrapper<any>,
	index: number,
): KottiField.Returns<string | null> =>
	(wrapper.findAll({ name: 'KtField' }).at(index).vm as any).field

describe('KtFormControllerList', () => {
	it('provides context with nested data, and passes-down the other properties of the KtFormContext', () => {
		const wrapper = mount(TestControllerList, {
			localVue,
			propsData: { formKey: 'parentKey', validatorKey: 'testKey' },
			provide: {
				[KT_FORM_CONTEXT]: {
					hideValidation: { value: true },
					validators: {
						value: {
							testKey: (v: unknown) =>
								v === 'testName1'
									? { type: 'error', text: 'test1' }
									: { type: null },
						},
					},
					values: {
						value: {
							parentKey: [{ testKey: 'testName1' }, { testKey: 'testName2' }],
						},
					},
				} as Partial<KottiForm.Context>,
			},
		})

		const row1Field = getField(wrapper, 0)
		expect(row1Field.currentValue.value).toBe('testName1')
		expect(row1Field.hideValidation.value).toBe(true)
		expect(row1Field.validation.value).toEqual({ type: 'error', text: 'test1' })

		const row2Field = getField(wrapper, 1)
		expect(row2Field.currentValue.value).toBe('testName2')
		expect(row2Field.hideValidation.value).toBe(true)
		expect(row2Field.validation.value).toEqual({ type: null })
	})

	it('implements setValue properly', () => {
		const setValue = jest.fn()

		const wrapper = mount(TestControllerList, {
			localVue,
			propsData: { formKey: 'parentKey' },
			provide: {
				[KT_FORM_CONTEXT]: {
					hideValidation: { value: true },
					setValue,
					validators: { value: {} },
					values: {
						value: {
							parentKey: [
								{ testKey: 'testName1a', somethingElse: true },
								{ testKey: 'testName2a', somethingElse: false },
							],
						},
					},
				} as Partial<KottiForm.Context>,
			},
		})

		const row1Field = getField(wrapper, 0)
		row1Field.setValue.value('testName1b')

		expect(setValue).toHaveBeenLastCalledWith('parentKey', [
			{ testKey: 'testName1b', somethingElse: true },
			{ testKey: 'testName2a', somethingElse: false },
		])

		const row2Field = getField(wrapper, 1)
		row2Field.setValue.value('testName2b')

		expect(setValue).toHaveBeenLastCalledWith('parentKey', [
			// testKey is still testName1a because setValue is mocked
			{ testKey: 'testName1a', somethingElse: true },
			{ testKey: 'testName2b', somethingElse: false },
		])
	})

	describe('reactivity', () => {
		it('hideValidation', async () => {
			const wrapper = mount(TestControllerListForm, {
				localVue,
				propsData: {
					hideValidation: false,
					value: {
						parentKey: [
							{ testKey: 'testName1b', somethingElse: true },
							{ testKey: 'testName2a', somethingElse: false },
						],
					},
				},
			})

			const row1Field = getField(wrapper, 0)

			expect(row1Field.hideValidation.value).toBe(false)

			wrapper.setProps({ hideValidation: true })

			await wrapper.vm.$nextTick()

			expect(row1Field.hideValidation.value).toBe(true)
		})
	})
})

describe('KtFormControllerObject', () => {
	it('provides context with nested data, and passes-down the other properties of the KtFormContext', () => {
		const wrapper = mount(TestControllerObject, {
			localVue,
			propsData: { formKey: 'parentKey', validatorKey: 'testKey' },
			provide: {
				[KT_FORM_CONTEXT]: {
					hideValidation: { value: true },
					validators: { value: { testKey: () => ({ type: null }) } },
					values: { value: { parentKey: { testKey: 'something' } } },
				} as Partial<KottiForm.Context>,
			},
		})
		const field = getField(wrapper, 0)

		expect(field.currentValue.value).toBe('something')
		expect(field.hideValidation.value).toBe(true)
		expect(field.validation.value).toEqual({ type: null })
	})

	it('implements setValue properly', () => {
		const setValue = jest.fn()

		const wrapper = mount(TestControllerObject, {
			localVue,
			propsData: { formKey: 'parentKey', validatorKey: 'testKey' },
			provide: {
				[KT_FORM_CONTEXT]: {
					hideValidation: { value: true },
					setValue,
					validators: { value: { testKey: () => ({ type: null }) } },
					values: { value: { parentKey: { testKey: 'something' } } },
				} as Partial<KottiForm.Context>,
			},
		})
		const field = getField(wrapper, 0)

		field.setValue.value('setSomething')

		expect(setValue).toHaveBeenCalledWith('parentKey', {
			testKey: 'setSomething',
		})
	})

	describe('reactivity', () => {
		it('hideValidation', async () => {
			const wrapper = mount(TestControllerObjectForm, {
				localVue,
				propsData: {
					hideValidation: false,
					value: {
						parentKey: { testKey: 'something' },
					},
				},
			})

			const field = getField(wrapper, 0)

			expect(field.hideValidation.value).toBe(false)

			wrapper.setProps({ hideValidation: true })

			await wrapper.vm.$nextTick()

			expect(field.hideValidation.value).toBe(true)
		})
	})
})
