import { defineComponent, ref } from '@vue/composition-api'
import { mount, Wrapper } from '@vue/test-utils'

import { KOTTI_FIELD_PROPS } from '../../kotti-field/constants'
import { useField } from '../../kotti-field/hooks'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtField from '../../kotti-field/KtField.vue'
import { KottiField } from '../../kotti-field/types'
import { useTranslationProvide } from '../../kotti-translation/hooks'
import { localVue } from '../../test-utils/index'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtForm from '../KtForm.vue'

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFormControllerList from './KtFormControllerList.vue'
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import KtFormControllerObject from './KtFormControllerObject.vue'

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

const TestControllerList = {
	components: { TestField, KtFormControllerList },
	template: `<KtFormControllerList v-bind="$attrs"><TestField formKey="testKey"/></KtFormControllerList>`,
}

const TestControllerListForm = {
	components: { KtForm, TestControllerList },
	props: {
		controllerProps: { required: true, type: Object },
		formProps: { required: true, type: Object },
	},
	template: `<KtForm v-bind="formProps" @input="$event => $emit('input', $event)"><TestControllerList v-bind="controllerProps"/></KtForm>`,
}

const TestControllerObject = {
	components: { TestField, KtFormControllerObject },
	template: `<KtFormControllerObject v-bind="$attrs"><TestField formKey="testKey"/></KtFormControllerObject>`,
}

const TestControllerObjectForm = {
	components: { KtForm, TestControllerObject },
	props: {
		controllerProps: { required: true, type: Object },
		formProps: { required: true, type: Object },
	},
	template: `<KtForm v-bind="formProps" @input="$event => $emit('input', $event)"><TestControllerObject v-bind="controllerProps"/></KtForm>`,
}

const getField = (
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	wrapper: Wrapper<any>,
	index: number,
): KottiField.Hook.Returns<string | null> =>
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	(wrapper.findAllComponents({ name: 'KtField' }).at(index).vm as any).field

describe('KtFormControllerList', () => {
	it('provides context with nested data, and passes-down the other properties of the KtFormContext', () => {
		const wrapper = mount(TestControllerListForm, {
			localVue,
			propsData: {
				controllerProps: {
					formKey: 'parentKey',
				},
				formProps: {
					hideValidation: true,
					validators: {
						testKey: (v: unknown) =>
							v === 'testName1'
								? { type: 'error', text: 'test1' }
								: { type: null },
					},
					value: {
						parentKey: [{ testKey: 'testName1' }, { testKey: 'testName2' }],
					},
				},
			},
		})

		const row1Field = getField(wrapper, 0)
		expect(row1Field.currentValue).toBe('testName1')
		expect(row1Field.hideValidation).toBe(true)
		expect(row1Field.validation).toEqual({ type: 'error', text: 'test1' })

		const row2Field = getField(wrapper, 1)
		expect(row2Field.currentValue).toBe('testName2')
		expect(row2Field.hideValidation).toBe(true)
		expect(row2Field.validation).toEqual({ type: null })
	})

	it('implements setValue properly', async () => {
		const wrapper = mount(TestControllerListForm, {
			localVue,
			propsData: {
				controllerProps: {
					formKey: 'parentKey',
				},
				formProps: {
					hideValidation: true,
					value: {
						parentKey: [
							{ testKey: 'testName1a', somethingElse: true },
							{ testKey: 'testName2a', somethingElse: false },
						],
					},
				},
			},
		})

		const row1Field = getField(wrapper, 0)
		row1Field.setValue('testName1b')

		await wrapper.vm.$nextTick()

		expect(wrapper.emitted('input')?.[0]).toEqual([
			{
				parentKey: [
					{ testKey: 'testName1b', somethingElse: true },
					{ testKey: 'testName2a', somethingElse: false },
				],
			},
		])

		const row2Field = getField(wrapper, 1)
		row2Field.setValue('testName2b')

		await wrapper.vm.$nextTick()

		expect(wrapper.emitted('input')?.[1]).toEqual([
			{
				parentKey: [
					// testKey is still testName1a because @input is mocked
					{ testKey: 'testName1a', somethingElse: true },
					{ testKey: 'testName2b', somethingElse: false },
				],
			},
		])
	})

	describe('reactivity', () => {
		it('hideValidation', async () => {
			const FORM_PROPS = {
				hideValidation: false,
				value: {
					parentKey: [
						{ testKey: 'testName1b', somethingElse: true },
						{ testKey: 'testName2a', somethingElse: false },
					],
				},
			}

			const wrapper = mount(TestControllerListForm, {
				localVue,
				propsData: {
					controllerProps: { formKey: 'parentKey' },
					formProps: FORM_PROPS,
				},
			})

			const row1Field = getField(wrapper, 0)

			expect(row1Field.hideValidation).toBe(false)

			wrapper.setProps({ formProps: { ...FORM_PROPS, hideValidation: true } })

			await wrapper.vm.$nextTick()

			expect(row1Field.hideValidation).toBe(true)
		})
	})
})

describe('KtFormControllerObject', () => {
	it('provides context with nested data, and passes-down the other properties of the KtFormContext', () => {
		const wrapper = mount(TestControllerObjectForm, {
			localVue,
			propsData: {
				controllerProps: { formKey: 'parentKey' },
				formProps: {
					hideValidation: true,
					validators: { testKey: () => ({ type: null }) },
					value: { parentKey: { testKey: 'something' } },
				},
			},
		})

		const field = getField(wrapper, 0)

		expect(field.currentValue).toBe('something')
		expect(field.hideValidation).toBe(true)
		expect(field.validation).toEqual({ type: null })
	})

	it('implements setValue properly', async () => {
		const wrapper = mount(TestControllerObjectForm, {
			localVue,
			propsData: {
				controllerProps: { formKey: 'parentKey' },
				formProps: {
					hideValidation: true,
					validators: {
						testKey: () => ({ type: null }),
					},
					value: { parentKey: { testKey: 'something' } },
				},
			},
		})
		const field = getField(wrapper, 0)

		field.setValue('setSomething')

		await wrapper.vm.$nextTick()

		expect(wrapper.emitted('input')).toEqual([
			[{ parentKey: { testKey: 'setSomething' } }],
		])
	})

	describe('reactivity', () => {
		it('hideValidation', async () => {
			const FORM_PROPS = {
				hideValidation: false,
				value: {
					parentKey: { testKey: 'something' },
				},
			}

			const wrapper = mount(TestControllerObjectForm, {
				localVue,
				propsData: {
					controllerProps: { formKey: 'parentKey' },
					formProps: FORM_PROPS,
				},
			})

			const field = getField(wrapper, 0)

			expect(field.hideValidation).toBe(false)

			wrapper.setProps({ formProps: { ...FORM_PROPS, hideValidation: true } })

			await wrapper.vm.$nextTick()

			expect(field.hideValidation).toBe(true)
		})
	})
})
