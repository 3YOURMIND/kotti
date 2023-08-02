// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')()
import { defineComponent, ref } from '@vue/composition-api'
import { mount, Wrapper } from '@vue/test-utils'
import { z } from 'zod'

import { useField } from '../kotti-field/hooks'
import KtField from '../kotti-field/KtField.vue'
import { KottiField } from '../kotti-field/types'
import KtForm from '../kotti-form/KtForm.vue'
import { useI18nProvide } from '../kotti-i18n/hooks'
import { makeProps } from '../make-props'
import { localVue } from '../test-utils/index'

import KtFormControllerObject from './KtFormControllerObject.vue'

const TestField = defineComponent({
	name: 'TestField',
	components: { KtField },
	props: makeProps(
		KottiField.propsSchema.extend({
			value: z.string().nullable(),
		}),
	),
	setup: (props: KottiField.PropsInternal, { emit }) => {
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
	},
	template: `<KtField :field="field" :getEmptyValue="() => null">FIELD</KtField>`,
})

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

describe('KtFormControllerObject', () => {
	it('provides context with nested data, and passes-down the other properties of the KtFormContext', () => {
		const wrapper = mount(TestControllerObjectForm, {
			localVue,
			propsData: {
				controllerProps: { formKey: 'parentKey' },
				formProps: {
					hideValidation: true,
					validators: { testKey: () => ({ type: 'empty' }) },
					value: { parentKey: { testKey: 'something' } },
				},
			},
		})

		const field = getField(wrapper, 0)

		expect(field.currentValue).toBe('something')
		expect(field.hideValidation).toBe(true)
		expect(field.validation).toEqual({ type: 'empty' })
	})

	it('implements setValue properly', async () => {
		const wrapper = mount(TestControllerObjectForm, {
			localVue,
			propsData: {
				controllerProps: { formKey: 'parentKey' },
				formProps: {
					hideValidation: true,
					validators: {
						testKey: () => ({ type: 'empty' }),
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
