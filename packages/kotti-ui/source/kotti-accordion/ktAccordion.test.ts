import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Yoco } from '@3yourmind/yoco'

import KtAccordion from './KtAccordion.vue'

describe('KtAccordion.vue', () => {
	it('renders correctly', () => {
		// @ts-expect-error mount type is not compatible with return type from defineComponent
		const wrapper = shallowMount(KtAccordion)

		expect(wrapper.element).toMatchSnapshot()
	})

	it('renders correctly (with props)', () => {
		// @ts-expect-error mount type is not compatible with return type from defineComponent
		const wrapper = shallowMount(KtAccordion, {
			propsData: {
				dataTest: 'my-accordion',
				icon: Yoco.Icon.BOOKMARK,
				isClosed: true,
				title: 'My Accordion',
			},
		})

		expect(wrapper.element).toMatchSnapshot()
	})
})
