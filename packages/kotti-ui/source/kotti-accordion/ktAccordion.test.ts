import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import { Yoco } from '@3yourmind/yoco'

import KtAccordion from './KtAccordion.vue'

describe('KtAccordion.vue', () => {
	it('renders correctly', () => {
		const wrapper = shallowMount(KtAccordion)

		expect(wrapper.element).toMatchSnapshot()
	})

	it('renders correctly (with props)', () => {
		const wrapper = shallowMount(KtAccordion, {
			props: {
				dataTest: 'my-accordion',
				icon: Yoco.Icon.BOOKMARK,
				isClosed: true,
				title: 'My Accordion',
			},
		})

		expect(wrapper.element).toMatchSnapshot()
	})
})
