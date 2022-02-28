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

import KtFormControllerList from './KtFormControllerList.vue'

const TestField = defineComponent<KottiField.PropsInternal>({
	name: 'TestField',
	components: { KtField },
	props: makeProps(
		KottiField.propsSchema.extend({
			value: z.string().nullable(),
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
								: { type: 'empty' },
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
		expect(row2Field.validation).toEqual({ type: 'empty' })
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
