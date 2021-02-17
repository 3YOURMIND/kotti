// eslint-disable-next-line @typescript-eslint/no-var-requires
require('jsdom-global')()
import { computed, defineComponent } from '@vue/composition-api'
import { shallowMount } from '@vue/test-utils'

import { localVue } from '../../test-utils'
import { Kotti } from '../../types'
import { KtTable2Errors } from '../errors'

import { useDragAndDrop } from './useDragAndDrop'

const TestComponent = defineComponent({
	name: 'TestComponentTable2',
	props: {
		columns: { required: true, type: Array },
	},
	setup: (props: Pick<Kotti.Table2.InternalProps, 'columns'>, { emit }) =>
		useDragAndDrop({
			columns: computed(() => props.columns),
			emit,
		}),
	template: `<div></div>`,
})
const makeWrapper = () =>
	shallowMount(TestComponent, {
		localVue,
		propsData: {
			columns: [
				{ key: 'a' },
				{ key: 'b' },
				{ key: 'c' },
				{ key: 'd' },
				{ key: 'e' },
			],
		},
	})

describe('useDragAndDrop: doDragAndDrop', () => {
	it('should emit update:orderedColumns with correct order', async () => {
		const wrapper = makeWrapper()
		const TEST_CASES: Array<[string, string, string[]]> = [
			['a', 'b', ['b', 'a', 'c', 'd', 'e']],
			['a', 'c', ['b', 'c', 'a', 'd', 'e']],

			['a', 'e', ['b', 'c', 'd', 'e', 'a']],
			['e', 'a', ['a', 'e', 'b', 'c', 'd']],
		]

		for (const [source, target, result] of TEST_CASES) {
			wrapper.vm.setDragSource(source)
			wrapper.vm.doDragAndDrop(target)

			expect(
				wrapper.emitted('update:orderedColumns')?.[
					// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
					wrapper.emitted('update:orderedColumns')!.length - 1
				],
			).toEqual([result])
		}
	}),
		it('should throw if drag source is null', () => {
			const wrapper = makeWrapper()

			wrapper.vm.setDragSource(null)

			expect(() => wrapper.vm.doDragAndDrop('a')).toThrowError(
				KtTable2Errors.UnexpectedDragSourceType,
			)
		})
})
