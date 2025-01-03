import type { Wrapper } from '@vue/test-utils'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, ref } from 'vue'
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
	components: { KtField },
	name: 'TestField',
	props: makeProps(
		KottiField.propsSchema.extend({
			value: z.string().nullable().default(null),
		}),
	),
	setup: (props, { emit }) => {
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
	},
	template: `<KtField :field="field" :getEmptyValue="() => null">FIELD</KtField>`,
})

const TestControllerObject = {
	components: { KtFormControllerObject, TestField },
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
	wrapper: Wrapper<any>,
	index: number,
): KottiField.Hook.Returns<string | null> =>
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

			await wrapper.setProps({
				formProps: { ...FORM_PROPS, hideValidation: true },
			})

			expect(field.hideValidation).toBe(true)
		})
	})
})
